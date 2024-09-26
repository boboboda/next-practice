'use client'

import { getServerSession } from 'next-auth'
import { useEffect, useState } from 'react'

export default function Comment(props) {

    let [comment, setComment] = useState('')

    let [data, setData] = useState([])

    //-> 타이머, ajax 코드 사용, 재랜더링 될때마다 실행
    useEffect(() => {
       const data = fetch(`/api/comment/list?parent=${props.postId}`)
       .then(res=>res.json())
       .then((result)=>{
           setData(result)
       })
    }, [])

    return(
        <div>
                <hr></hr>
                {

                    data?.length > 1 ?

                    data.map((a, i)=>{
                        return <p key={i}>{a.content}</p>
                    })
                    :
                    <p>댓글이 없습니다.</p>
                }
                <input 
                value={comment}
                onChange={(e)=>{
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
                    .then(res=>res.json())
                    .then((result)=>{
                        if(result ==='성공') {
                            console.log(result)
                            setData([...data, {content: comment}])

                            setComment('')
                        }
                    })

                    
                }}>댓글전송</button>

                
            </div>
    )
}