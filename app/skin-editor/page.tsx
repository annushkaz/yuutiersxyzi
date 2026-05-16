'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Palette,
  Pencil,
  Eraser,
  PaintBucket,
  Pipette,
  Download,
  Upload,
  RotateCcw,
  Eye,
  EyeOff,
  Layers,
  Undo2,
  Redo2,
  Grid3x3,
  Sparkles,
  User,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { cn } from '@/lib/utils'

const SkinPreview = dynamic(() => import('@/components/skin-editor/skin-preview'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center text-[#5a5a76] text-sm">
      Loading 3D preview...
    </div>
  ),
})

type Tool = 'pencil' | 'eraser' | 'bucket' | 'eyedropper'

const SKIN_W = 64
const SKIN_H = 64
const PIXEL = 12 // editor pixel size

// Default Steve skin (served locally to avoid CORS issues that taint the canvas)
const DEFAULT_SKIN = '/skins/steve.png'

// Quick palette
const PALETTE = [
  '#000000', '#1f1f1f', '#3d3d3d', '#5a5a5a', '#7d7d7d', '#a0a0a0', '#c8c8c8', '#ffffff',
  '#7a3b1d', '#a3522d', '#c97a3f', '#e0a060', '#f3c79b', '#ffe0c2', '#5a2e0f', '#3d1e08',
  '#7c1d1d', '#b22222', '#dc3e3e', '#f56565', '#fbb6b6', '#7a4a1d', '#c08a3e', '#f5c87a',
  '#1d4d7a', '#3b82f6', '#60a5fa', '#93c5fd', '#1d6e34', '#22c55e', '#4ade80', '#86efac',
  '#5d3b8a', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7a1d5d', '#d946ef', '#f0abfc', '#fde68a',
  '#facc15', '#fb923c', '#fdba74', '#fed7aa', '#0e7490', '#06b6d4', '#67e8f9', '#a5f3fc',
]

// Skin region overlays (drawn on top of grid)
type Region = { name: string; x: number; y: number; w: number; h: number; color: string }
const REGIONS: Region[] = [
  // Head
  { name: 'Head', x: 0, y: 0, w: 32, h: 16, color: '#3b82f6' },
  // Body
  { name: 'Body', x: 16, y: 16, w: 24, h: 16, color: '#22c55e' },
  // Right arm
  { name: 'R Arm', x: 40, y: 16, w: 16, h: 16, color: '#f59e0b' },
  // Right leg
  { name: 'R Leg', x: 0, y: 16, w: 16, h: 16, color: '#a855f7' },
  // Left arm
  { name: 'L Arm', x: 32, y: 48, w: 16, h: 16, color: '#f59e0b' },
  // Left leg
  { name: 'L Leg', x: 16, y: 48, w: 16, h: 16, color: '#a855f7' },
  // Overlay (head)
  { name: 'Hat', x: 32, y: 0, w: 32, h: 16, color: '#ef4444' },
  // Overlay (body etc)
  { name: 'Jacket', x: 16, y: 32, w: 24, h: 16, color: '#ef4444' },
  { name: 'R Sleeve', x: 40, y: 32, w: 16, h: 16, color: '#ef4444' },
  { name: 'R Pants', x: 0, y: 32, w: 16, h: 16, color: '#ef4444' },
  { name: 'L Sleeve', x: 48, y: 48, w: 16, h: 16, color: '#ef4444' },
  { name: 'L Pants', x: 0, y: 48, w: 16, h: 16, color: '#ef4444' },
]

const TOOLS: { id: Tool; label: string; icon: React.ComponentType<{ className?: string }>; shortcut: string }[] = [
  { id: 'pencil', label: 'Pencil', icon: Pencil, shortcut: 'B' },
  { id: 'eraser', label: 'Eraser', icon: Eraser, shortcut: 'E' },
  { id: 'bucket', label: 'Fill', icon: PaintBucket, shortcut: 'G' },
  { id: 'eyedropper', label: 'Pick', icon: Pipette, shortcut: 'I' },
]

function rgbaToHex(r: number, g: number, b: number, a: number): string {
  if (a === 0) return 'transparent'
  const h = (n: number) => n.toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}

function hexToRgba(hex: string): [number, number, number, number] {
  if (hex === 'transparent') return [0, 0, 0, 0]
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return [r, g, b, 255]
}

