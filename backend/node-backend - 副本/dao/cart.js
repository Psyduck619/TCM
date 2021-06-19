let { pool } = require("../db/db.js");

module.exports = {
  // add a order to cart
  add: function (cart, callback) {
    let sqlparam = [
      cart.user_id ? cart.user_id : -1,
      cart.goods_id ? cart.goods_id : -1,
      cart.goods_num ? cart.goods_num : 0,
    ];
    pool.query(
      "INSERT INTO cart(user_id, goods_id, goods_num) VALUES (?,?,?)",
      sqlparam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find all orders in cart by user_id
  findByUserid: function (user_id, callback) {
    let res = [];
    pool.query(
      "SELECT * FROM cart WHERE user_id = ?",
      user_id,
      function (error, result) {
        if (error) throw error;
        for (let item of result) {
          res.push(item);
        }
        callback(res);
      }
    );
  },

  // find an order in cart by id
  findById: function (params, callback) {
    pool.query(
      "SELECT * FROM cart WHERE id = ?;",
      params,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // delete an order in cart by id
  deleteById: function (id, callback) {
    pool.query("DELETE FROM cart WHERE id=?", id, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },
};
