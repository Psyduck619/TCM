## 1. 项目完成情况及自评

项目分工表格

| 姓名   | 学号     | 班级       | 任务     |
| ------ | -------- | ---------- | -------- |
| 劳帅权 | 31801142 | 计算机1803 | 所有任务 |

项目权重

| 姓名   | 学号     | 班级       | 任务     | 权重 |
| ------ | -------- | ---------- | -------- | ---- |
| 劳帅权 | 31801142 | 计算机1803 | 所有任务 | 1    |

项目自我评估表

|                        | 自我评估 |
| ---------------------- | -------- |
| 前端框架Vue            | 5        |
| 服务器框架Express      | 5        |
| RESTFUL(接口风格)      | 5        |
| axios(api调用)         | 5        |
| router(路由跳转)       | 5        |
| vuex(状态共享)         | 5        |
| 响应式设计             | 4        |
| 云服务器(部署在阿里云) | 5        |

项目自评等级:

优

## 2.项目说明

### 2.1 项目主题和内容

#### 2.1.1 项目主题

​		本作品的名称为《一册医书》，是一个售卖中医药相关书籍的移动端电商平台。平台将中医药相关书籍分为中医理论、中医针灸、中草药、伤寒杂病论等四类，包括《中医基础理论》《古典针灸入门》《全注全译伤寒论》等中医经典著作，能够为想要了解和学习中医的人群提供更为方便的购买渠道，同时也包括一些类似于科普的书籍，如《家用中药补养全家》，能够为普通人群提供中医的帮助的科普，更好地掌握日常的中医、养生知识，以免误入歧途。

#### 2.1.2 项目内容设计

​		① 用户可以在未登录的状态下即可浏览商品，查看商品详情。

​		② 当用户需要进行购买相关操作时，可以通过手机号进行注册登录，获取账号进行购物。

​		③ 用户可以新增、修改和删除收货地址以及设置默认地址。

​		④ 用户可以浏览到首页展示的商品、分类展示的商品以及商品详情（包括商品评价）。

​		⑤ 用户可以在商品详情页选择购买数量后，将商品加入购物车。

​		⑥ 用户可以在购物车中查看自己添加的商品，并对商品进行选择和删除。

​		⑦ 用户可以对购物车中选择的商品进行下单，并在支付页自由选择收货地址并完成下单。

​		⑧ 用户可以查看自己的所有订单，并对不同状态的订单进行不同的操作。

​		⑨ 用户可以对已经完成的订单进行评价，并在相应的商品详情页查看。

### 2.2 项目设计与实现

#### 2.2.0 项目结构

​		后端服务器为nodejs，用到的框架的express，使用的数据库是Mysql。
​		
​		下面是后端服务器的项目结构图。

```markdown
node-backend
├─ api.http
├─ app.js
├─ controller
│  ├─ address.js
│  ├─ book.js
│  ├─ cart.js
│  ├─ comment.js
│  ├─ order.js
│  └─ user.js
├─ dao
│  ├─ address.js
│  ├─ book.js
│  ├─ cart.js
│  ├─ comment.js
│  ├─ order.js
│  └─ user.js
├─ db
│  └─ db.js
├─ package-lock.json
└─ package.json
```


​		本项目主要使用的前端技术为Vue.js。其他主要技术有axios、vuex、vue-router、less等。

​		下面是前端项目的结构树。

