import prismaClient from "../prisma";

class ProfileUserServices {
  async execute(user_id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}

export default ProfileUserServices;
