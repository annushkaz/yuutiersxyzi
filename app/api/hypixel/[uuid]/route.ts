import { NextResponse } from 'next/server'

interface HypixelPlayer {
  success: boolean
  player: {
    uuid: string
    displayname: string
    rank?: string
    packageRank?: string
    newPackageRank?: string
    monthlyPackageRank?: string
    prefix?: string
    networkExp?: number
    karma?: number
    firstLogin?: number
    lastLogin?: number
    lastLogout?: number
    achievementPoints?: number
    totalRewards?: number
    totalDailyRewards?: number
    rewardStreak?: number
    rewardScore?: number
    stats?: {
      Bedwars?: {
        wins_bedwars?: number
        losses_bedwars?: number
        kills_bedwars?: number
        deaths_bedwars?: number
        final_kills_bedwars?: number
        final_deaths_bedwars?: number
        beds_broken_bedwars?: number
        beds_lost_bedwars?: number
        games_played_bedwars?: number
        winstreak?: number
        coins?: number
        Experience?: number
      }
      SkyWars?: {
        wins?: number
        losses?: number
        kills?: number
        deaths?: number
        souls?: number
        coins?: number
        games_played_skywars?: number
      }
      Duels?: {
        wins?: number
        losses?: number
        kills?: number
        deaths?: number
        coins?: number
        games_played_duels?: number
      }
      TNTGames?: {
        wins?: number
        coins?: number
      }
      Arcade?: {
        coins?: number
      }
      BuildBattle?: {
        wins?: number
        coins?: number
        games_played?: number
        score?: number
      }
      MurderMystery?: {
        wins?: number
        kills?: number
        deaths?: number
        coins?: number
        games?: number
      }
    }
  } | null
}

function calculateLevel(exp: number): number {
  const BASE = 10000
  const GROWTH = 2500
  const HALF_GROWTH = GROWTH / 2
  
  const reversePqPrefix = -(BASE - 0.5 * GROWTH) / GROWTH
  const reverseConst = reversePqPrefix * reversePqPrefix
  const growth_divides_2 = 2 / GROWTH
  
  return exp < 0 ? 1 : Math.floor(1 + reversePqPrefix + Math.sqrt(reverseConst + growth_divides_2 * exp))
}

