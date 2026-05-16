import axios from 'axios'
import type { MojangProfile, MinecraftProfile, PlayerData, ServerData, MojangNewsResponse } from '@/types/minecraft'

const MOJANG_API = 'https://api.mojang.com'
const SESSION_SERVER = 'https://sessionserver.mojang.com'
const CRAFATAR = 'https://crafatar.com'
const MCSRVSTAT = 'https://api.mcsrvstat.us/3'

// Mojang API
export async function getUUIDFromUsername(username: string): Promise<MojangProfile | null> {
  try {
    const response = await axios.get<MojangProfile>(
      `${MOJANG_API}/users/profiles/minecraft/${username}`
    )
    return response.data
  } catch {
    return null
  }
}

export async function getMinecraftProfile(uuid: string): Promise<MinecraftProfile | null> {
  try {
    const response = await axios.get<MinecraftProfile>(
      `${SESSION_SERVER}/session/minecraft/profile/${uuid}`
    )
    return response.data
  } catch {
    return null
  }
}

// Parse skin data from profile properties
export function parseSkinData(profile: MinecraftProfile): { url: string; variant: 'classic' | 'slim' } | null {
  if (!profile.properties) return null
  
  const texturesProperty = profile.properties.find(p => p.name === 'textures')
  if (!texturesProperty) return null
  
  try {
    const decoded = JSON.parse(atob(texturesProperty.value))
    const textures = decoded.textures
    
    if (textures.SKIN) {
      return {
        url: textures.SKIN.url,
        variant: textures.SKIN.metadata?.model === 'slim' ? 'slim' : 'classic'
      }
    }
  } catch {
    return null
  }
  
  return null
}

// Get full player data
export async function getPlayerData(nameOrUuid: string): Promise<PlayerData | null> {
  try {
    let uuid = nameOrUuid
    let name = nameOrUuid
    
    // Check if it's a username or UUID
    if (!nameOrUuid.includes('-') && nameOrUuid.length !== 32) {
      const profile = await getUUIDFromUsername(nameOrUuid)
      if (!profile) return null
      uuid = profile.id
      name = profile.name
    }
    
    // Format UUID without dashes
    const cleanUuid = uuid.replace(/-/g, '')
    
    // Get full profile
    const fullProfile = await getMinecraftProfile(cleanUuid)
    const skinData = fullProfile ? parseSkinData(fullProfile) : null
    
    return {
      uuid: formatUUID(cleanUuid),
      name: fullProfile?.name || name,
      skin: skinData || { url: `${CRAFATAR}/skins/${cleanUuid}`, variant: 'classic' },
      renders: {
        avatar: `${CRAFATAR}/avatars/${cleanUuid}?size=128&overlay=true`,
        head: `${CRAFATAR}/renders/head/${cleanUuid}?scale=10&overlay=true`,
        body: `${CRAFATAR}/renders/body/${cleanUuid}?scale=10&overlay=true`,
        fullBody: `${CRAFATAR}/renders/body/${cleanUuid}?scale=10&overlay=true`
      }
    }
  } catch {
    return null
  }
}

// Format UUID with dashes
export function formatUUID(uuid: string): string {
  const clean = uuid.replace(/-/g, '')
  return `${clean.slice(0,8)}-${clean.slice(8,12)}-${clean.slice(12,16)}-${clean.slice(16,20)}-${clean.slice(20)}`
}

// Server API
export async function getServerStatus(ip: string): Promise<ServerData | null> {
  try {
    const response = await axios.get(`${MCSRVSTAT}/${ip}`)
    const data = response.data
    
    return {
      ip: data.ip || ip,
      port: data.port || 25565,
      online: data.online || false,
      players: {
        online: data.players?.online || 0,
        max: data.players?.max || 0,
        list: data.players?.list?.map((p: { name: string }) => p.name) || []
      },
      version: {
        name: data.version || 'Unknown',
        protocol: data.protocol || 0
      },
      motd: {
        raw: data.motd?.raw || [],
        clean: data.motd?.clean || [],
        html: data.motd?.html || []
      },
      icon: data.icon || null,
      software: data.software || null,
      plugins: data.plugins || [],
      mods: data.mods || [],
      hostname: data.hostname
    }
  } catch {
    return null
  }
}

// Mojang News
export async function getMojangNews(): Promise<MojangNewsResponse | null> {
  try {
    const response = await axios.get<MojangNewsResponse>(
      'https://launchercontent.mojang.com/news.json'
    )
    return response.data
  } catch {
    return null
  }
}

// Crafatar URLs
export const crafatarUrls = {
  avatar: (uuid: string, size = 128) => 
    `${CRAFATAR}/avatars/${uuid.replace(/-/g, '')}?size=${size}&overlay=true`,
  head: (uuid: string, scale = 10) => 
    `${CRAFATAR}/renders/head/${uuid.replace(/-/g, '')}?scale=${scale}&overlay=true`,
  body: (uuid: string, scale = 10) => 
    `${CRAFATAR}/renders/body/${uuid.replace(/-/g, '')}?scale=${scale}&overlay=true`,
  skin: (uuid: string) => 
    `${CRAFATAR}/skins/${uuid.replace(/-/g, '')}`,
  cape: (uuid: string) => 
    `${CRAFATAR}/capes/${uuid.replace(/-/g, '')}`,
}

// Download skin
export async function downloadSkin(uuid: string, playerName: string): Promise<void> {
  const url = crafatarUrls.skin(uuid)
  const response = await fetch(url)
  const blob = await response.blob()
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${playerName}_skin.png`
  link.click()
  URL.revokeObjectURL(link.href)
}

// Parse MOTD colors
export function parseMotdColors(motd: string): string {
  const mcColors: Record<string, string> = {
    '§0': '#000000', '§1': '#0000AA', '§2': '#00AA00',
    '§3': '#00AAAA', '§4': '#AA0000', '§5': '#AA00AA',
    '§6': '#FFAA00', '§7': '#AAAAAA', '§8': '#555555',
    '§9': '#5555FF', '§a': '#55FF55', '§b': '#55FFFF',
    '§c': '#FF5555', '§d': '#FF55FF', '§e': '#FFFF55',
    '§f': '#FFFFFF',
  }
  
  let result = motd
  Object.entries(mcColors).forEach(([code, color]) => {
    result = result.replace(new RegExp(code, 'gi'), `</span><span style="color:${color}">`)
  })
  
  // Remove formatting codes
  result = result.replace(/§[klmnor]/gi, '')
  
  return `<span>${result}</span>`
}
