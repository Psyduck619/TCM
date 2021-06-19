let { pool } = require("../db/db.js");

module.exports = {
  // add an new order
  add: function (order, callback) {
    let sqlparam = [
      order.user_id ? order.user_id : "",
      order.goods_id ? order.goods_id : "",
      order.user_address_id ? order.user_address_id : "",
      order.goods_num ? order.goods_num : "",
      order.goods_total_price ? order.goods_total_price : "",
      1,
    ];
    pool.query(
      "INSERT INTO user_order(user_id, goods_id, user_address_id, goods_num, goods_total_price, order_status) VALUES (?,?,?,?,?,?)",
      sqlparam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find all orders by user_id
  findByUserid: function (user_id, callback) {
    pool.query(
      "SELECT * FROM user_order WHERE user_id = ?",
      user_id,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find an order by id
  findById: function (params, callback) {
    pool.query(
      "SELECT * FROM user_order WHERE id = ?;",
      params,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // update the status of an order by id
  updateStatusById: function (params, callback) {
    let sqlparam = [params.status, params.id];
    pool.query(
      "UPDATE user_order SET order_status=? WHERE id=?",
      sqlparam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },
};
