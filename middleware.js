import NextAuth from 'next-auth';
import { authProviderConfigList } from './auth.config';

const { auth } = NextAuth(authProviderConfigList);
export default auth(function middleware(req) {
  // custom middleware logic goes here
});

// Filter Middleware to avoid API routes and static assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
