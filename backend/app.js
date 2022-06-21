const express = require('express')
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express()
const port = 3000
const bill = require('./db').Bill;
app.use(bodyParser.json()); 

app.all('*', function (req, res, next) {
    /// 允许跨域访问的域名：若有端口需写全（协议+域名+端口），若没有端口末尾不用加'/'
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    console.log(req.url);
    next();
});


app.get('/all', (req, res) => {
    console.log('all');
    console.log(req.headers)
    bill.all((err,rows)=>{
        res.json(rows);
    })
  
});
app.get('/allWithClass',(req,res)=>{
    bill.allWithClassName(req.query,(err,rows)=>{
        if(err !== null){
            console.log(err);
        }
        
        res.json({
            msg:"success",
            data:rows
        });
    })
});

app.get('/allClass',(req,res)=>{
    bill.allClass((err,rows)=>{
        if(err !== null){
            console.log(err);
        }
        res.json(rows);
    })
});


app.post('/insert',(req,res)=>{
    console.log(req.body);
    let body = req.body;
    body.time = new Date().valueOf();
    bill.insertNew(body,(err,rows)=>{
        let flag = 0;
        if(err !== null){
            console.log(err);
            flag = 1;
        }
        if(flag === 0){
            bill.findOne(body,(err,data)=>{
                res.status(201).send({
                    msg:"Insert success!!!",
                    newData:data
                });
            })
            
        }else{
            res.status(500).send({
                msg:"ahhhhhh!!!!!"
            })
        }
        
    });
});
app.get('/filter',(req,res)=>{
    console.log(req.query)
    bill.findByTimeRange(req.query,(err,rows)=>{
        let flag = 0;
        // console.log(rows);
        if(err !== null){
            console.log(err);
            flag = 1;
        }
        if(flag === 0){
            res.status(201).send({
                msg:"success",
                data:rows
            })
            
        }else{
            res.status(500).send({
                msg:"ahhhhhh!!!!!"
            })
        }
        
    });
    // res.send('aloha');

})
app.get('/count',(req,res)=>{
    bill.countRows((err,data)=>{
        if(err !== null){
            console.log(err);
        }
        console.log(data);
        res.send(data);
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})