import {Request, Response} from "express";
import {findAllUsers as findAllUsersService,findById as findByIdService,createUser as createUserService} from "../services/user.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function findAllUsers(_req:Request, res:Response){
    const response=await findAllUsersService();
    sendSuccess(res, response);
}

export async function findById(req:Request, res:Response){
    const {id}=req.params;
    const response=await findByIdService(Number(id));
    sendSuccess(res, response);
}

export async function createUser(_req:Request, res:Response){
    const newUser=await createUserService(_req.body);
    sendSuccess(res, newUser,201,"User created successfully");
}