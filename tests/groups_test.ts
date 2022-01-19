import request from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";
import app from "../src/app";

let token: string;
let groupID: number;
let groupName: string;
let newGroupID: number;

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

const group = {
  name: "Test grupp",
  description: "Testitavad",
};
describe("Groups conroller", () => {
  describe("GET / groups", () => {
    it("respons with code 200 and token after 'login'", async () => {
      const response = await request(app).post("/login").send(player);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("token");
      expect(response.body.token).to.be.a("string");
      token = response.body.token;
    });
    it("response with code 401 and token not provide", async () => {
      const response = await request(app).get("/groups");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("No token provide");
    });
    it("vresponse with code 401 and invalid token", async () => {
      const response = await request(app)
        .get("/groups")
        .set("Authorization", "Bearer khsdlialknc.k<jdsvsz.b c.");
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Token is not valid");
    });

    it("response with code 200 ja and return array of groups", async () => {
      const response = await request(app)
        .get("/groups")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("groups");
      expect(response.body.groups).to.be.a("array");
      expect(response.body.groups.length).to.greaterThan(0);
    });
    it("response with code 400 ja and not found groups by ID", async () => {
      const response = await request(app)
        .get(`/groups/${groupID}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.equal("Sellise id-ga gruppi ei ole");
    });
/*     it("response with code 400 ja and not found groups by name", async () => {
      const response = await request(app)
        .get(`/groups/${groupName}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: 'Rock'
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal(
        "Sellise nimega - ${id} - gruppi ei ole!"
      );
    }); */
  });
});
