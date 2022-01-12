import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";
import responseCodes from "../src/general/responseCodes";

let token: string;

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

const newPlayer = {
  email: "uus@gmail.com",
  password: "uus",
};

//let playersId: number;

describe("Players conroller", () => {
/*    describe("GET /players", () => {
    it("respons with code 200 and players array", async () => {
      const response = await request(app).get("/players");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body.players).to.be.a("array");
      expect(response.body.players.length).to.be.gt(0);
    }); 
  }); */
  describe("POST / players", () => {
    it("respons with code 200 and token after login", async () => {
      const response = await request(app).post("/login").send(player);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.be.a("string");
      token = response.body.token;
    });
  });
/*   describe("POST / players", () => {
    it("respons with code 401 and error message - no token", async () => {
      const response = await request(app).post("/players").send(newPlayer);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body.error).to.equal("No token provide");
    });
  }); */ 
});