```markdown
TCM-BOOKS
├─ .browserslistrc
├─ .gitignore
├─ .prettierrc.json
├─ api.http
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src
│  ├─ api
│  │  └─ index.js
│  ├─ App.vue
│  ├─ assets
│  │  ├─ icons
│  │  │  ├─ book.png
│  │  │  ├─ caoyao.png
│  │  │  ├─ cough.png
│  │  │  └─ zhenjiu.png
│  │  ├─ images
│  │  │  └─ logo1.jpg
│  │  ├─ logo.png
│  │  └─ resetUI.css
│  ├─ components
│  │  ├─ AddressCard.vue
│  │  ├─ AddressSelectCard.vue
│  │  ├─ BookCommentCard.vue
│  │  ├─ CommentCard.vue
│  │  ├─ FreshThing.vue
│  │  ├─ GoodsInfo.vue
│  │  ├─ HelloWorld.vue
│  │  ├─ LoginByPwd.vue
│  │  ├─ LoginBySms.vue
│  │  ├─ MyButton.vue
│  │  ├─ OrderList.vue
│  │  ├─ Recommend.vue
│  │  └─ TopNav.vue
│  ├─ main.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  └─ index.js
│  ├─ util
│  │  └─ util.js
│  └─ views
│     ├─ About.vue
│     ├─ Address.vue
│     ├─ Aftersale.vue
│     ├─ Cart.vue
│     ├─ Comment.vue
│     ├─ Detail.vue
│     ├─ HandleAddress.vue
│     ├─ Home.vue
│     ├─ Index.vue
│     ├─ Login.vue
│     ├─ My.vue
│     ├─ Order.vue
│     ├─ Pay.vue
│     ├─ Register.vue
│     └─ Sort.vue
└─ vue.config.js	

```

#### 2.1 注册与登录

<center class="half">
    <img src="img\注册.png" width="260"/>
    <img src="img\登录1.png" width="260"/>
    <img src="img\登录2.png" width="260"/>
</center>

​		① 注册页

​		注册页需要用户输入手机号码，获取验证码（实际获取不到），并设置密码，同意相关协议来完成注册。其中，手机号需11位，密码不能过短，否则会提示错误。提交后，将用户信息新增到数据库。

​		② 登录页

​		用户可以使用注册完成的账号，通过两种方式进行登录。第一，手机快捷登录，通过获取短信验证码来完成登录；第二，账号密码登录，用户通过输入账号（手机号）和密码来完成登录。

​		用到接口有：

```js
// 1. add a user by '/user' with POST  新增用户
http://47.111.10.102:7800/user
// 2. find a user by '/user/:account' WITH GET 得到用户默认信息
http://47.111.10.102:7800/user/:account
// 3. match user's account and password by '/user/login' with POST (POST is safer than GET)
http://47.111.10.102:7800/user/login
```



#### 2.2 首页与分类

<center class="half">
    <img src="img\首页1.png" width="260"/>
    <img src="img\首页2.png" width="260"/>
    <img src="img\分类.png" width="260"/>
</center>

​		① 首页

​		首页从上至下包括5部分，分别为搜索栏、轮播图、分类提示、经典之作、精品推荐。其中，分类提示可以直接点击跳转至相应分类页，经典之作可以横拉浏览，精品推荐可以下拉加载，点击相应书籍可以跳转至相应书籍详情页。

​		② 分类页

​		分类页将书籍分为四类：中医理论、中医针灸、中草药、伤寒杂病论。用户可以进行检索，点击相应书籍可以跳转至相应书籍详情页。

​		用到接口有：

```js
// 1. find all books by '/book' with GET  获取所有书籍
http://47.111.10.102:7800/book
// 2. find books by '/book/category/:id' whit GET  根据分类获取书籍
http://47.111.10.102:7800/book/category/:id
// 3. find books by '/book/sales' whit GET  根据销量排序获得书籍
http://47.111.10.102:7800/book/sales
```



#### 2.3 商品详情

<center class="half">
    <img src="img\详情1.png" width="260"/>
    <img src="img\详情2.png" width="260"/>
    <img src="img\详情3.png" width="260"/>
</center>

​		商品详情页分为四部分，第一部分是商品的轮播图、商品名、作者、出版社、价格、月销量等信息；第二部分是内容简介和书籍评价的信息；第三部分是底部导航栏，可跳转至首页和购物车，以及加入购物车；第四部分是底部弹出的购物信息，可以查看商品库存，以及选择购买数量，点击确定将其加入购物车。

​		用到的接口有：

