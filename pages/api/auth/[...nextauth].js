import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {

    providers: [
        GithubProvider({
            clientId: 'Ov23libgyJ0ij1MsSEyS',
            clientSecret: '9e2f46265e1185c75714f04850cb25c85e3f3c3b',
        })
    ],
    //-> jwt
    secret: 'qwer1234'

};

export default NextAuth(authOptions);