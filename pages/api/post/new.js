import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(요청, 응답) {

    let session = await getServerSession(요청, 응답, authOptions)

    console.log(session.user.email)

    if(session) {
        요청.body.author = session.user.email;
    }

    if (요청.method == 'POST') {
        const { title, content } = 요청.body;

        if (!title || !content) {
            const missingField = !title ? '제목' : '내용';
            return 응답.status(400).json(`${missingField}을(를) 입력해주세요`);
        }

        try {
            const db = (await connectDB).db("forum");
            await db.collection("post").insertOne(요청.body);
            return 응답.status(200).redirect('/list');

        } catch (error) {
            console.error('데이터베이스 오류:', error);
            return 응답.status(400).json("서버 오류가 발생했습니다");
        }
    }

}