import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const NEXT_AUTH_OPTIONS: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing username or password');
        }

        if (
          credentials.username === 'admin' &&
          credentials.password === 'admin'
        ) {
          return { id: '1', name: 'Admin', username: credentials.username };
        }

        throw new Error('Invalid credentials');
      },
    }),
  ],
  callbacks: {},
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
};
