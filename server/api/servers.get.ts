import { defineEventHandler, setHeader, createError } from 'h3'

const API_URL = 'https://game.aq3d.com/api/game/ServerList'
const MOBILE_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'

export default defineEventHandler(async (event) => {
  // Cache hint for edge/CDN
  setHeader(event, 'Cache-Control', 's-maxage=60, stale-while-revalidate=600')
  try {
    const data = await $fetch<any[]>(API_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': MOBILE_USER_AGENT
      },
      timeout: 10_000,
    })
    return data
  } catch (error: any) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch server list',
      data: { message: error?.message ?? 'unknown error' },
    })
  }
})


