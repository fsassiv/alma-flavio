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
      async authorize() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          return { id: '001', name: '_teste', password: 'teste@123' };
        }
        return null;
      },
    }),
  ],
  callbacks: {},
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
};
