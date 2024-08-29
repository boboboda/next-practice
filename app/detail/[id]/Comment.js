'use client'

import { getServerSession } from 'next-auth'
import { useState } from 'react'

export default function Comment(props) {

    const [comment, setComment] = useState('')

    return(
        <div>
                <div>
                    댓글목록 보여줄 부분
                </div>
                <input onChange={(e)=>{
                    setComment(e.target.value) 
                }}></input>
                <button onClick={()=>{
                    fetch("/api/comment/new",{
                        method:'POST',
                        body: JSON.stringify({
                            content: comment,
                            _id: props.postId
                        })
                    })

                    
                }}>댓글전송</button>

                
            </div>
    )
}