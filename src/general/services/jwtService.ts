import jwt from "jsonwebtoken";
import { User } from "../../components/user/interface";

const jwtPassword = "aurehtföoamvösjefrqmömö";

const jwtService = {
  sign: async (user: User) => {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, jwtPassword, { expiresIn: "1h" });
    return token;
  },
  verify: async (token: string) => {
    const verify = await jwt.verify(token, jwtPassword);
    return verify;
  },
};

export default jwtService;