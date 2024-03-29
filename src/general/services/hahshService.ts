import bcrypt from "bcrypt";

const saltRounds = 10;

const hashService = {
  hash: async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  },
  mach: async (password: string, hash: string): Promise<boolean> => {
    console.log(password, hash);
    const match = await bcrypt.compare(password, hash);
    return match;
  },
};

export default hashService;
