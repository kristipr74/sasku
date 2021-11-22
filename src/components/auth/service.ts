import userService from "../user/service";
import hashService from "../../general/services/hahshService";

const loginService = {
  login: async (email: string, password: string) => {
    const user = userService.getUserByEmail(email);
    if (!user) return false;
    const match = await hashService.match(password, user.password);
    return match;
  },
};

export default loginService;
