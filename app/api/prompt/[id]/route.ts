import dbConnect from "@lib/dbConnect"
import Prompt from "@models/prompt"


export const GET = async (request : Request,  { params } : {params : {id: string}}) => {
    try {
        await dbConnect()

        const prompt = await Prompt.find({email : params.id})
        console.log()
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request :Request,  { params } : {params : {id: string}}) => {
    const { content, tag } = await request.json();
    console.log(tag , content)
    try {
        await dbConnect();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.content = content;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request : Request ,   { params } : {params : {id: string}}) => {
    try {
        await dbConnect();
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};