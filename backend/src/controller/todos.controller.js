import mongoose from "mongoose";
import { Todo } from "../models/todos.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createTodo =  asyncHandler(async (req,res)=>{
   
    
     const {title, content } = req.body;
     const createdBy = req.user.userId;
    if(!title || !content ){
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
 
})

export const getTodos = asyncHandler(async(req,res)=>{


    const userId = req.user.userId;
  
      const alltodos = await Todo.find({ createdBy: userId}).sort({ createdAt: -1 });

      return res.status(200).json({
        message : "Get all todos",
        todos : alltodos,
      })
  
  } )
  




export const updateTodo = asyncHandler(async(req,res) => {

 
   const { id: todoId } = req.params;
    const { title , content} = req.body;
  
    const userID = req.user.userId;
  
     if(!title && !content){
       throw Error("At least one field is required to update")
     }
  
     const todo = await Todo.findOne({_id : todoId , createdBy : userID});
  
      if(!todo){
        return res.status(404).json({
          message : "Todo is not Found",
        })
      }
  
       if(title)todo.title = title
       if(content)todo.content = content
  
       await todo.save();
  
       return res.status(200).json({
        message : "Todo update successfully",
       })
 
})


export const deleteTodo = asyncHandler( async(req,res)=>{
   
         const { id: todoId } = req.params;
         const userID = req.user.userId;;
 
       const todo = await Todo.findOneAndDelete({_id : todoId , createdBy : userID});
       
       if(!todo){
         return res.status(404).json({
           message : "Your todo is not Found"
         })
       }
 
       return res.status(200).json({
         message : "The Todo is Deleted Successfully"
       })

})