var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mydb',
    debug    :  false
});

function handle_database(req,res) {
   
    pool.getConnection(function(err,connection){
      
      console.log(JSON.stringify(req.query));
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
        connection.query("select * from t_user",function(err,rows){
            connection.release();
            if(!err) {
                console.log("return data");
                res.json(rows);
            }          
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;    
        });
  });
}

app.get("/",function(req,res){-
    
    handle_database(req,res);
});

app.listen(3000);