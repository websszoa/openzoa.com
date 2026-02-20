export const onRequestGet = () => {
  return new Response(
    JSON.stringify({
      message: 'Hello from Cloudflare',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
