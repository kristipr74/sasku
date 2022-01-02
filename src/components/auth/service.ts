import playersService from "../players/service";
import hashService from "../../general/services/hahshService";
import jwtService from "../../general/services/jwtService";

const loginService = {
  login: async (email: string, password: string) => {
    const players = playersService.getPlayersByEmail(email);
    if (!players) return false;
    const match = await hashService.mach(password, players.password);
    if (!match) return false;
    const token = await jwtService.sign(players);
    return token;
  },
};

export default loginService;