function getRankName(player: HypixelPlayer['player']): string {
  if (!player) return 'Default'
  if (player.prefix) return player.prefix.replace(/§./g, '')
  if (player.rank === 'ADMIN') return 'ADMIN'
  if (player.rank === 'MODERATOR') return 'MOD'
  if (player.rank === 'HELPER') return 'HELPER'
  if (player.rank === 'YOUTUBER') return 'YOUTUBE'
  if (player.monthlyPackageRank === 'SUPERSTAR') return 'MVP++'
  if (player.newPackageRank === 'MVP_PLUS') return 'MVP+'
  if (player.newPackageRank === 'MVP') return 'MVP'
  if (player.newPackageRank === 'VIP_PLUS') return 'VIP+'
  if (player.newPackageRank === 'VIP') return 'VIP'
  if (player.packageRank === 'MVP_PLUS') return 'MVP+'
  if (player.packageRank === 'MVP') return 'MVP'
  if (player.packageRank === 'VIP_PLUS') return 'VIP+'
  if (player.packageRank === 'VIP') return 'VIP'
  return 'Default'
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params
  const apiKey = process.env.HYPIXEL_API_KEY
  
  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: 'NO_API_KEY',
      message: 'Hypixel API key not configured',
      planckeUrl: `https://plancke.io/hypixel/player/stats/${uuid}`,
    }, { status: 200 })
  }
  
  try {
    const cleanUuid = uuid.replace(/-/g, '')
    
    const response = await fetch(
      `https://api.hypixel.net/player?uuid=${cleanUuid}`,
      {
        headers: {
          'API-Key': apiKey,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )
    
    if (!response.ok) {
      if (response.status === 403) {
        return NextResponse.json({
          success: false,
          error: 'INVALID_API_KEY',
          message: 'Invalid Hypixel API key',
          planckeUrl: `https://plancke.io/hypixel/player/stats/${uuid}`,
        }, { status: 200 })
      }
      if (response.status === 429) {
        return NextResponse.json({
          success: false,
          error: 'RATE_LIMITED',
          message: 'Rate limited by Hypixel API',
          planckeUrl: `https://plancke.io/hypixel/player/stats/${uuid}`,
        }, { status: 200 })
      }
      throw new Error(`Hypixel API error: ${response.status}`)
    }
    
    const data: HypixelPlayer = await response.json()
    
    if (!data.success || !data.player) {
      return NextResponse.json({
        success: false,
        error: 'PLAYER_NOT_FOUND',
        message: 'Player has never played on Hypixel',
        planckeUrl: `https://plancke.io/hypixel/player/stats/${uuid}`,
      }, { status: 200 })
    }
    
    const player = data.player
    const level = calculateLevel(player.networkExp || 0)
    const rank = getRankName(player)
    
    // Calculate Bedwars level
    const bedwarsExp = player.stats?.Bedwars?.Experience || 0
    const bedwarsLevel = Math.floor(bedwarsExp / 5000)
    
    return NextResponse.json({
      success: true,
      data: {
        displayname: player.displayname,
        uuid: player.uuid,
        rank,
        level,
        karma: player.karma || 0,
        achievementPoints: player.achievementPoints || 0,
        firstLogin: player.firstLogin,
        lastLogin: player.lastLogin,
        lastLogout: player.lastLogout,
        online: player.lastLogin && player.lastLogout ? player.lastLogin > player.lastLogout : false,
        stats: {
          bedwars: player.stats?.Bedwars ? {
            level: bedwarsLevel,
            wins: player.stats.Bedwars.wins_bedwars || 0,
            losses: player.stats.Bedwars.losses_bedwars || 0,
            kills: player.stats.Bedwars.kills_bedwars || 0,
            deaths: player.stats.Bedwars.deaths_bedwars || 0,
            finalKills: player.stats.Bedwars.final_kills_bedwars || 0,
            finalDeaths: player.stats.Bedwars.final_deaths_bedwars || 0,
            bedsBroken: player.stats.Bedwars.beds_broken_bedwars || 0,
            bedsLost: player.stats.Bedwars.beds_lost_bedwars || 0,
            gamesPlayed: player.stats.Bedwars.games_played_bedwars || 0,
            winstreak: player.stats.Bedwars.winstreak || 0,
            coins: player.stats.Bedwars.coins || 0,
            kdr: player.stats.Bedwars.deaths_bedwars 
              ? ((player.stats.Bedwars.kills_bedwars || 0) / player.stats.Bedwars.deaths_bedwars).toFixed(2)
              : '0.00',
            fkdr: player.stats.Bedwars.final_deaths_bedwars
              ? ((player.stats.Bedwars.final_kills_bedwars || 0) / player.stats.Bedwars.final_deaths_bedwars).toFixed(2)
              : '0.00',
            wlr: player.stats.Bedwars.losses_bedwars
              ? ((player.stats.Bedwars.wins_bedwars || 0) / player.stats.Bedwars.losses_bedwars).toFixed(2)
              : '0.00',
          } : null,
          skywars: player.stats?.SkyWars ? {
            wins: player.stats.SkyWars.wins || 0,
            losses: player.stats.SkyWars.losses || 0,
            kills: player.stats.SkyWars.kills || 0,
            deaths: player.stats.SkyWars.deaths || 0,
            souls: player.stats.SkyWars.souls || 0,
            coins: player.stats.SkyWars.coins || 0,
            gamesPlayed: player.stats.SkyWars.games_played_skywars || 0,
            kdr: player.stats.SkyWars.deaths
              ? ((player.stats.SkyWars.kills || 0) / player.stats.SkyWars.deaths).toFixed(2)
              : '0.00',
          } : null,
          duels: player.stats?.Duels ? {
            wins: player.stats.Duels.wins || 0,
            losses: player.stats.Duels.losses || 0,
            kills: player.stats.Duels.kills || 0,
            deaths: player.stats.Duels.deaths || 0,
            coins: player.stats.Duels.coins || 0,
            gamesPlayed: player.stats.Duels.games_played_duels || 0,
            kdr: player.stats.Duels.deaths
              ? ((player.stats.Duels.kills || 0) / player.stats.Duels.deaths).toFixed(2)
              : '0.00',
          } : null,
          murderMystery: player.stats?.MurderMystery ? {
            wins: player.stats.MurderMystery.wins || 0,
            kills: player.stats.MurderMystery.kills || 0,
            deaths: player.stats.MurderMystery.deaths || 0,
            coins: player.stats.MurderMystery.coins || 0,
            gamesPlayed: player.stats.MurderMystery.games || 0,
          } : null,
          buildBattle: player.stats?.BuildBattle ? {
            wins: player.stats.BuildBattle.wins || 0,
            coins: player.stats.BuildBattle.coins || 0,
            gamesPlayed: player.stats.BuildBattle.games_played || 0,
            score: player.stats.BuildBattle.score || 0,
          } : null,
        },
      },
      planckeUrl: `https://plancke.io/hypixel/player/stats/${player.displayname}`,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Hypixel API error:', error)
    return NextResponse.json({
      success: false,
      error: 'API_ERROR',
      message: 'Failed to fetch Hypixel stats',
      planckeUrl: `https://plancke.io/hypixel/player/stats/${uuid}`,
    }, { status: 200 })
  }
}
