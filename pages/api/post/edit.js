import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function handler(요청, 응답) {


    if (요청.method == 'POST') {
        const { id, title, content } = 요청.body;

        if (!title || !content) {
            const missingField = !title ? '제목' : '내용';
            return 응답.status(400).json(`${missingField}을(를) 입력해주세요`);
        }

        try {
            const db = (await connectDB).db("forum");
            
            await db.collection("post").updateOne({_id: new ObjectId(요청.body._id)}, {$set : {
                title : 요청.body.title,
                content : 요청.body.content,
            }}) 

            return 응답.status(200).redirect('/list');
        } catch (error) {
            console.error('데이터베이스 오류:', error);
            return 응답.status(400).json("서버 오류가 발생했습니다");
        }
    }

}