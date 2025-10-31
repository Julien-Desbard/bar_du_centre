
import { auth } from "@/auth"

export default auth((req) => {
  const isAuthenticated = !!req.auth
  
  // Si l'utilisateur n'est pas connecté et tente d'accéder à /admin
  if (!isAuthenticated && req.nextUrl.pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }
})

export const config = {
  matcher: ['/admin/:path*'] // Protège toutes les routes /admin
}