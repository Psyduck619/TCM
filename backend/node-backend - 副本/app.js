const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./controller/user.js");
const bookRouter = require("./controller/book.js");
const addressRouter = require("./controller/address.js");
const cartRouter = require("./controller/cart.js");
const orderRouter = require("./controller/order.js");
const commentRouter = require("./controller/comment.js");
require("./db/db.js");

// 设置跨域访问 增加头部信息解决跨域问题
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // 允许所有来源访问
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); // 允许访问的方式
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 添加通用的JSON和URL编码的解析器作为顶级中间件，该中间件将解析所有传入请求的主体。
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 使用路由 /user 是路由指向名称
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/address", addressRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/comment", commentRouter);

// 使 express 监听 8000 端口号发起的 http 请求
const server = app.listen(8000, function () {
  console.log("running at port 8000...");
});
