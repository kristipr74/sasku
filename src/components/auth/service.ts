import userService from "../user/service";
import hashService from "../../general/services/hahshService";
import jwtService from "../../general/services/jwtService";

const loginService = {
  login: async (email: string, password: string) => {
    const user = userService.getUserByEmail(email);
    if (!user) return false;
    const match = await hashService.compare(password, user.password);
    if (!match) return false;
    const token = await jwtService.sign(user);
    return token;
  },
};

export default loginService;
