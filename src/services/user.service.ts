import { CreateUserDto } from "../dtos/user.dto.js";
import {create, getAll, getById} from "../repositories/user.repository.js";
import {findByEmail} from "../repositories/user.repository.js";
import { conflict } from "../utils/api-error.js";
export async function findAllUsers(){
    const users=await getAll();
    return users;
}

export async function findById(id:number){
    const user=await getById(id);
    if(!user){
        throw new Error("User not found");
    }
    return user;
}

export async function createUser(data:CreateUserDto){
    const existingUser=await findByEmail(data.email);
    if(existingUser){
        throw conflict("User already exists");
    }
    const user=await create(data);
    return user;
}