```js
// 1. find a book by '/book/:id' whit GET 获取商品详情
http://47.111.10.102:7800/book/:id'
// 2. find the book's all comments by '/comment/book/:id' WITH GET 获取书籍评价
http://47.111.10.102:7800/comment/book/:id
// 3. add an order into cart by '/cart' with POST  添加到购物车
http://47.111.10.102:7800/cart
```



#### 2.4 收货地址

<center class="half">
    <img src="img\收货地址.png" width="260"/>
    <img src="img\新增收货地址.png" width="260"/>
    <img src="img\修改收货地址.png" width="260"/>
</center>

​		用户可以在我的页中跳转到收货地址页，查看当前已添加的收货地址以及默认收货地址。用户可以自由切换默认收货地址。点击底部新增按钮，用户可以新增一个地址，需输入名字、电话号码、省市区、详细地址等完整信息。用户亦可通过修改可删除按钮来对当前的地址信息进行操作。

​		用到的接口有：

```js
// 1. find user's all addresses by '/address/user/:id' WITH GET 获得所有地址
http://47.111.10.102:7800/address/user/:id
// 2. find an address by '/address/:id' WITH GET  获得某一地址信息（用于修改）
http://47.111.10.102:7800/address/:id
// 3. update new default by '/address/default' WITH PUT  设置默认地址
http://47.111.10.102:7800/address/default
// 4. update an address by '/address' with PUT  更新地址
http://47.111.10.102:7800/address/user/address
// 5. delete an address by '/address/:id' with DELETE  删除地址
http://47.111.10.102:7800/address/:id
```



#### 2.5 购物车

<center class="half">
    <img src="img\购物车.png" width="260"/>
    <img src="img\购物车2.png" width="260"/>
    <img src="img\购物车3.png" width="260"/>
</center>

​		用户所有加入购物车的商品都会出现这里，其中有每一项的商品基本信息、价格、数量，用户可以选择其中的一项或多项（可以方便地全选或取消全选），或者删除购物车中的商品来进行操作。勾选需要下单的商品后，可以在下方查看到当前选择商品的合计需支付的金额，然后可以点击结算按钮进入结算。

​		用到的接口有：

```js
// 1. find user's all orders in cart by '/cart/user/:id' WITH GET 得到所有购物车信息
http://47.111.10.102:7800/cart/user/:id
// 2. delete an order in cart by '/cart/:id' with DELETE 删除
http://47.111.10.102:7800/cart/:id
// 3. find a book by '/book/:id' whit GET 获取其中之一书籍的信息
http://47.111.10.102:7800/book/:id
```



#### 2.6 确认订单

<center class="half">
    <img src="img\支付.png" width="260"/>
    <img src="img\支付2.png" width="260"/>
</center>

​		在购物页点击结算后就可以来到支付页确认订单，用户选择的书籍都会出现在这里，查看到订单信息，订单数量，以及价格等。用户可以自由选择地址，填写订单备注，以及提交订单。用户确认支付订单后（假支付），订单就会出现在用户订单页了。

​		用到的接口有：

```js
// 1. find an order in cart by '/cart/:id' WITH GET  获取购物车中选择的订单
http://47.111.10.102:7800/cart/:id
// 2. find an address by '/address/:id' WITH GET  获取地址
http://47.111.10.102:7800/address/:id
// 3. find a book by '/book/:id' whit GET  获取书籍信息
http://47.111.10.102:7800/book/:id
// 4. add an order by '/order' with POST  新增订单
http://47.111.10.102:7800/order
// 5. delete an order in cart by '/cart/:id' with DELETE  删除购物车中的相应订单
http://47.111.10.102:7800/cart/:id
```



#### 2.7 订单

<center class="half">
    <img src="img\订单1.png" width="260"/>
    <img src="img\订单2.png" width="260"/>
</center>

