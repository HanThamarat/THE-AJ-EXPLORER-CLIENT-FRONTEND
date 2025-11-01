// @ts-nocheck
// @ts-ignore
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { OAuth2Client } from 'google-auth-library';
import { AxiosInstance } from '@/app/hooks/axiosInstance';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || 'fallback-secret-only-for-dev',
  providers: [
    CredentialsProvider({
        id: 'google-one-tap',
        name: 'GoogleOneTap',
        credentials: { idToken: { type: 'text' } },
        async authorize(credentials) {
            if (!credentials.idToken) return null;
            try {
                const ticket = await googleClient.verifyIdToken({
                    idToken: credentials.idToken as string,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });

                const payload = ticket.getPayload();
                if (!payload) throw new Error('Could not verify token');

                const res = await AxiosInstance.post('/auth/google-signin', payload);
                
                const contentType = res.headers['content-type'];
                
                if (res.status !== 200 || !contentType?.includes('application/json')) {
                    console.error(`[Auth.js] Google authorize failed: Backend sent a non-JSON response. Status: ${res.status}`);
                    throw new Error('Server error. Please try again.');
                }

                return res.data.body || res.data;
            } catch (error: any) {
                console.error('[Auth.js] Google Authorize Error:', error.message);
                
                // Better error handling
                if (error.response) {
                    // Backend responded with error
                    console.error('[Auth.js] Backend error:', error.response.data);
                    throw new Error(error.response.data.message || 'Authentication failed');
                }
                
                throw new Error(error.message || 'Authentication failed');
            }
        },
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'Email & Password',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin-customer`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.AUTH_BACKEND_SECRET}`,
              },
              body: JSON.stringify(credentials),
            }
          );

          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            console.error(`[Auth.js] Credentials authorize failed: Backend sent a non-JSON response. Status: ${res.status}`);
            if (res.status === 401) throw new Error('Invalid email or password');
            throw new Error('Server error. Please try again.');
          }

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || 'Invalid credentials');
          }
          return data;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export const { GET, POST } = handlers;