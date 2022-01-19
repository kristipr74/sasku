import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

let token: string;
let resultID: number;
// let groupName: string;
// let newGroupID: number;

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

// const group = {
//   name: "Test grupp",
//   description: "Testitavad",
// };

describe("Results conroller", () => {
  describe("GET / results", () => {
    it("respons with code 200 and token after 'login'", async () => {
      const response = await request(app).post("/login").send(player);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.be.a("string");
      token = response.body.token;
    });
    it("response with code 401 and token not provide", async () => {
      const response = await request(app).get("/results");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("No token provide");
    });
    it("vresponse with code 401 and invalid token", async () => {
      const response = await request(app)
        .get("/results")
        .set("Authorization", "Bearer khsdlialknc.k<jdsvsz.b c.");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Token is not valid");
    });

    it("response with code 200 ja and return array of results", async () => {
      const response = await request(app)
        .get("/results")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("results");
      expect(response.body.results).to.be.a("array");
      expect(response.body.results.length).to.greaterThan(0);
    });
    it("response with code 400 ja and not found result by ID", async () => {
      const response = await request(app)
        .get(`/results/${resultID}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Sellise id-ga tulemusi ei ole");
    }); 
  });
});

  /* describe("Results conroller", () => {
    describe("POST /results", () => {
        it("response with code 400 and missing result error", async () => {
            const response = await request(app)
              .post(`/results`)
              .set("Authorization", `Bearer ${token}`)
              .send({
                win: 1,
                karvane: 1,
                getKarvane: 1,
                saw: 1,
getSaw: 1,
              });
            expect(response.body).to.be.a("object");
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.have.key("error");
            expect(response.body.error).to.be.a("string")
            expect(response.body.error).to.equal("Palun sisesta saadud punktid");
   
      it("response with code 200 and return array of results", async () => {
        const response = await request(app)
          .get("/results")
          .set("Authorization", `Bearer ${token}`);
        expect(response.body).to.be.a("object");
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.key("results");
        expect(response.body.results).to.be.a("array");
        expect(response.body.results.length).to.greaterThan(0);

      });

      }); */
          
    // });
// });
