const sqlite3 = require('sqlite3').verbose();
const dbname = "main";
const db = new sqlite3.Database('./test.db');


class Bill{
    static all(dbRes){
        db.all('select * from bill',dbRes);
    }
    static allWithClassName(body,dbRes){
        let sql = `
            select
                b.time,b.category,c.name,b.amount,c.type
            from bill as b
            inner join categories as c 
            on
            c.id = b.category
            `;
        if(body.classes!=undefined){
            body.classes = JSON.parse(body.classes)
            let s = "(";
            let l = body.classes.length;
            for(let i = 0 ; i < l; i ++){
                s += '\"'+body.classes[i] + '\"';
                if(i!=l-1){
                    s += ","
                }
            }
            s += ")"
            console.log(body.classes)
            sql += `and b.category in ${s}`
        }
        sql += 'order by b.time desc';
        db.all(sql,dbRes);
    }
    static allClass(dbRes){
        db.all("select * from categories;",dbRes);
    }
    static countRows(dbres){
        db.get('select COUNT(*) as count from bill;',dbres);
    }
    static findOne(body,dbRes){
        let sql = `
        select 
            b.time,b.category,c.name,b.amount,c.type 
        from bill as b 
        inner join categories as c 
        on 
        c.id = b.category
        and b.time = ${body.time}
        and b.category = "${body.type}"
        and b.amount = ${body.amount}
        ; `
        console.log(sql);
        db.get(sql,dbRes);
    }
    static findByTimeRange(body,dbRes){
        let sql = `
            select
                b.time,b.category,c.name,b.amount,c.type
            from bill as b
            inner join categories as c 
            on
            c.id = b.category
            where
            b.time >= ${body.start}
            and
            b.time <= ${body.end}
            `;
        if(body.classes!=undefined){
            body.classes = JSON.parse(body.classes)
            let s = "(";
            let l = body.classes.length;
            for(let i = 0 ; i < l; i ++){
                s += '\"'+body.classes[i] + '\"';
                if(i!=l-1){
                    s += ","
                }
            }
            s += ")"
            console.log(body.classes)
            sql += `and b.category in ${s} `
        }
        sql += "order by b.time desc"
        console.log(sql);
        db.all(sql,dbRes);

    }
    static insertNew(body,dbRes){
        let sql = `
            insert into 
            bill(type,time,category,amount) 
            values(
                (select type from categories where id = "${body.type}"),
                ${body.time},
                "${body.type}",
                ${body.amount})`;
        console.log(sql);
        db.run(sql,dbRes);
    }
}

module.exports.Bill = Bill;