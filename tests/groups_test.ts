import request from "supertest";
import { expect } from "chai";
import { describe, it, Test } from "mocha";
import app from "../src/app";

let token: string;
let groupID: number;
let groupName: string;
let newGroup: number;

const player = {
  email: "kristi@gmail.com",
  password: "kristi",
};

/* const testGroup = {
  name: "Test grupp",
  description: "Testitavad",
}; */
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
      expect(response.body.error).to.equal("No token provided");
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
/*          it("response with code 200 and found groups by ID", async () => {
      const response = await request(app)
        .get(`/groups`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Rock",
        });
      expect(response.body).to.be.a("object");
      //console.log(response.body);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key("groups");
      expect(response.body).to.have.a("number");
      newGroup = response.body.id;
    });  */

/*     it("response with code 400 ja and not found groups by name", async () => {
      const response = await request(app)
        .get(`/groups/${groupName}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Rock",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal("Sellise id-ga gruppi ei ole"); */
    });
  });
/*   describe("POST / groups", () => {
    it("response with code 400 and not found groups by name", async () => {
      const response = await request(app)
        .get(`/groups/${groupName}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Rock",
        });
      expect(response.body).to.be.a("object");
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key("error");
      expect(response.body.error).to.be.a("string");
      expect(response.body.error).to.equal(
        "Selline Grupi nimi on juba kasutusel"
      );
    }); */

/*         it("respons with code  201 and add new player with ID", async () => {
      const response = await request(app)
        .post("/groups")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test2",
          description: "new Group",
        });
      expect(response.body).to.be.a("object");
      console.log(response.body);
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key("idgroups");
      expect(response.body.id).to.be.a("number");
      groupID = response.body.id;
    }); */

/*    describe("DELETE /groups/:id", () => {
    it("respons with code 204 and retur empty object", async () => {
      const response = await request(app)
        .delete(`/groups/${groupID}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.equal(204);
      expect(response.body).to.be.a("object");
    }); */

  
