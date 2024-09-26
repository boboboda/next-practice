import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Comment from "./Comment"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { notFound } from "next/navigation"


export default async function Detail(props) {

    let session =await getServerSession(authOptions)

    const db = (await connectDB).db("forum")
    let result = await db.collection("post").findOne
    ({_id: new ObjectId(props.params.id)})

        

        if(result === null) {
            return notFound()
        }

        let userId = null
        if (session && session.user) {
            userId = session.user.email || session.user._id
        }
        
    return(
        <div>
            <h4>상세페이지</h4>
            <h4>제목: {result.title}</h4>
            <hr></hr>
            <img src={result.imageUrl}/>
            <p>{result.content}</p>
            <Comment postId={props.params.id} id={userId}/>
        </div>
    )
}