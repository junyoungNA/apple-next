import { connectDB } from "@/app/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '17ffc723952af4a0db4d',
      clientSecret: '11dc90868196b61d53902f17b63f20aff4f99c56',
    }),
  ],
  secret : 'jwt생성시쓰는암호',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 