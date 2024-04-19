// 导入express框架
const express = require('express');
// 创建express服务器实例
const app = express();
// 导入bodyparser
var bodyParser = require('body-parser');

//导入cors
const cors = require('cors');
//全局挂载
app.use(cors());

// 当extended为false时，值为数组或字符串；
// 当为true时，值为任意对象
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(3007, () => {
    console.log(`http://localhost:3007/;`);
});