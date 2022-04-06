import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest{
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name, email, admin, password}: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepository);
        
        if(!email){
            throw new Error("email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            throw new Error("user already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            admin,
            password: passwordHash,
            email,
        });

        usersRepository.save(user);

        return user;
    }

}


export { CreateUserService };