import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({});

// input Types
type UserInput = {
    text:string,
    context:string
}


// GET Method Route
export function GET(request: Request) {
    const message = 'Hello, this is a GET response from the API route!'
    return new Response(message, { status: 200 })
}

// POST Method Route
export async function POST(request: Request) {
    try {
        const userInput:UserInput = await request.json()
        const context = userInput.context
        const response = await gemini.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userInput.text+ context

        });
        return new Response(response.text, { status: 200 })
    } catch (error) {
        const message =
      error instanceof Error ? error.message : 'Unexpected error'
 
    return new Response(message, { status: 500 })
    }
}