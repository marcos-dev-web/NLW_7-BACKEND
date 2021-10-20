import { Response } from "express";
import GetLast3MessagesService from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
  async handle(_: any, response: Response) {
    const getLast3MessagesService = new GetLast3MessagesService();

    const result = await getLast3MessagesService.execute();

    return response.json(result);
  }
}

export default GetLast3MessagesController;
