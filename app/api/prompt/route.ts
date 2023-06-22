import dbConnect from "@lib/dbConnect"
import Prompt from "@models/prompt"



export const POST = async (req : Request) => {
    const {name , email , content , tag} = await req.json()

    try{
        await dbConnect()
        const newPrompt = new Prompt({
            name,
            email,
            content,
            tag
        })
        await newPrompt.save()
        return new Response(JSON.stringify((newPrompt)) , {status : 201})
    }catch(error){
        console.log(error)
    }
}

export const GET = async (request : Request) => {
    try {
        await dbConnect()

        const prompts = await Prompt.find({}).populate('name')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 