​		用户可以在我的订单中查看到所有订单，一个选项卡，分为全部、待发货、待收货、已完成、已取消，分别对应相应的订单。不同的订单会出现不同的按钮，用户可以进行不同的操作。待发货订单可以提醒发货和申请退款，待收货订单可以查看物流和申请售后，已完成订单可以申请售后和评价晒单。特别地，用户可以对订单进行评价。

​		用到的接口有：

```js
// 1. find user's all orders by '/address/user/:id' WITH GET  获取所有订单
http://47.111.10.102:7800/address/user/:id
// 2. update the status of an order by '/address/status' WITH PUT  修改订单状态
http://47.111.10.102:7800/address/status
```



#### 2.8 评价

<center class="half">
    <img src="img\评价.png" width="260"/>
</center>

​	用户可以对订单进行评价。可以对书籍进行打分和文字评价，选择是否匿名评价。也可以给本次购物进行描述相符、物流服务、服务态度的评价。

​	用到的接口有：

```js
// 1. add a comment by '/comment' with POST  新增订单
http://47.111.10.102:7800/comment
```



#### 2.9 我的

<center class="half">
    <img src="img\我的.png" width="260"/>
</center>

​		在我的页，用户可以查看我的订单、收货地址，也可以退出登录。		


## 3. 解决技术要点说明

- 解决了服务器端跨域访问问题，关键代码与步骤如下：

  ```js
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
  ```

- 解决请求（req）资源时传参，服务器端（res）获取参数的问题

  > 不同方式的接口应该通过不同形式传递参数。
  >
  > ① url / :id 形式的请求，应通过params获取参数
  >
  > ② 通过如post传递表格的，应通过body获取参数
  >
  > ③ 通过如get ?a=xxx 的形式，应通过query获取参数
  >
  > 下面，举例子

  第一种情况的前端请求：

  ```js
  this.$ajax
        .get(
          `/api/address/user/${this.$store.state.user.id}`
        )
        .then(res => {
          console.log(res.data.status)
          if (res.data.status == '200') {
            this.addressList = res.data.data
            this.showEmpty = false
          } else {
            this.showEmpty = true
            conson.log(this.showEmpty)
          }
        })
        .catch(err => {
          console.log('地址查找失败:', err)
        })
  ```

  第一种情况的服务器获取请求：

  ```js
  router.get("/:id", function (req, res, next) {
    let urlParam = req.params.id;
    findById(urlParam, function (success) {
      if (JSON.stringify(success) === "[]") {
        res.json({
          status: "400",
          data: "查找错误, 请重试!",
        });
      } else {
        res.json({
          status: "200",
          data: success,
        });
      }
    });
  });
  ```

  第二种情况的前端请求：

  ```js
  this.$ajax
          .put(
            '/api/address/default',
            this.$qs.stringify({
              id: index,
              user_id: this.$store.state.user.id
            })
          )
          .then(res => {
            this.reload()
          })
          .catch(err => {
            console.log('设置默认地址失败结果:', err)
          })
  ```

  第二情况的服务器获取请求：

  ```js
  router.put("/default", function (req, res, next) {
    let urlParam = req.body;
    updateDefaultById(urlParam, function (success) {
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
  ```

  p.s. 本项目中没有使用第三种请求方式，一般用其他两种方式代替。使用POST获取资源时，第三种方式会将信息暴露在url中，安全性较差，固没有选用。

