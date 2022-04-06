import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuteticateRequest{
    email: string,
    password: string
}

class AuthenticateUSerService{

    async execute({email, password}: IAuteticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepository);

        const user = await usersRepositories.findOne({
            email
        });

        //Verificar se o email existe na base de dados
        if(!user) {
            throw new Error("email/password incorrect");
        }

        //Caso exista verificar a senha
        const passwaordMatch = await compare(password, user.password);

        if(!passwaordMatch){
            throw new Error("email/password incorrect");
        }

        //Gerar o tokem
        const token = sign(
        {
            email: user.email
        }, 
        "6555f46cb2615d06170afd5a7f82f4cb",
        {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}


export { AuthenticateUSerService };