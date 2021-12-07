import usersService from "../users/service";
import hashService from "../../general/services/hahshService";
import jwtService from "../../general/services/jwtService";

const loginService = {
  login: async (email: string, password: string) => {
    const users = usersService.getUserByEmail(email);
    if (!users) return false;
    const match = await hashService.mach(password, users.password);
    if (!match) return false;
    const token = await jwtService.sign(users);
    return token;
  },
};

export default loginService;
