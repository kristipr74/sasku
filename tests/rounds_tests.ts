import request from "supertest";
import { expect } from "chai";
import { describe, it, Test } from "mocha";
import app from "../src/app";

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

let token: string;

describe("Rounds controller", () => {
  describe("GET /rounds", () => {
    it("responds with status 200 and token after login", async () => {
      const response = await request(app).post("/login").send(player);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.be.a("string");
      token = response.body.token;
    });
    it("responds with error message 'No token provided' and status 401", async () => {
      const response = await request(app).get("/rounds");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("No token provided");
    });
    it("responds with error message 'Token is not valid' and status 401", async () => {
      const response = await request(app)
        .get("/results")
        .set("Authorization", "Bearer khsdlialknc.k<jdsvsz.b c.");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Token is not valid");
    });
    it("response with code 200 ja and return array", async () => {
        const response = await request(app)
          .get("/rounds")
          .set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key("rounds");
        expect(response.body.rounds).to.be.a("array");
        expect(response.body.rounds.length).to.greaterThan(0);
      });
      it("response with code 200 ja and return array", async () => {
        const response = await request(app)
          .get("/rounds")
          .set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key("rounds");
        expect(response.body.rounds).to.be.a("array");
        expect(response.body.rounds.length).to.greaterThan(0);
      });
  });
});
