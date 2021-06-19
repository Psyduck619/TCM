let { pool } = require("../db/db.js");

module.exports = {
  // add an new comment for an order
  add: function (comment, callback) {
    let sqlparam = [
      comment.order_id,
      comment.content,
      comment.rate,
      comment.desc_star,
      comment.logistics_star,
      comment.attitude_star,
      comment.goods_id,
    ];
    pool.query(
      "INSERT INTO comment(order_id, content, rate, desc_star, logistics_star, attitude_star, goods_id) VALUES (?,?,?,?,?,?,?)",
      sqlparam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find all orders by goods_id
  findByUserid: function (goods_id, callback) {
    pool.query(
      "SELECT * FROM comment WHERE goods_id = ?",
      goods_id,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },
};
