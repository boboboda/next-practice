
import { connectDB } from "@/util/database"
import Link from "next/link"
import DetailLink from "./DetailLink"

export default async function List() {

    const db = (await connectDB).db("forum")
    let result = await db.collection("post").find({}).toArray()

    return (
        <div className="list-bg">
            {
                result.map((item, index) => 
                   
                        <div className="list-item" key={index}>
                            <Link href={'/detail/'+ item._id}>
                         <h4>{item.title}</h4>
                            </Link>
                            <Link href={'/edit/' + item._id}>✏️</Link>
                            <p>1월 1일</p>
                        </div>
                )
            }
        </div>
    )
} 