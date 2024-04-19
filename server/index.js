let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect((err)=>{
    if(err){
        console.log('数据库连接失败');
        return;
    }else{
        console.log('数据库连接成功');
    }
});

connection.query("select * from user",(err,result)=>{
    if(err){
        console.log('查询失败');
        return;
    }else{
        console.log(result);
    }
})

let sql = "insert into user(name,password) values(?,?)";
let params = ['xiaoming',"xiaoming123456"];

connection.query(sql,params,(err,result)=>{
    if(err){
        console.log('插入失败：' + err.message);
        return;
    }else{
        console.log('插入成功');
    }
})

connection.end();

