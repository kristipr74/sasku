import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

let token: string;
let playerID: number;
let newPlayersId: number;

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

const newPlayer = {
  firstName: "test",
  lastName: "uus",
  tel: 111111,
  email: "test@gmail.com",
  password: "test",
  messenger: "dtyuhjö",
  description: "kifsehalj",
  role: "User",
};

describe("Players conroller", () => {
  describe("GET /players", () => {
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
      expect(response.body.error).to.equal("No token provide");
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
        .get("/players")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("players");
      expect(response.body.players).to.be.a("array");
      expect(response.body.players.length).to.greaterThan(0);
    });
  });

  it("response with code 400 ja and not found player by ID", async () => {
    const response = await request(app)
      .get(`/players/${playerID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).to.be.a("object");
    console.log(response.body);
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.key("error");
    expect(response.body.error).to.equal("Sellise id-ga Mängijat ei ole");
  });
});
/* describe("POST / players", () => {
  it("respons with code 200 and token after login", async () => {
    const response = await request(app).post("/login").send(player);
    expect(response.body).to.be.a("object");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.key("token");
    expect(response.body.token).to.be.a("string");
    token = response.body.token;
  });
});
describe("POST / players", () => {
  it("respons with code 401 and error message - no token", async () => {
    const response = await request(app).post("/players").send(newPlayer);
    expect(response.body).to.be.a("object");
    expect(response.statusCode).to.equal(401);
    expect(response.body.error).to.equal("No token provide");
  });

  it("respons with code  201 and new player with ID", async () => {
    const response = await request(app)
      .post("/players")
      .set("Authorization", `Bearer ${token}`)
      .send(newPlayer);
    expect(response.body).to.be.a("object");
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.key("id");
    expect(response.body.id).to.be.a("number");
    playersId = response.body.id;
  });
}); */

/* describe("DELETE /players/:id", () => {
  it("respons with code 204 and retur empty object", async () => {
    const response = await request(app)
      .delete(`/players/${playersId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).to.equal(204);
    expect(response.body).to.be.a("object");
  });
}); */
