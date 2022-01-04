import playersService from "../players/service";
import hashService from "../../general/services/hahshService";
import jwtService from "../../general/services/jwtService";

const loginService = {
  login: async (email: string, password: string) => {
    const player = await playersService.getPlayersByEmail(email);
    if (!player) return false;
    const match = await hashService.mach(password, player.password);
    if (!match) return false;
    const token = await jwtService.sign(player);
    return token;
  },
};

export default loginService;
