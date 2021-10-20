import { Response, Request } from "express";
import ProfileUserServices from "../services/ProfileUserServices";

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const profileUserServices = new ProfileUserServices();

    const result = await profileUserServices.execute(request.user_id);

    return response.json(result);
  }
}

export default ProfileUserController;
