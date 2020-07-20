const queryHandler = require("../../../../../../bin/modules/user/repositories/queries/query_handler");
const User = require("../../../../../../bin/modules/user/repositories/queries/domain");
const sinon = require("sinon");
const assert = require("assert");

describe("User-queryHandler", () => {
  const data = {
    success: true,
    data: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
    message: "Your Request Has Been Processed",
    code: 200,
  };

  const payload = {
    userId: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9",
  };

  describe("loginUser", () => {
    it("should return login user", async () => {
      sinon.stub(User.prototype, "loginUser").resolves(data);

      const rs = await queryHandler.loginUser(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.loginUser.restore();
    });
  });

  describe("verifyOtpLogin", () => {
    it("should return verify otp login", async () => {
      sinon.stub(User.prototype, "verifyOtpLogin").resolves(data);

      const rs = await queryHandler.verifyOtpLogin(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.verifyOtpLogin.restore();
    });
  });

  describe("verifyOtpRegister", () => {
    it("should return verify otp register", async () => {
      sinon.stub(User.prototype, "verifyOtpRegister").resolves(data);

      const rs = await queryHandler.verifyOtpRegister(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.verifyOtpRegister.restore();
    });
  });

  describe("getUsers", () => {
    it("should return get users", async () => {
      sinon.stub(User.prototype, "getUsers").resolves(data);

      const rs = await queryHandler.getUsers();

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.getUsers.restore();
    });
  });

  describe("getUser", () => {
    it("should return get user", async () => {
      sinon.stub(User.prototype, "getUser").resolves(data);

      const rs = await queryHandler.getUser(payload);

      assert.notEqual(rs.data, null);
      assert.equal(rs.code, 200);

      User.prototype.getUser.restore();
    });
  });
});
