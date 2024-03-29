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
const upPlayer = {
  id: 5,
};

const findPlayer = {
  id: 1,
};

const deletePlayer = {
  id: 100000,
  wrongId: "abc",
};

const updatePlayer = {
  id: 3,
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

    it("response with code 200 and return array", async () => {
      const response = await request(app)
        .get("/players")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("players");
      expect(response.body.players).to.be.a("array");
      expect(response.body.players.length).to.greaterThan(0);
    });

    it("response with code 400 and not found player by ID", async () => {
      const response = await request(app)
        .get(`/players/${playerID}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Sellise id-ga Mängijat ei ole");
    });

    it("response with code 200 and found player by ID", async () => {
      const response = await request(app)
        //.get(`/players/${playerID}`)
        .get(`/players/${findPlayer.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("id");
      expect(response.body.id).to.be.a("number");
    });
  });

  describe("POST /players", () => {
    it("response with code 400 and error message because missing value 'Palun sisesta Mängija eesnimi'", async () => {
      const response = await request(app)
        .post(`/players`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          lastName: "Uus",
          tel: 5555555,
          email: "uus@gmail.com",
          password: "uus",
          messenger: "uus.messenger",
          description: "Uus kasutaja",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal("Palun sisesta Mängija eesnimi");
    });
    it("response with code 400 and error message because missing value 'Palun sisesta Mängija perekonnanimi'", async () => {
      const response = await request(app)
        .post(`/players`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Uueke",
          tel: 5555555,
          email: "uus@gmail.com",
          password: "uus",
          messenger: "uus.messenger",
          description: "Uus kasutaja",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal(
        "Palun sisesta Mängija perekonnanimi"
      );
    });
    it("response with code 400 and error message because missing value 'Palun sisesta Mänija telefoninumber'", async () => {
      const response = await request(app)
        .post(`/players`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Uus",
          lastName: "Uueke",
          email: "uus@gmail.com",
          password: "uus",
          messenger: "uus.messenger",
          description: "Uus kasutaja",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal(
        "Palun sisesta Mänija telefoninumber"
      );
    });
    it("response with code 400 and error message because missing value 'Palun sisesta Mänija meiliaadress'", async () => {
      const response = await request(app)
        .post(`/players`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Uus",
          lastName: "Uueke",
          tel: 5555555,
          password: "uus",
          messenger: "uus.messenger",
          description: "Uus kasutaja",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal(
        "Palun sisesta Mängija meiliaadress"
      );
    });
    it("response with code 400 and error message because missing value 'Sisesta palun parool'", async () => {
      const response = await request(app)
        .post(`/players`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Uus",
          lastName: "Uueke",
          tel: 5555555,
          email: "uus@gmail.com",
          messenger: "uus.messenger",
          description: "Uus kasutaja",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal("Sisesta palun parool");
    });
    it("response with code 400 and error message because missing value 'Palun sisesta Mängija kirjeldus'", async () => {
      const response = await request(app)
        .post(`/players`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Uus",
          lastName: "Uueke",
          tel: 5555555,
          email: "uus@gmail.com",
          password: "uus",
          messenger: "uus.messenger",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal("Palun sisesta Mängija kirjeldus");
    });
    it("response with code 201 and id of new player", async () => {
      const response = await request(app)
        .post(`/players`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Uus",
          lastName: "Uueke",
          tel: 5555555,
          email: "uus@gmail.com",
          password: "uus",
          messenger: "uus.messenger",
          description: "Uus kasutaja",
          role: "User",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key("id");
      expect(response.body.id).to.be.a("number");
      playerID = response.body.id;
    });
  });
  describe("DELETE /players/:id", () => {
    it("respons with code 400 and error 'Sellist Mängijat ei eksisteeri'", async () => {
      const response = await request(app)
        .delete(`/players/${deletePlayer.wrongId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
    });

    it("respons with code 204 and return empty object", async () => {
      const response = await request(app)
        .delete(`/players/${playerID}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(204);
    });

    it("respons with code 400 and return error message 'Sellise  id - ga ${id} Mängijat ei eksisteeri'", async () => {
      const response = await request(app)
        .delete(`/players/${deletePlayer.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
    });
  });
  describe("UPDATE /players", () => {
    it("respons with code 204 and modify firstname", async () => {
      const response = await request(app)
        .patch(`/players/${upPlayer.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Muu",
        });
      expect(response.body).to.be.a("object");
      console.log(response.body);
      expect(response.statusCode).to.equal(204);
    });
    it("respons with code 400 and modify firstname", async () => {
      const response = await request(app)
        .patch(`/players/${deletePlayer.wrongId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
    });
    it("respons with code 400 and error 'Pole midagi uuendada' ", async () => {
      const response = await request(app)
        .patch(`/players/${updatePlayer.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Pole midagi uuendada");
    });
    it("respons with code 400 and error 'Sellise  id - ga ${id} Mängijat ei eksisteeri' ", async () => {
      const response = await request(app)
        .patch(`/players/${deletePlayer.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Uueke",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal(
        "Sellise  id - ga 100000 Mängijat ei eksisteeri"
      );
    });
  });
});
