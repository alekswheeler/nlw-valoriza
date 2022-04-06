import { Request, Response } from "express";
import { AuthenticateUSerService } from "../services/AuthenticateUserService";



class AuthenticateUserController{

    async handle(request: Request, response: Response) {
        const {email, password} = request.body;

        const authenticateUSerService = new AuthenticateUSerService();
        const token = await authenticateUSerService.execute({email, password});

        return response.json(token);
    }
}


export { AuthenticateUserController };