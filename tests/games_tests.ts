import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

let token: string;
let gameId: number;

describe("Games conroller", () => {
  describe("GET / games", () => {
    it("respons with code 200 and token after 'login'", async () => {
      const response = await request(app).post("/login").send(player);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.be.a("string");
      token = response.body.token;
    });

    it("response with code 401 and token not provide", async () => {
      const response = await request(app).get("/players");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("No token provided");
    });

    it("vresponse with code 401 and invalid token", async () => {
      const response = await request(app)
        .get("/players")
        .set("Authorization", "Bearer khsdlialknc.k<jdsvsz.b c.");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Token is not valid");
    });

    it("response with code 200 ja and return array", async () => {
      const response = await request(app)
        .get("/games")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("games");
      expect(response.body.games).to.be.a("array");
      expect(response.body.games.length).to.greaterThan(0);
    });

    it("response with code 400 ja and not found player by ID", async () => {
      const response = await request(app)
        .get(`/games/${gameId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Sellise id-ga mänge ei ole");
    });

/*     it("response with code 200 and found player by ID", async () => {
      const response = await request(app)
        .get(`/games/${gameId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("games");
      expect(response.body.error).to.a("object");
    }); */
  });
  describe("POST /games", () => {
    it("response with code 400 and error message because missing value 'Palun sisesta sarja toimumise aeg'", async () => {
      const response = await request(app)
        .post(`/games`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          type: "Individuaal",
          description: "Individuaalne arvestus",
          location: "Muu",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal("Palun sisesta sarja toimumise aeg");
    });
    it("response with code 400 and error message because missing value 'Palun sisesta sarja tüüp'", async () => {
      const response = await request(app)
        .post(`/games`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          date: "2021-12-01",
          description: "Individuaalne arvestus",
          location: "Muu",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal("Palun sisesta sarja tüüp");
    });
    it("response with code 400 and error message because missing value 'Palun sisesta kirjeldus'", async () => {
      const response = await request(app)
        .post(`/games`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          date: "2021-12-01",
          type: "Individuaal",
          location: "Muu",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal("Palun sisesta kirjeldus");
    });
    it("response with code 400 and error message because missing value 'Palun sisesta sarja toimumise koht'", async () => {
      const response = await request(app)
        .post(`/games`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          date: "2021-12-01",
          type: "Individuaal",
          description: "Individuaalne arvestus",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal(
        "Palun sisesta sarja toimumise koht"
      );
    });
  });
});
