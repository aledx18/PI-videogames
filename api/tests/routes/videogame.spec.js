/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);

// describe("Videogame routes", () => {
//   before(() =>
//     conn.authenticate().catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     })
//   );
//   beforeEach(() =>
//     Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
//   );
//   describe("GET /videogames", () => {
//     it("should get 200", () => agent.get("/videogames").expect(200));
//   });
// });

const videogame = {
  name: "Juan martin del potro",
  description: "juego de mario",
  released: "12-12-12",
  rating: 4,
  parent_plataform: ["pc"],
  background_image:
    "https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg",
  genre: ["Educational", "Card"],
  created: false,
};
const videogameError_parent_plataform = {
  name: "Juan martin del potro",
  description: "juego de mario",
  released: "12-12-12",
  rating: 4,
  // parent_plataform: [ 'pc' ],
  background_image:
    "https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg",
  genre: ["Educational", "Card"],
  created: true,
};
const videogameError_description = {
  name: "Juan martin del potro",
  // description: "juego de mario",
  released: "12-12-12",
  rating: 4,
  parent_plataform: ["pc"],
  background_image:
    "https://i.pinimg.com/564x/17/93/7c/17937c5624135c85cae6f10f58e2f496.jpg",
  genre: ["Educational", "Card"],
  created: true,
};

describe("Videogame routes", function () {
  before(function () {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });

  describe("POST /videogames", function () {
    beforeEach(function (done) {
      Videogame.sync({ force: true })
        // .then(() => Videogame.create(videogame))
        .then(() => done());
    });
    it("responds with 200", () =>
      agent.post("/videogames").then((res) => {
        expect(200);
      })).timeout(10000);
    it("responds with an array", () =>
      agent
        .post("/videogames")
        .send(videogame)
        .then((res) => {
          expect(typeof res.body).to.be.equal("object");
          console.log(res.body.game);
          expect(res.body.description).to.be.equal(videogame.game.description);
          expect(res.body.name).to.be.equal(videogame.game.name);
          expect(res.body.game.released).to.be.equal(videogame.game.released);
          expect(res.body.game.rating).to.be.equal(videogame.game.rating);
          expect(res.body.game.parent_plataform).to.be.eql(
            videogame.game.parent_plataform
          );
          expect(res.body.game.image).to.be.equal(videogame.game.image);
          expect(res.body.game.created).to.be.equal(videogame.game.created);
        }));

    it("Throw error if name is missing", () =>
      agent
        .post("/videogames")
        .send(videogameError_name)
        .then(
          () => {},
          (err) => {
            expect(err.body).to.be.equal(
              "notNull Violation: videogame.name cannot be null"
            );
          }
        ));

    it("Throw error if parent_plataform is missing", () =>
      agent
        .post("/videogames")
        .send(videogameError_parent_plataform)
        .then(
          () => {},
          (err) => {
            expect(err.body).to.be.equal(
              "notNull Violation: videogame.parent_plataform cannot be null"
            );
          }
        ));

    it("Throw error if description is missing", () =>
      agent
        .post("/videogames")
        .send(videogameError_description)
        .then(
          () => {},
          (err) => {
            expect(err.body).to.be.equal(
              "notNull Violation: videogame.description cannot be null"
            );
          }
        ));
  });
});
