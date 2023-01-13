import mongoose, { Schema } from "mongoose";

const chatCollections = "messages"

const chatSchema= new mongoose.Schema({
    user: String,
    message: String,
})

export const chatModel = mongoose.model(chatCollections, chatSchema)