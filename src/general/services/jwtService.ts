import jwt from "jsonwebtoken";
import { User } from "../../components/user/interface";
import config from "../../config";

const jwtSecret = "aurehtföoamvösjefrqmömö";

const jwtService = {
  sign: async (user: User): Promise<string> => {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    return token;
  },
  verify: async (token: string) => {
    const verify = await jwt.verify(token, jwtSecret);
    return verify;
  },
};

export default jwtService;
