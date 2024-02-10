import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    ISBN_No: {
        type:String,
        required:true
    },
    Book_name: {
        type:String,
        required:true
    },
    Author: {
        type:String,
        required:true
    },
    Description: {
        type:String,
        required:true
    },
    Qty: {
        type:String,
        required:true
    },
    Price: {
        type:String,
        required:true
    },
    Book_image: {
        type:String,
        required:true
    },
})

export default mongoose.model("Book",bookSchema)