'use client'

import { useState } from "react"

export default function Write() {
    
    let [userInput, setUserInput] = useState("")
    
    
    return(
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">

            <input name="title" placeholder="글제목"></input>
            <input name="content" placeholder="글내용"></input>
                <button type="submit">
                     버튼
                </button>
            </form>

        </div>
    )
}