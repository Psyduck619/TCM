let { pool } = require("../db/db.js");

module.exports = {
  // add a book

  // find all books
  findAll: function (params, callback) {
    pool.query("SELECT * FROM book", params, function (error, result) {
      if (error) throw error;
      callback(result);
    });
  },

  // find books by category_id
  findByCategory: function (params, callback) {
    pool.query(
      "SELECT * FROM book WHERE category_id = ?;",
      params,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find books by press
  findByPress: function (params, callback) {
    let { press } = params;
    let sqlParam = [press];
    pool.query(
      "SELECT * FROM book WHERE press = ?;",
      sqlParam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find some books randomly / by sales
  findBySales: function (params, callback) {
    let { sales } = params;
    let sqlParam = [sales];
    pool.query(
      "SELECT * FROM book ORDER BY sales DESC;",
      sqlParam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // find a book by id
  findById: function (id, callback) {
    pool.query(
      "SELECT * FROM book WHERE id = ?;",
      id,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },

  // update a book by id
  updateBook: function (book, callback) {
    let sqlparam = [book.num, book.num, book.id];
    pool.query(
      "UPDATE book SET stock=stock-?, sales=sales+? WHERE id=?",
      sqlparam,
      function (error, result) {
        if (error) throw error;
        callback(result);
      }
    );
  },
};
