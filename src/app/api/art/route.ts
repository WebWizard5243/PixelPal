import { NextRequest, NextResponse } from "next/server";
import axios from "axios";



export  async function POST(request : NextRequest){
  
    try {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        const reqbody = await request.json();
       const {id} = reqbody;
       const response = await axios.post(`https://pixabay.com/api/?key=${key}&image_type=all&id=${id}`);
       return NextResponse.json(response.data);


    } catch (error : any) {
        return NextResponse.json({error : error.message},
            {status : 500})
        }

}