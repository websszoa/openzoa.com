export const onRequestGet = () => {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'openzoa.com' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
