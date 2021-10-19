import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  avatar_url: string;
  url: string;
  name: string;
  location: string;
  public_repos: number;
  bio?: string;
  blog?: string;
}

class AuthenticateUserService {
  GITHUB_CLIENT_ID: string = process.env.GITHUB_CLIENT_ID;
  GITHUB_CLIENT_SECRET: string = process.env.GITHUB_CLIENT_SECRET;
  JWT_SECRET: string = process.env.JWT_SECRET;

  public async execute(code: string) {
    const URL = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(URL, null, {
      params: {
        client_id: this.GITHUB_CLIENT_ID,
        client_secret: this.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const { data: userData } = await axios.get<IUserResponse>("https://github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: userData.id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          avatar_url: userData.avatar_url,
          bio: userData?.bio,
          blog: userData?.blog,
          github_id: userData.id,
          location: userData.location,
          login: userData.url,
          name: userData.name,
          public_respos: userData.public_repos,
          url: userData.url,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: userData.name,
          avatar_url: userData.avatar_url,
          id: userData.id,
        },
      },
      this.JWT_SECRET,
    );

    return {
      token,
      user,
    };
  }
}

export default AuthenticateUserService;
