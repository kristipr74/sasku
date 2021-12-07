import jwt from "jsonwebtoken";
import { User } from "../../components/users/interface";
import config from "../../config";

const jwtService = {
  sign: async (user: User): Promise<string> => {
    const payload = {
      id: user.id,
    };
    const token = await jwt.sign(payload, config.jwtSecret, {
      expiresIn: "1h",
    });
    return token;
  },
  verify: async (token: string) => {
    try {
      const playload = await jwt.verify(token, config.jwtSecret);
      return playload;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default jwtService;
