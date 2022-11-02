// 引进这个模块

const express = require("express");

const path = require("path");

const fs = require("fs");

// 然后实例化这个

var router = express.Router();

//导入模块

var sqlite3 = require("sqlite3").verbose();

//指定数据库 文件位置

var db = new sqlite3.Database(path.join(__dirname, "../db/test.sqlite3")); 

//内容 接口写中间这里

router.get("/testlist", (req, res) => {

  db.all("select * from `user`", [], (err, rows) => {

    if (err == null) {

      res.send(rows);

    } else {

      res.send(err);

    }

  });

});

module.exports = router;
//————————————————
//版权声明：本文为CSDN博主「Sengoku_Xingzi」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
//原文链接：https://blog.csdn.net/Sengoku_Xingzi/article/details/126971299