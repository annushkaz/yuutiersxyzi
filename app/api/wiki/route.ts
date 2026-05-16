import { NextRequest, NextResponse } from 'next/server'

const WIKI_API_BASE = 'https://es.minecraft.wiki/api.php'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action') || 'query'
  const search = searchParams.get('search')
  const titles = searchParams.get('titles')
  const list = searchParams.get('list')
  const category = searchParams.get('category')
  const section = searchParams.get('section')
  
  try {
    let url = `${WIKI_API_BASE}?format=json&origin=*`
    
    if (action === 'search' && search) {
      url += `&action=query&list=search&srsearch=${encodeURIComponent(search)}&srlimit=30&srprop=snippet|timestamp|size|titlesnippet|sectionsnippet`
    } else if (action === 'parse' && titles) {
      url += `&action=parse&page=${encodeURIComponent(titles)}&prop=text|categories|images|sections|displaytitle|properties|wikitext&redirects=1&disabletoc=0`
    } else if (action === 'content' && titles) {
      // Get full article content parsed as HTML
      url += `&action=parse&page=${encodeURIComponent(titles)}&prop=text|categories|images|sections|displaytitle|wikitext&redirects=1`
      if (section) {
        url += `&section=${section}`
      }
    } else if (action === 'summary' && titles) {
      url += `&action=query&titles=${encodeURIComponent(titles)}&prop=extracts|pageimages|info|categories|revisions&exintro=0&explaintext=1&exlimit=1&pithumbsize=800&inprop=url&rvprop=timestamp|user`
    } else if (action === 'fullsummary' && titles) {
      // Get extended extract (not just intro)
      url += `&action=query&titles=${encodeURIComponent(titles)}&prop=extracts|pageimages|info|categories|revisions&explaintext=1&exlimit=1&pithumbsize=800&inprop=url&rvprop=timestamp|user`
    } else if (action === 'images' && titles) {
      url += `&action=query&titles=${encodeURIComponent(titles)}&prop=images|pageimages&pithumbsize=800&imlimit=20`
    } else if (action === 'links' && titles) {
      url += `&action=query&titles=${encodeURIComponent(titles)}&prop=links|categories|extlinks&pllimit=50&ellimit=20`
    } else if (action === 'infobox' && titles) {
      // Get page properties including infobox data
      url += `&action=query&titles=${encodeURIComponent(titles)}&prop=revisions|pageprops&rvprop=content&rvslots=main&ppprop=infoboxes`
    } else if (list === 'recentchanges') {
      url += `&action=query&list=recentchanges&rcprop=title|timestamp|user|comment|sizes|flags|tags&rclimit=50&rctype=edit|new&rcnamespace=0`
    } else if (list === 'categorymembers' && category) {
      url += `&action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmlimit=100&cmprop=title|timestamp|sortkey|type`
    } else if (list === 'allcategories') {
      url += `&action=query&list=allcategories&aclimit=50&acprop=size|hidden`
    } else if (action === 'random') {
      url += `&action=query&list=random&rnlimit=20&rnnamespace=0`
    } else if (action === 'opensearch' && search) {
      // Autocomplete search
      url = `${WIKI_API_BASE}?action=opensearch&search=${encodeURIComponent(search)}&limit=10&namespace=0&format=json&origin=*`
    } else if (action === 'prefixsearch' && search) {
      url += `&action=query&list=prefixsearch&pssearch=${encodeURIComponent(search)}&pslimit=15`
    } else if (action === 'pageviews' && titles) {
      // Note: This is a custom endpoint, may not work with all wikis
      url += `&action=query&titles=${encodeURIComponent(titles)}&prop=pageviews&pvipdays=30`
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'YuuTiers/1.0 (https://yuutiers.xyz; contact@yuutiers.xyz)',
        'Accept': 'application/json',
      },
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error(`Wiki API responded with ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
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
