"use server"
import { SERVER_URL } from "@/constants"
import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(req: Request) {
  console.log("Request for prescription upload");
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
    console.log("file not provided");
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File Converted to buffer");

    // Was not appending to form instance directly, had to create buffer TODO: check if correct way 
    const axiosFormData = new FormData();
    axiosFormData.append('file', buffer, file.name);

    console.log("requesting Django");
    const csrf_tok = req.headers.get('X-CSRFToken')
    if(csrf_tok===null)
    {
      console.log("token not found")
      return NextResponse.json({ error: 'Token not found' }, { status: 500 });
    }

    const response = await axios.post(`${SERVER_URL}upload/`, axiosFormData, {
      headers: {
        ...axiosFormData.getHeaders(),
        'X-CSRFToken': req.headers.get('X-CSRFToken') || '',
        'X-APIKEY': process.env.API_KEY,
        'X-username': req.headers.get('x-username') || '',
      },
      withCredentials: true,
    });
    console.log("Django returned");

    return NextResponse.json(response.data);
  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    } else {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}
