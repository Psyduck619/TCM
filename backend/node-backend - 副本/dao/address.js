let { pool } = require("../db/db.js");

module.exports = {
  // add an address
  add: function (address, callback) {
    let sqlparam = [
      address.user_id ? address.user_id : -1,
      address.prov ? address.prov : "",
      address.city ? address.city : "",
      address.area ? address.area : "",
      address.detail ? address.detail : "",
      address.name ? address.name : "",
      address.tel ? address.tel : "",
      address.code ? address.code : "",
    ];
    pool.query(
      "SELECT * FROM address WHERE is_default = 1 AND user_id = ?",
      address.user_id,
      function (error, result) {
        if (error) throw error;
        if (result == null) {
          sqlparam.push(1);
        } else {
          sqlparam.push(0);
        }
      }
    );
    setTimeout(() => {
      pool.query(
        "INSERT INTO address(user_id, prov, city, area, detail, name, tel, code, is_default) VALUES (?,?,?,?,?,?,?,?,?)",
        sqlparam,
        function (error, result) {
          if (error) throw error;
          callback(result);
        }
      );
    }, 500);
  },

  // find all addresses by user_id
  findByUserid: function (user_id, callback) {
    let res = [];
    pool.query(
      "SELECT * FROM address WHERE is_default = 1 AND user_id = ?",
      user_id,
      function (error, result) {
        if (error) throw error;
        if (result != null) {
          res.push(result[0]);
        }
      }
    );
    pool.query(
      "SELECT * FROM address WHERE is_default = 0 AND user_id = ?",
      user_id,
      function (error, result) {
        if (error) throw error;
        res.concat(result);
        for (let item of result) {
          res.push(item);
        }
        callback(res);
      }
    );
  },

  // find books by id
  findById: function (params, callback) {
    pool.query(
      "SELECT * FROM address WHERE id = ?;",
      params,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // update an address by id
  updateById: function (address, callback) {
    let sqlparam = [
      address.prov ? address.prov : "",
      address.city ? address.city : "",
      address.area ? address.area : "",
      address.detail ? address.detail : "",
      address.name ? address.name : "",
      address.tel ? address.tel : "",
      address.code ? address.code : "",
      address.id,
    ];
    pool.query(
      "UPDATE address SET prov=?, city=?, area=?, detail=?, name=?, tel=?, code=? WHERE id=?",
      sqlparam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // update default by id
  updateDefaultById: function (params, callback) {
    pool.query(
      "UPDATE address SET is_default = 0 WHERE is_default=1 AND user_id=?",
      params.user_id,
      function (error, result) {
        if (error) throw error;
      }
    );
    pool.query(
      "UPDATE address SET is_default = 1 WHERE is_default=0 AND id=?",
      params.id,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // delete a address by id
  deleteById: function (id, callback) {
    console.log(id);
    pool.query("DELETE FROM address WHERE id=?", id, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },
};
