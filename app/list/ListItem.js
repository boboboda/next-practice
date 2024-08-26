'use client'

import Link from "next/link"

export default function ListItem({data}){

    return(
        <div>
            {
                data.map((item, index) => 
                   
                        <div className="list-item" key={index}>
                            <Link href={'/detail/'+ item._id}>
                         <h4>{item.title}</h4>
                            </Link>
                            <Link href={'/edit/' + item._id}>✏️</Link>
                            <span onClick={(e)=>{
                                fetch('/api/post/delete', 
                                    {
                                        method:'DELETE',
                                        body: item._id

                                }).then((r)=>{
                                    return r.json()
                                })
                                .then(()=>{
                                    e.target.parentElement.style.opacity = 0
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = 'none'
                                    }, 1000)
                                })


                                // 쿼리 스트링
                                // fetch('/api/test?name=kim&age=20')
                            }}>🗑️</span>
                            <p>1월 1일</p>
                        </div>
                )
            }
        </div>
    )
}