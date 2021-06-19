let { pool } = require("../db/db.js");

module.exports = {
  // add a user
  add: function (user, callback) {
    let sqlparam = [
      user.account ? user.account : "",
      user.password ? user.password : "",
      user.nickname ? user.nickname : "",
      user.tel ? user.tel : "",
    ];
    pool.query(
      "INSERT INTO user(account,password,nickname,tel) VALUES (?,?,?,?);",
      sqlparam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find a user by account
  findOne: function (params, callback) {
    let sqlParam = [params];
    pool.query(
      "SELECT * FROM user WHERE account = ?;",
      sqlParam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find a pair of account and password
  query: function (params, callback) {
    let { account, password } = params;
    let sqlParam = [account, password];
    pool.query(
      "SELECT * FROM user WHERE account = ? AND password = ?;",
      sqlParam,
      function (error, result) {
        if (error) throw error;
        callback(result[0]);
      }
    );
  },

  // update a user by id
  update: function (params, callback) {
    pool.query(
      "UPDATE user SET account=?,password=?,nickname=?,tel=? WHERE id=?;",
      [params.account, params.password, params.nickname, params.tel, params.id],
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find a user by account
  findByAccount: function (params, callback) {
    let { account } = params;
    let sqlParam = [account];
    pool.query(
      "SELECT * FROM user WHERE account = ?;",
      sqlParam,
      function (error, result) {
        if (error) throw error;
        callback(result[0]);
      }
    );
  },

  // find all users
  findAll: function (params, callback) {
    pool.query("SELECT * FROM user", params, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },
};
