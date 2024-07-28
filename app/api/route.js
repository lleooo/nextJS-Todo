import {connectDB} from "@/lib/config/db";
import todoModel from "@/lib/models/Todomodel";
import {NextResponse} from "next/server";

const loadDB = async () => {
    await connectDB();
};
loadDB();


export async function GET(requset) {
    const todos = await todoModel.find({});
    return NextResponse.json({todos: todos});
}

export async function POST(requset) {
    const {title, description} = await requset.json();
    await todoModel.create({title, description});
    return NextResponse.json({msg: "Todo created"});
}

export async function DELETE(requset) {
    const id = await requset.nextUrl.searchParams.get('mongoId');
    await todoModel.findByIdAndDelete(id);
    return NextResponse.json({msg: "Todo Deleted"});
}

export async function PUT(requset) {
    const id = await requset.nextUrl.searchParams.get('mongoId');
    await todoModel.findByIdAndUpdate(id, {
        $set: {
            isCompleted: true
        }
    });
    return NextResponse.json({msg: "Todo Completed"});
}