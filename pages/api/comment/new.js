import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(요청, 응답) {

    let session = await getServerSession(요청, 응답, authOptions)


    if(session === null) {
      console.log('로그인 필요')
      return 응답.status(401).json("로그인이 필요합니다.")
  }
    let userId = null
   
    if (session && session.user) {
        userId = session.user.email || session.user._id
    }

    
  if (요청.method == 'POST'){

    
    요청.body = JSON.parse(요청.body)
    
    if(요청.body.content == '') return 응답.status(401).json("내용을 입력해주세요.")

    let 저장할거 = {
      content : 요청.body.content,
      parent : new ObjectId(요청.body._id) ,
      author : userId
    }
    let db = (await connectDB).db('forum');
    let result = await db.collection('comment').insertOne(저장할거);

    // revalidatePath('/write')

    응답.status(201).json('성공')
  }
} 