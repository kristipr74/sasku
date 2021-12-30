import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

describe("Ping conroller", () => {
  describe("GET / ping", () => {
    it("respons with 200 and Alive message", async () => {
      const response = await request(app).get("/ping");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("message");
      expect(response.body.message).to.equal("Alive");
    });
  });
});
