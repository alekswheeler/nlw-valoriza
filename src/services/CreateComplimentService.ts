import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepository } from "../repositories/UsersRepositories";

interface IComplimentREquest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute ({ tag_id, user_sender, user_receiver, message }: IComplimentREquest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepository = getCustomRepository(UsersRepository);

        const userReceiverExists = await usersRepository.findOne(user_receiver);

        if(user_sender === user_receiver){
            throw new Error("Incorrect user receiver");       
        }

        if(!userReceiverExists){
            throw new Error("user receiver doesn't exists");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        complimentsRepositories.save(compliment);

        return compliment;
    }
}


export { CreateComplimentService };