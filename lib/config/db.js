import mongoose from "mongoose";

//DB password:Hl3BtbeZNSOOym6x

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://leo88728:Hl3BtbeZNSOOym6x@todo-app-cluster.clktpdw.mongodb.net/');
    console.log('connect');
};