export default function SkinEditorPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const editorRef = useRef<HTMLCanvasElement | null>(null) // visual editor (with grid)
  const [tool, setTool] = useState<Tool>('pencil')
  const [color, setColor] = useState('#3b82f6')
  const [showGrid, setShowGrid] = useState(true)
  const [showRegions, setShowRegions] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)
  const [skinDataUrl, setSkinDataUrl] = useState<string>('')
  const [model, setModel] = useState<'classic' | 'slim'>('classic')
  const [historyStack, setHistoryStack] = useState<ImageData[]>([])
  const [redoStack, setRedoStack] = useState<ImageData[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [hoverPx, setHoverPx] = useState<{ x: number; y: number } | null>(null)
  const lastPixelRef = useRef<{ x: number; y: number } | null>(null)
  const altEraseRef = useRef(false)

  // Initialize canvas with default Steve skin
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = SKIN_W
    canvas.height = SKIN_H
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, SKIN_W, SKIN_H)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      redrawEditor()
      updatePreview()
    }
    img.onerror = () => {
      // Fallback: blank skin
      redrawEditor()
      updatePreview()
    }
    img.src = DEFAULT_SKIN
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Redraw the visual editor with grid
  const redrawEditor = useCallback(() => {
    const canvas = canvasRef.current
    const editor = editorRef.current
    if (!canvas || !editor) return
    const ectx = editor.getContext('2d')
    if (!ectx) return

    editor.width = SKIN_W * PIXEL
    editor.height = SKIN_H * PIXEL
    ectx.imageSmoothingEnabled = false

    // Checkerboard for transparency
    ectx.fillStyle = '#1a1a22'
    ectx.fillRect(0, 0, editor.width, editor.height)
    ectx.fillStyle = '#0e0e15'
    for (let y = 0; y < SKIN_H; y++) {
      for (let x = 0; x < SKIN_W; x++) {
        if ((x + y) % 2 === 0) {
          ectx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL)
        }
      }
    }

    // Draw scaled skin
    ectx.imageSmoothingEnabled = false
    ectx.drawImage(canvas, 0, 0, SKIN_W, SKIN_H, 0, 0, editor.width, editor.height)

    // Grid
    if (showGrid) {
      ectx.strokeStyle = 'rgba(255,255,255,0.06)'
      ectx.lineWidth = 1
      for (let i = 0; i <= SKIN_W; i++) {
        ectx.beginPath()
        ectx.moveTo(i * PIXEL + 0.5, 0)
        ectx.lineTo(i * PIXEL + 0.5, editor.height)
        ectx.stroke()
      }
      for (let i = 0; i <= SKIN_H; i++) {
        ectx.beginPath()
        ectx.moveTo(0, i * PIXEL + 0.5)
        ectx.lineTo(editor.width, i * PIXEL + 0.5)
        ectx.stroke()
      }
    }

    // Region outlines
    if (showRegions) {
      for (const r of REGIONS) {
        ectx.strokeStyle = r.color + 'aa'
        ectx.lineWidth = 2
        ectx.strokeRect(
          r.x * PIXEL + 1,
          r.y * PIXEL + 1,
          r.w * PIXEL - 2,
          r.h * PIXEL - 2,
        )
      }
    }

    // Hover indicator
    if (hoverPx) {
      ectx.strokeStyle = '#ffffff'
      ectx.lineWidth = 2
      ectx.strokeRect(hoverPx.x * PIXEL, hoverPx.y * PIXEL, PIXEL, PIXEL)
    }
  }, [showGrid, showRegions, hoverPx])

  // Update 3D preview (re-export skin)
  const updatePreview = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    setSkinDataUrl(canvas.toDataURL('image/png'))
  }, [])

  useEffect(() => {
    redrawEditor()
  }, [redrawEditor])

  // Snapshot current state for undo
  const pushHistory = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const snapshot = ctx.getImageData(0, 0, SKIN_W, SKIN_H)
    setHistoryStack((s) => {
      const next = [...s, snapshot]
      if (next.length > 50) next.shift()
      return next
    })
    setRedoStack([])
  }

  const undo = () => {
    if (historyStack.length === 0) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const current = ctx.getImageData(0, 0, SKIN_W, SKIN_H)
    const prev = historyStack[historyStack.length - 1]
    setHistoryStack((s) => s.slice(0, -1))
    setRedoStack((s) => [...s, current])
    ctx.putImageData(prev, 0, 0)
    redrawEditor()
    updatePreview()
  }

  const redo = () => {
    if (redoStack.length === 0) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const current = ctx.getImageData(0, 0, SKIN_W, SKIN_H)
    const next = redoStack[redoStack.length - 1]
    setRedoStack((s) => s.slice(0, -1))
    setHistoryStack((s) => [...s, current])
    ctx.putImageData(next, 0, 0)
    redrawEditor()
    updatePreview()
  }

  // Coords from mouse event
  const eventToPixel = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = Math.floor(((e.clientX - rect.left) / rect.width) * SKIN_W)
    const py = Math.floor(((e.clientY - rect.top) / rect.height) * SKIN_H)
    if (px < 0 || py < 0 || px >= SKIN_W || py >= SKIN_H) return null
    return { x: px, y: py }
  }

  const drawPixel = (x: number, y: number, hex: string) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    if (hex === 'transparent') {
      ctx.clearRect(x, y, 1, 1)
    } else {
      ctx.fillStyle = hex
      ctx.fillRect(x, y, 1, 1)
    }
  }

  // Draw a 1px line between two pixels (Bresenham) so fast strokes don't leave gaps
  const drawLine = (x0: number, y0: number, x1: number, y1: number, hex: string) => {
    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1
    const sy = y0 < y1 ? 1 : -1
    let err = dx - dy
    let cx = x0
    let cy = y0
    // Safety bound (skin is 64x64)
    for (let i = 0; i < 256; i++) {
      drawPixel(cx, cy, hex)
      if (cx === x1 && cy === y1) break
      const e2 = err * 2
      if (e2 > -dy) {
        err -= dy
        cx += sx
      }
      if (e2 < dx) {
        err += dx
        cy += sy
      }
    }
  }

  const fillBucket = (sx: number, sy: number, replacement: string) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    const img = ctx.getImageData(0, 0, SKIN_W, SKIN_H)
    const data = img.data

    const idx = (x: number, y: number) => (y * SKIN_W + x) * 4
    const targetR = data[idx(sx, sy)]
    const targetG = data[idx(sx, sy) + 1]
    const targetB = data[idx(sx, sy) + 2]
    const targetA = data[idx(sx, sy) + 3]

    const [rr, gg, bb, aa] = hexToRgba(replacement)

    if (targetR === rr && targetG === gg && targetB === bb && targetA === aa) return

    const stack: [number, number][] = [[sx, sy]]
    while (stack.length) {
      const [x, y] = stack.pop()!
      if (x < 0 || y < 0 || x >= SKIN_W || y >= SKIN_H) continue
      const i = idx(x, y)
      if (
        data[i] !== targetR ||
        data[i + 1] !== targetG ||
        data[i + 2] !== targetB ||
        data[i + 3] !== targetA
      )
        continue
      data[i] = rr
      data[i + 1] = gg
      data[i + 2] = bb
      data[i + 3] = aa
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
    }

    ctx.putImageData(img, 0, 0)
  }

  const pickColor = (x: number, y: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return
    const d = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbaToHex(d[0], d[1], d[2], d[3])
    if (hex !== 'transparent') {
      setColor(hex)
      setTool('pencil')
    }
  }

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const p = eventToPixel(e)
    if (!p) return
    if (tool === 'eyedropper') {
      pickColor(p.x, p.y)
      return
    }
    // Right-click acts as a temporary eraser
    altEraseRef.current = e.button === 2
    pushHistory()
    setIsDrawing(true)
    lastPixelRef.current = p
    if (tool === 'bucket' && !altEraseRef.current) {
      fillBucket(p.x, p.y, color)
    } else {
      const erase = altEraseRef.current || tool === 'eraser'
      drawPixel(p.x, p.y, erase ? 'transparent' : color)
    }
    redrawEditor()
    updatePreview()
  }

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const p = eventToPixel(e)
    setHoverPx(p)
    if (!p || !isDrawing) {
      redrawEditor()
      return
    }
    if (tool === 'pencil' || tool === 'eraser' || altEraseRef.current) {
      const erase = altEraseRef.current || tool === 'eraser'
      const last = lastPixelRef.current
      if (last) {
        drawLine(last.x, last.y, p.x, p.y, erase ? 'transparent' : color)
      } else {
        drawPixel(p.x, p.y, erase ? 'transparent' : color)
      }
      lastPixelRef.current = p
      redrawEditor()
      updatePreview()
    }
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
    lastPixelRef.current = null
    altEraseRef.current = false
  }

  const handleLeave = () => {
    setIsDrawing(false)
    lastPixelRef.current = null
    altEraseRef.current = false
    setHoverPx(null)
    redrawEditor()
  }

  // Import skin
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        pushHistory()
        ctx.clearRect(0, 0, SKIN_W, SKIN_H)
        // Convert legacy 64x32 to 64x64 by drawing arms+legs mirrored
        if (img.width === 64 && img.height === 32) {
          ctx.drawImage(img, 0, 0)
        } else {
          ctx.drawImage(img, 0, 0, SKIN_W, SKIN_H)
        }
        redrawEditor()
        updatePreview()
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // Export skin
  const handleExport = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `yuutiers-skin-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const handleReset = () => {
    if (!confirm('Reset to default Steve skin? Unsaved changes will be lost.')) return
    pushHistory()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.clearRect(0, 0, SKIN_W, SKIN_H)
      ctx.drawImage(img, 0, 0)
      redrawEditor()
      updatePreview()
    }
    img.src = DEFAULT_SKIN
  }

  const handleClear = () => {
    if (!confirm('Clear the entire skin?')) return
    pushHistory()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, SKIN_W, SKIN_H)
    redrawEditor()
    updatePreview()
  }

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      } else if (e.key.toLowerCase() === 'b') setTool('pencil')
      else if (e.key.toLowerCase() === 'e') setTool('eraser')
      else if (e.key.toLowerCase() === 'g') setTool('bucket')
      else if (e.key.toLowerCase() === 'i') setTool('eyedropper')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyStack, redoStack])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated diagonal background */}
      <div className="fixed inset-0 pointer-events-none diagonal-bg opacity-70" aria-hidden />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="diagonal-bg-orb-a" />
        <div className="diagonal-bg-orb-b" />
      </div>
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(5,5,8,0.5),rgba(5,5,8,0.92))]" aria-hidden />

      <Navbar />

      <main className="relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Live 3D Skin Studio
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#f1f1f7] mb-3 text-balance">
              Skin Editor
            </h1>
            <p className="text-[#8a8aa3] max-w-2xl mx-auto text-pretty text-sm">
              Design custom Minecraft skins pixel by pixel with a real-time 3D preview, layer
              outlines, and full undo history.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-4">
            {/* Left toolbar */}
            <motion.aside
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Tools */}
              <div className="rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#5a5a76] mb-3 flex items-center gap-1.5">
                  <Palette className="w-3 h-3" /> Tools
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {TOOLS.map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTool(t.id)}
                        className={cn(
                          'flex flex-col items-center gap-1 py-3 rounded-lg border text-xs transition-all',
                          tool === t.id
                            ? 'bg-[#a855f7]/15 border-[#a855f7]/40 text-[#a855f7]'
                            : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#8a8aa3] hover:text-[#f1f1f7]',
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{t.label}</span>
                        <kbd className="text-[9px] text-[#5a5a76]">{t.shortcut}</kbd>
                      </button>
                    )
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={undo}
                    disabled={historyStack.length === 0}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-xs text-[#8a8aa3] hover:text-[#f1f1f7] disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <Undo2 className="w-3.5 h-3.5" /> Undo
                  </button>
                  <button
                    onClick={redo}
                    disabled={redoStack.length === 0}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-xs text-[#8a8aa3] hover:text-[#f1f1f7] disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <Redo2 className="w-3.5 h-3.5" /> Redo
                  </button>
                </div>
              </div>

              {/* Color picker */}
              <div className="rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#5a5a76] mb-3">Color</h3>
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-2 border-[rgba(255,255,255,0.1)]"
                    aria-label="Pick color"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#f1f1f7] focus:border-[#a855f7]/40 focus:outline-none uppercase"
                    placeholder="#3b82f6"
                  />
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={cn(
                        'aspect-square rounded transition-transform hover:scale-110',
                        color.toLowerCase() === c.toLowerCase() && 'ring-2 ring-[#a855f7]',
                      )}
                      style={{ background: c }}
                      title={c}
                      aria-label={`Pick ${c}`}
                    />
                  ))}
                </div>
              </div>

              {/* View options */}
              <div className="rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#5a5a76] mb-3 flex items-center gap-1.5">
                  <Layers className="w-3 h-3" /> View
                </h3>
                <ToggleRow
                  icon={Grid3x3}
                  label="Grid"
                  active={showGrid}
                  onClick={() => setShowGrid((v) => !v)}
                />
                <ToggleRow
                  icon={Eye}
                  label="Body regions"
                  active={showRegions}
                  onClick={() => setShowRegions((v) => !v)}
                />
                <ToggleRow
                  icon={Layers}
                  label="Outer layer (preview)"
                  active={showOverlay}
                  onClick={() => setShowOverlay((v) => !v)}
                />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(['classic', 'slim'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setModel(m)}
                      className={cn(
                        'py-2 rounded-lg text-xs font-medium transition-all capitalize border',
                        model === m
                          ? 'bg-[#a855f7]/15 border-[#a855f7]/40 text-[#a855f7]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#8a8aa3]',
                      )}
                    >
                      {m === 'classic' ? <User className="w-3 h-3 inline mr-1" /> : null}
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* Center canvas */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-4 flex flex-col items-center"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="flex items-center gap-2 text-xs text-[#8a8aa3]">
                  {hoverPx ? (
                    <span className="font-mono">
                      {hoverPx.x}, {hoverPx.y}
                    </span>
                  ) : (
                    <span>64 × 64 pixels</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-xs text-[#8a8aa3] hover:text-[#f1f1f7] transition">
                    <Upload className="w-3.5 h-3.5" />
                    Import
                    <input type="file" accept="image/png" onChange={handleImport} className="hidden" />
                  </label>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#a855f7]/15 border border-[#a855f7]/30 text-xs text-[#a855f7] hover:bg-[#a855f7]/25 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export PNG
                  </button>
                </div>
              </div>

              <canvas
                ref={editorRef}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handleLeave}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  width: 'min(100%, 768px)',
                  height: 'auto',
                  imageRendering: 'pixelated',
                  cursor:
                    tool === 'eyedropper'
                      ? 'crosshair'
                      : tool === 'bucket'
                        ? 'cell'
                        : 'crosshair',
                }}
                className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0a0a0f] select-none touch-none"
              />

              {/* Hidden raw skin canvas */}
              <canvas ref={canvasRef} width={SKIN_W} height={SKIN_H} className="hidden" />

              <div className="mt-3 flex items-center gap-2 text-[11px] text-[#5a5a76]">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 hover:text-[#f1f1f7] transition"
                >
                  <RotateCcw className="w-3 h-3" /> Reset to Steve
                </button>
                <span>·</span>
                <button onClick={handleClear} className="hover:text-[#ef4444] transition">
                  Clear all
                </button>
                <span>·</span>
                <span>Shortcuts: B / E / G / I · Right-click to erase · Ctrl+Z / Ctrl+Y</span>
              </div>
            </motion.div>

            {/* Right preview */}
            <motion.aside
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#5a5a76] mb-3 flex items-center gap-1.5">
                  <Eye className="w-3 h-3" /> Live Preview
                </h3>
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[#0a0a0f] to-[#1a1a22] border border-[rgba(255,255,255,0.06)] overflow-hidden">
                  {skinDataUrl && (
                    <SkinPreview
                      skinUrl={skinDataUrl}
                      model={model}
                      showOverlay={showOverlay}
                    />
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-4">
                <h3 className="text-[11px] uppercase tracking-wider text-[#5a5a76] mb-2">
                  Body Regions
                </h3>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {REGIONS.slice(0, 6).map((r) => (
                    <div
                      key={r.name}
                      className="flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(255,255,255,0.02)]"
                    >
                      <span
                        className="w-2 h-2 rounded-sm"
                        style={{ background: r.color }}
                      />
                      <span className="text-[#8a8aa3]">{r.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="text-[10px] text-[#5a5a76] uppercase tracking-wider mb-1.5">
                    Outer Layer
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    {REGIONS.slice(6).map((r) => (
                      <div
                        key={r.name}
                        className="flex items-center gap-1.5 px-2 py-1 rounded bg-[rgba(255,255,255,0.02)]"
                      >
                        <span
                          className="w-2 h-2 rounded-sm"
                          style={{ background: r.color }}
                        />
                        <span className="text-[#8a8aa3]">{r.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ToggleRow({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-1.5 text-xs text-[#c0c0d0] hover:text-[#f1f1f7] transition"
    >
      <span className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
      {active ? (
        <Eye className="w-3.5 h-3.5 text-[#a855f7]" />
      ) : (
        <EyeOff className="w-3.5 h-3.5 text-[#5a5a76]" />
      )}
    </button>
  )
}
