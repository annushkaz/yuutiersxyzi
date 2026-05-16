import { NextRequest, NextResponse } from 'next/server'

const WIKI_API_BASE = 'https://es.minecraft.wiki/api.php'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action') || 'query'
  const search = searchParams.get('search')
  const titles = searchParams.get('titles')
  const list = searchParams.get('list')
  const category = searchParams.get('category')
  
  try {
    let url = `${WIKI_API_BASE}?format=json&origin=*`
    
    if (action === 'search' && search) {
      // Search articles
      url += `&action=query&list=search&srsearch=${encodeURIComponent(search)}&srlimit=20&srprop=snippet|timestamp|size`
    } else if (action === 'parse' && titles) {
      // Get article content
      url += `&action=parse&page=${encodeURIComponent(titles)}&prop=text|categories|images|sections&redirects=1`
    } else if (action === 'summary' && titles) {
      // Get article summary
      url += `&action=query&titles=${encodeURIComponent(titles)}&prop=extracts|pageimages|info&exintro=1&explaintext=1&pithumbsize=500&inprop=url`
    } else if (list === 'recentchanges') {
      // Get recent changes
      url += `&action=query&list=recentchanges&rcprop=title|timestamp|user|comment|sizes&rclimit=20&rctype=edit|new`
    } else if (list === 'categorymembers' && category) {
      // Get category members
      url += `&action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmlimit=50&cmprop=title|timestamp|sortkey`
    } else if (action === 'random') {
      // Get random articles
      url += `&action=query&list=random&rnlimit=10&rnnamespace=0`
    } else if (action === 'featured') {
      // Get popular/featured pages (using pageviews)
      url += `&action=query&list=mostviewed&pvimlimit=10`
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'YuuTiers/1.0 (https://yuutiers.xyz)',
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    })

    if (!response.ok) {
      throw new Error(`Wiki API responded with ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error) {
    console.error('Wiki API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from Wiki API' },
      { status: 500 }
    )
  }
}
