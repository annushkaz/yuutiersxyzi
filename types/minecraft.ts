// Minecraft API Types

export interface MojangProfile {
  id: string
  name: string
}

export interface MinecraftProfile {
  uuid: string
  name: string
  properties?: {
    name: string
    value: string
  }[]
}

export interface PlayerData {
  uuid: string
  name: string
  skin: {
    url: string
    variant: 'classic' | 'slim'
  }
  cape?: {
    url: string
    type: string
  }
  nameHistory?: NameHistoryEntry[]
  renders: {
    avatar: string
    head: string
    body: string
    fullBody: string
  }
}

export interface NameHistoryEntry {
  name: string
  changedToAt?: number
}

export interface ServerData {
  ip: string
  port: number
  online: boolean
  players: {
    online: number
    max: number
    list?: string[]
  }
  version: {
    name: string
    protocol: number
  }
  motd: {
    raw: string[]
    clean: string[]
    html: string[]
  }
  icon?: string
  software?: string
  plugins?: string[]
  mods?: string[]
  hostname?: string
}

export interface MojangNews {
  title: string
  tag: string
  category: string
  date: string
  text: string
  playPageImage: {
    title: string
    url: string
  }
  newsPageImage?: {
    title: string
    url: string
  }
  readMoreLink: string
  newsType: string[]
  id: string
}

export interface MojangNewsResponse {
  entries: MojangNews[]
}

export interface ModrinthMod {
  slug: string
  title: string
  description: string
  categories: string[]
  client_side: string
  server_side: string
  project_type: string
  downloads: number
  icon_url: string
  color: number
  versions: string[]
  follows: number
  date_created: string
  date_modified: string
  author: string
}

export interface MojangStatus {
  name: string
  status: 'green' | 'yellow' | 'red'
}

export interface HypixelStats {
  success: boolean
  player: {
    uuid: string
    displayname: string
    networkExp: number
    networkLevel: number
    karma: number
    firstLogin: number
    lastLogin: number
    stats?: {
      Bedwars?: {
        wins_bedwars: number
        losses_bedwars: number
        final_kills_bedwars: number
        final_deaths_bedwars: number
        beds_broken_bedwars: number
        beds_lost_bedwars: number
        kills_bedwars: number
        deaths_bedwars: number
      }
      SkyWars?: {
        wins: number
        losses: number
        kills: number
        deaths: number
      }
      Duels?: {
        wins: number
        losses: number
        kills: number
        deaths: number
      }
    }
  }
}
