/**
 * Standardized response envelope for the YuuTiers public API v1.
 *
 * All endpoints under /api/v1 return a consistent shape so consumers don't
 * have to special-case each integration.
 */

import { NextResponse } from 'next/server'

export interface ApiSuccess<T> {
  success: true
  data: T
  meta: {
    requestId: string
    cached: boolean
    timestamp: string
    version: 'v1'
  }
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
  meta: {
    requestId: string
    timestamp: string
    version: 'v1'
  }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

function genId(): string {
  return `req_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
  'Access-Control-Max-Age': '86400',
}

export function ok<T>(
  data: T,
  init?: { cached?: boolean; cacheControl?: string; status?: number },
): NextResponse {
  const body: ApiSuccess<T> = {
    success: true,
    data,
    meta: {
      requestId: genId(),
      cached: init?.cached ?? false,
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
  }
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': init?.cacheControl ?? 'public, s-maxage=60, stale-while-revalidate=120',
      'X-API-Version': 'v1',
    },
  })
}

export function fail(
  code: string,
  message: string,
  status = 400,
  details?: unknown,
): NextResponse {
  const body: ApiError = {
    success: false,
    error: { code, message, details },
    meta: {
      requestId: genId(),
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
  }
  return NextResponse.json(body, {
    status,
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'no-store',
      'X-API-Version': 'v1',
    },
  })
}

export function preflight(): NextResponse {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/* ─── Soft per-IP rate limit using Upstash ─── */
import { redis } from './redis'

export async function rateLimit(
  request: Request,
  bucket: string,
  limit = 60, // requests
  windowSec = 60, // per N seconds
): Promise<{ ok: true } | { ok: false; retryAfter: number; remaining: number }> {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anon'

  const key = `ratelimit:${bucket}:${ip}`
  const count = await redis.incr(key)
  if (count === 1) {
    await redis.expire(key, windowSec)
  }
  if (count > limit) {
    const ttl = await redis.ttl(key)
    return { ok: false, retryAfter: ttl > 0 ? ttl : windowSec, remaining: 0 }
  }
  return { ok: true }
}

export function tooManyRequests(retryAfter: number): NextResponse {
  const body: ApiError = {
    success: false,
    error: {
      code: 'rate_limited',
      message: `Too many requests. Retry after ${retryAfter}s.`,
    },
    meta: {
      requestId: genId(),
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
  }
  return NextResponse.json(body, {
    status: 429,
    headers: {
      ...CORS_HEADERS,
      'Retry-After': String(retryAfter),
      'X-API-Version': 'v1',
    },
  })
}

/* ─── Redis-backed cache (real, persisted between requests) ─── */
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const raw = await redis.get<string | T>(key)
    if (raw === null || raw === undefined) return null
    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw) as T
      } catch {
        return raw as unknown as T
      }
    }
    return raw as T
  } catch {
    return null
  }
}

export async function cacheSet<T>(key: string, value: T, ttlSec: number): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(value), { ex: ttlSec })
  } catch {
    /* ignore cache failures */
  }
}

export async function withCache<T>(
  key: string,
  ttlSec: number,
  loader: () => Promise<T>,
): Promise<{ value: T; cached: boolean }> {
  const hit = await cacheGet<T>(key)
  if (hit !== null) return { value: hit, cached: true }
  const fresh = await loader()
  await cacheSet(key, fresh, ttlSec)
  return { value: fresh, cached: false }
}

