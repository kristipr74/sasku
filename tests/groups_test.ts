/* import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

describe("Groups conroller", () => {
  describe("GET / groups", () => {
    it("respons with 200 and Alive message", async () => {
      const response = await request(app).get("/groups");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("message");
      expect(response.body.message).to.equal("Alive");
    });
  });
}); */
