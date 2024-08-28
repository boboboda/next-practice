import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {

    providers: [
        GithubProvider({
            clientId: 'Ov23libgyJ0ij1MsSEyS',
            clientSecret: '9e2f46265e1185c75714f04850cb25c85e3f3c3b',
        }),

        CredentialsProvider({
            //1. 로그인페이지 폼 자동생성해주는 코드 
            name: "credentials",
              credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials){
                let db = (await connectDB).db('forum');
                let user = await db.collection('user_cred').findOne({ email: credentials.email });

                if(!user) {
                    console.log('해당 이메일은 없음');
                    return null
                }

                const pwcheck = await bcrypt.compare(credentials.password, user.password);

                if(!pwcheck) {
                    console.log('비밀번호가 틀림')
                    return null
                }

                return user;

            }
        
        })
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 //30일
      },
    
    
      callbacks: {
        //4. jwt 만들 때 실행되는 코드 
        //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
        jwt: async ({ token, user }) => {
          if (user) {
            token.user = {};
            token.user.name = user.name
            token.user.email = user.email
          }
          return token;
        },
        //5. 유저 세션이 조회될 때 마다 실행되는 코드
        session: async ({ session, token }) => {
          session.user = token.user;  
          return session;
        },
      },

    //-> jwt    
    secret : process.env.NEXTAUTH_SECRET,
    adapter : MongoDBAdapter(connectDB)

};

export default NextAuth(authOptions);