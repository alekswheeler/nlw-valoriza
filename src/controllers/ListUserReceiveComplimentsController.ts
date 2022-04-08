import { Request, Response } from "express";
import { ListUserReceiveComplimetsService } from "../services/ListUserReceiveComlimentsService";

class ListUserReceiveComplimentsController{

    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const listUserReceiveComplimentsService = new ListUserReceiveComplimetsService();

        const compliments = await listUserReceiveComplimentsService.execute(user_id);

        return response.json(compliments);
    }

}

export { ListUserReceiveComplimentsController };