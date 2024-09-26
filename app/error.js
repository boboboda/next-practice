'use client'

export default function Error({error, reset}) {
    return(
        <div>
            <h4>에러남 ㅅㄱ</h4>
            <button onClick={()=>{reset() }}>다시실행</button>
        </div>
        
    )
}