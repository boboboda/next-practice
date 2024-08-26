export default function handler(요청, 응답) {
    

    // if(요청.method === 'POST'){
    //     응답.status(201).json('새로운 요청이 들어옴')
    // }

    console.log(요청.query)
    

    return 응답.status(200).json('처리완료')
}