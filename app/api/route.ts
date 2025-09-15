import { GoogleGenAI } from "@google/genai";
import babelFishPrompt from "../prompts/prompt";
import { tutorPrompt } from "../prompts/tutorPrompt";

const gemini = new GoogleGenAI({});

// input Types
type Submission = {
    userId:string,
    userSubject:string,
    userBody:string,
    exerciseId:string,
    exerciseType:string,
    exerciseTo:string,
    exerciseCc:string[],
    exercisePrompt:string,
    exerciseBody:string,
    exerciseSubject:string,
    context:string,
}


// GET Method Route
export function GET(request: Request) {
    const message = 'Hello, this is a GET response from the API route!'
    return new Response(message, { status: 200 })
}

// POST Method Route
export async function POST(request: Request) {
    const userSubmission:Submission = await request.json()
    const {userId,userSubject,context,exerciseBody,exerciseCc,exerciseId,exercisePrompt,exerciseSubject,exerciseTo,exerciseType,userBody } = userSubmission
    
    if (//!userId ||
         !userSubject || !userBody || !exerciseId || !exerciseType || !exerciseTo || !exercisePrompt || !exerciseBody || !exerciseSubject || !context || !exerciseCc) {
        return new Response('Missing required fields', { status: 400 })
    }


    // 1 - Create the prompt
    // 2 - Call Gemini API
    // 3 - Return the response
    // 4 - Handle errors
    // 5 - format the response
    // 6 - Return the response


    try {
        const prompt = babelFishPrompt({context,exerciseBody,exerciseCc,exercisePrompt,exerciseSubject,exerciseTo,exerciseType,userBody,userSubject,tutorPrompt})
        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt

        });

        return new Response(response.text, { status: 200 })
    } catch (error) {
        const message =
      error instanceof Error ? error.message : 'Unexpected error'
 
    return new Response(message, { status: 500 })
    }
}