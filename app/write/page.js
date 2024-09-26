'use client'

// import { getServerSession } from "next-auth"
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

import {useState } from'react'

export default function Write() {  

    const [imageUrl, setImageUrl] = useState('');

    return(
        <div className="p-20">
            <h4>글작성</h4>
            <form action="/api/post/new" method="POST">

            <input name="title" placeholder="글제목"></input>
            <input name="content" placeholder="글내용"></input>
            <input type="hidden" name="imageUrl" value={imageUrl} />
            <input type="file" accept="image/*"
                onChange={ async (e)=>{
                    const file = e.target.files[0];
        if (!file) return;

        // -> 미리보기 
        // const objectURL = URL.createObjectURL(file);

        // setImageUrl(objectURL);

        // setFile(file);


        // 이미지 파일 저장시키기

        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const response = await fetch('/api/post/image', {
                method: 'POST',  // 명시적으로 POST 메소드 설정
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const data = await response.json();

            setImageUrl(data.url);

            console.log('Uploaded image', data);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Image upload failed.');
        }

                }}
            />
            <img src={imageUrl}/>

                <button type="submit">
                     버튼
                </button>
            </form>

        </div>
    )
    
    
}