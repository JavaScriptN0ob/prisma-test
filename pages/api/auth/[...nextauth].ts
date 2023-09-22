// import { NextApiHandler } from 'next';
// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import prisma from '../../../lib/prisma';

// const options = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   secret: process.env.SECRET,
// };

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
// export default authHandler;

/*
  Above code copied from https://vercel.com/guides/nextjs-prisma-postgres
  which creates Prisma adapter is already out-dated (deprecated).

  The new adapter package called @auth/prisma-adapter
  Codes should no longer export authHandler, 
  instead a NextAuth without req & res should be export

  More to read: https://authjs.dev/reference/adapter/prisma

  Another tip if you find out that this 
  next route redirects github login url from http to https
  and pop-up with unexceptional error
  -> set vercel environment variable to BLANK, not 1.
  More to read: https://stackoverflow.com/questions/71807327/nextjs-auth-this-site-can-t-provide-a-secure-connection
  ```
    VERCEL = "" <- NOT 1
  ```
*/

import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.SECRET,
});