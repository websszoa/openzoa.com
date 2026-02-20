import { onRequestPost as __api_gemini_ts_onRequestPost } from "/Users/webstoryboy/Documents/GitHub/openzoa.com/functions/api/gemini.ts"
import { onRequestGet as __api_hello_ts_onRequestGet } from "/Users/webstoryboy/Documents/GitHub/openzoa.com/functions/api/hello.ts"
import { onRequestGet as __health_ts_onRequestGet } from "/Users/webstoryboy/Documents/GitHub/openzoa.com/functions/health.ts"

export const routes = [
    {
      routePath: "/api/gemini",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_gemini_ts_onRequestPost],
    },
  {
      routePath: "/api/hello",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_hello_ts_onRequestGet],
    },
  {
      routePath: "/health",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__health_ts_onRequestGet],
    },
  ]