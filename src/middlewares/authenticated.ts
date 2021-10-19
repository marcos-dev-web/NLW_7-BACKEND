import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

function authenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "ACCESS_DENIED",
    });
  }

  const token = authToken.split(" ")[1];

  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const result = verify(token, JWT_SECRET) as IPayload;

    request.user_id = String(result.user.id);

    return next();
  } catch (err) {
    console.log(err)
    return response.status(401).json({
      errorCode: "INVALID_TOKEN",
    });
  }
}

export default authenticated;
