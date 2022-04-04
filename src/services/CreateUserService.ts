import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepositories";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name, email, admin}: IUserRequest){
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

        const user = usersRepository.create({
            name,
            admin,
            email,
        });

        usersRepository.save(user);

        return user;
    }

}


export { CreateUserService };