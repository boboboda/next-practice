import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res) {

   const session = await getToken({req: req})

   if(req.nextUrl?.pathname.startsWith('/write')) {
    if(session == null) {
        return NextResponse.redirect('http://localhost:3000/api/auth/signin')
       }
   }


//    request.cookies.get('쿠키이름')  //출력
//   request.cookies.has('쿠키이름')  //존재확인
//   request.cookies.delete('쿠키이름')  //삭제
  
//   const response = NextResponse.next()
//   response.cookies.set({
//     name: 'mode',
//     value: 'dark',
//     maxAge: 3600,
//     httpOnly : true
//   })  
//   return response


    // console.log(req.nextUrl)
    // console.log(req.cookies)
    // console.log(req.headers)

    // NextResponse.next()
    // NextResponse.redirect()
    // NextResponse.rewrite()

    // if(req.nextUrl.pathname === '/list'){
    //     console.log(new Date())
    //     console.log(req.headers.get('sec-ch-ua-platform'))
    //     return NextResponse.next()
    // }

    // console.log(req.nextUrl.pathname)
}