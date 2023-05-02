const mongoose = require("mongoose");
const request = require("supertest");
const gravatar = require("gravatar");
require("dotenv").config();
const { nanoid } = require("nanoid");

const app = require("../../app");
const { UserModel } = require("../../database/models");
const { createHash } = require("../../services");

const { DB_HOST } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());
  const email = "testlogin@mail.com";
  beforeEach(async () => {
    await mongoose.connect(DB_HOST);
    const avatarURL = gravatar.url("email");
    const verificationToken = nanoid();
    const user = {
      email: email,
      avatarURL,
      verificationToken,
    };
    const password = "123456789";

    const passwordHash = await createHash(password);
    await UserModel.create({
      ...user,
      passwordHash,
    });
  });

  afterEach(async () => {
    await UserModel.deleteOne({ email: "testlogin@mail.com" });
    await mongoose.disconnect();
  });

  test("test login route", async () => {
    const loginUser = {
      email: "testlogin@mail.com",
      password: "123456789",
    };
    const user = await UserModel.findOne({ email });
    await UserModel.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: user.verificationToken,
    });

    const response = await request(app).post("/users/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
