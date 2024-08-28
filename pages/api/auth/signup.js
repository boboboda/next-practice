import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {

    if(req.method === 'POST'){

        let db = (await connectDB).db('forum');

        let existingUser = await db.collection('user_cred').findOne({email:req.body.email});

        if(existingUser){
           return res.status(409).json({message: '이미 가입된 이메일입니다.'});
        } 

        let hash = await bcrypt.hash(req.body.password,10)

            req.body.password = hash
    
            await db.collection('user_cred').insertOne(req.body);
            res.status(200).json({message:'가입성공'}).redirect('/');
    }

}