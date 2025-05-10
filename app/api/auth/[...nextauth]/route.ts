// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import authConfig from "../../../../auth.config"; // make sure path is correct

const handler = NextAuth(authConfig);

export const GET = handler;
export const POST = handler;
