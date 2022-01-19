/* import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

let token: string;
let gamesId: number;

describe("Games conroller", () => {
  describe("GET / games", () => {
    it("respons with 200 and error message game of no invalid token", async () => {
      const response = await request(app).get("/games").send(player);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.a("string");
      token = response.body.token;
    }); */
/*          it("respons with 401 and error message game of no token provided", async () => {
      const response = await request(app).get("/games");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Kontrolli sisestatud andmeid");
    });
    it("respons with 401 and error message game of no invalid token", async () => {
      const response = await request(app)
        .get("/games")
        .set("/authorization", "Bearer jdefrupyaiuhör");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.message).to.equal("Invalid token ");
    });
    it("respons with 200 and array of games", async () => {
      const response = await request(app)
        .get("/games")
        .set("/authorization", `Bearer $(token)`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("games");
      expect(response.body.games).to.a("array");
      expect(response.body.games.length).to.greaterThan(0);
    });
  });
  describe("POST / games", () => {
    it("respons with 201 and error message of missing descriptions", async () => {
      const response = await request(app)
        .post("/games")
        .set("/authorization", `Bearer $(token)`)
        .send({
          type: "Individuaal",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key("id");
      expect(response.body.games).to.a("number");
      gamesId = response.body.id;
    }); */
/*   });
}); */
