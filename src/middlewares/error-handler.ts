import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error.js";
import { NODE_ENV } from "../config/env.js";
export function errorHandler(_err:Error, _req:Request, res:Response, _next:NextFunction){
    if(_err instanceof ApiError){
        const body :Record<string, unknown> = {
            success:false,
            message:_err.message,
        }
        if(_err.details){
            body.details=_err.details;
        }
        res.status(_err.statusCode).json(body);
    }
    console.error('[error]', _err);
    const body :Record<string, unknown> = {
        success:false,
        message:'Something went wrong',
    }
    if(NODE_ENV==="development"){
        body.details=_err.stack;
    }
    res.status(500).json(body);
}