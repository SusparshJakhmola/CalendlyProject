import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";
import {create, getAll, getById, remove, update} from "../repositories/user.repository.js";
import {findByEmail} from "../repositories/user.repository.js";
import { conflict, notFound } from "../utils/api-error.js";
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

export async function updateUser(id:number, data:UpdateUserDto){
    const user=await getById(id);
    if(!user){
        throw notFound("User not found");
    }
    if(data.email && data.email!==user.email){
        const existingUser=await findByEmail(data.email);
        if(existingUser){
            throw conflict("Email already in use");
        }
    }
    const updatedUser=await update(id, data);
    return updatedUser;
}

export async function deleteUser(id:number){
    const user=await getById(id);
    if(!user){
        throw notFound("User not found");
    }
    return await remove(id);
}