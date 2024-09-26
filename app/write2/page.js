import { connectDB } from "@/util/database"
import { revalidatePath } from "next/cache"

export default async function Write2() {

    const db = (await connectDB).db('forum')
        let result = await db.collection('post_test').find().toArray()

    //서버 api 페이지 단에서 만들 수 있음
    async function handleSubmit(formData) {

        'use server'
        

        const db = (await connectDB).db('forum')
        db.collection('post_test').insertOne({title: formData.get('title')})
        console.log(formData.get('title'))

        // 서버 새로고침
        revalidatePath('/write2')
    }


    return(
        <div>
            <form action={handleSubmit}>
                <input name="title"></input>
                <button type="submit">버튼</button>
            </form>
            {
                result ? result.map((a)=> 
            <p>글제목: {a.title}</p>
                 ) : null
}
        </div>
    )
}