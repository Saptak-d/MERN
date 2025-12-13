import mongoose from "mongoose";
import { Todo } from "../models/todos.models";


export const createTodo = async (req,res)=>{
   try {
     const {title, content , createdBy} = req.body;
    if(!title || !content || !createdBy){
      throw new Error("ALL fileds are required to create an todo ");
    }
    const existtodo = await Todo.findOne({title,createdBy});
    if(existtodo){
        throw new Error("The Todo is alredy exist ");
    }
 
    const todo = await Todo.create({
     title,
     content,
     createdBy
    });
 
    return res.status(201).json({
      message : "Todo is created successfully",
      todo
    })
   } catch (error) {
       return res.status(400).json({
      message: error.message,
    });
   }
}

export const updateTodo = async(req,res) => {
  
         
             



}