- 服务器端controller层增删改查

  以地址为例:

  ```js
  // 1. add an address by '/address' with POST
  router.post("/", function (req, res, next) { // req: 请求  res: 返回
    let urlParam = req.body;
    add(urlParam, function (success) { // 调用数据库操作'add'
      if (success == null) {
        res.json({ // 返回json格式的res
          status: "400",
          data: `新增地址失败, 请重试!`,
        });
      } else {
        res.json({
          status: `200`,
          data: success,
        });
      }
    });
  });
  ```

  ```js
  // 2. find user's all addresses by '/address/user/:id' WITH GET
  router.get("/user/:id", function (req, res, next) {
    let urlParam = req.params.id;
    findByUserid(urlParam, function (success) {
      if (JSON.stringify(success) === "[null]") { // 将数据库返回值转为string来判断是否为空
        res.json({
          status: "400",
          data: "地址为空",
        });
      } else {
        res.json({
          status: "200",
          data: success,
        });
      }
    });
  });
  ```

  ```js
  // 4. update new default by '/address/default' WITH PUT
  router.put("/default", function (req, res, next) {
    let urlParam = req.body;
    updateDefaultById(urlParam, function (success) {
      if (success == null) {
        res.json({
          status: "400",
          data: "更新失败,请重试",
        });
      } else {
        res.json({
          status: "200",
          data: success,
        });
      }
    });
  });
  ```

  ```js
  // 6. delete an address by '/address/:id' with DELETE
  router.delete("/:id", function (req, res, next) {
    let urlParam = req.params.id;
    // console.log(`urlParam:`, urlParam);
    deleteById(urlParam, function (success) {
      if (success == null) {
        res.json({
          status: "400",
          data: "删除失败, 请重试!",
        });
      } else {
        res.json({
          status: "200",
          data: success,
        });
      }
    });
  });
  ```

  

## 4. 心得体会

- 大项目开发过程心得

  - 遇到哪些困难，经历哪里过程，有哪些收获

  ​		第一次接学习用js写的服务器，之前只接触过java的服务器，感觉还是非常不一样的。一种共同的趋势是，两边都会有一些集成框架来帮助我们减少代码量、提高效率，但整体感觉还是springboot简化地更彻底一些，nodejs仍然需要自己进行一些配置。此外，很重要的一点，nodejs使用mysql数据库的话，还是需要自己写很多的mysql增删改查语句，如果有方便的集成好的工具会更好。我在写的过程中因为长时间不写sql语句，有些生疏，一些较为复杂的操作，可能得通过多条sql语句才能实现，这时候就不得不考虑到异步操作的问题了，而异步一直是js这个脚本语言需要解决的问题，幸好目前有很多解决的办法，如使用回调函数、promise对象或者是async/await等等，这个地方我学到了很多，毕竟服务器还是跟数据处理打交道的。

  ​		这次项目印象比较深刻的是HTTP请求RESTFUL风格的接口，我也是在学习之后尽可能地运行这一风格。GET请求会向数据库发索取数据的请求，从而来获取信息，该请求就像数据库的select操作一样，只是用来查询一下数据，不会修改、增加数据，不会影响资源的内容，即该请求不会产生副作用。无论进行多少次操作，结果都是一样的。PUT请求是向服务器端发送数据的从而改变信息，该请求就像数据库的update操作一样，用来修改数据的内容，但是不会增加数据的种类等，也就是说无论进行多少次PUT操作，其结果并没有不同。POST请求同PUT请求类似，都是向服务器端发送数据的，但是该请求会改变数据的种类等资源，就像数据库的insert操作一样，会创建新的内容。DELETE请求顾名思义，就是用来删除某一个资源的，该请求就像数据库的delete操作。而对于一些仅仅是SELECT的请求，比如查看用户的账号和密码是否匹配，听起来应该用GET请求，但GET请求容易把参数暴露出来，不安全，这时还是通过POST来用body传递参数比较安全。所以很多时候还是要视情况而定。RESTFUL风格还是非常厉害，用最短的URL，通过不同HTTP请求，就能实现各种需求。

  ​		本次项目比较大的遗憾是没有使用函数化编程等一些js高级的内容，一来是这些内容较为复杂，我不善于使用，二来可能是我这个项目还是偏小，需求不高，没有使用这些高级方法的必要。高级的方法在提高程序效率、方便功能的实现等方面还是有非常好的效果的。

  ​		整体来说，本次项目还是相对完整，我自己还算满意，能在不到三周的时间里独立完成前端和后端的所有代码，算是一次不小的挑战。接下去也要继续努力，理解得更深入，使用得更深入。
