import jwt from "jsonwebtoken";
import { IPlayer } from "../../components/players/interface";
import config from "../../config";

const jwtService = {
  sign: async (players: IPlayer): Promise<string> => {
    const payload = {
      id: players.id,
      role: players.role,
    };
    const token = await jwt.sign(payload, config.jwtSecret, {
      expiresIn: "5h",
    });
    return token;
  },
  verify: async (token: string) => {
    try {
      const playload = await jwt.verify(token, config.jwtSecret);
      return playload;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};

export default jwtService;
