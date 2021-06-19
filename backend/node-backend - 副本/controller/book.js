var express = require("express");
var router = express.Router();
let {
  findAll,
  findByCategory,
  findByPress,
  findById,
  findBySales,
  updateBook,
} = require("../dao/book.js");

// 1. find all books by '/book' with GET
router.get("/", function (req, res) {
  let urlParam = req.body;
  findAll(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "书籍查找失败, 请重试!",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 2. find books by '/book/category/:id' whit GET
router.get("/category/:id", function (req, res) {
  let id = req.params.id;
  findByCategory(id, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "分类查找失败, 请重试!",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 3. find books by '/book/sales' whit GET
router.get("/sales", function (req, res) {
  let urlParam = req.body;
  findBySales(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "书籍查找失败, 请重试!",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 4. find a book by '/book/:id' whit GET
router.get("/:id", function (req, res) {
  let urlParam = req.params.id;
  findById(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "书籍查找失败, 请重试!",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

// 5. update a book by '/book' WITH PUT
router.put("/", function (req, res, next) {
  let urlParam = req.body;
  updateBook(urlParam, function (success) {
    if (success == null) {
      res.json({
        status: "400",
        data: "更新失败",
      });
    } else {
      res.json({
        status: "200",
        data: success,
      });
    }
  });
});

module.exports = router;
