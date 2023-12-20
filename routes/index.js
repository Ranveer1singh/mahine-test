var express = require("express");
var router = express.Router();
var mysql2 = require("mysql2");

/* create connection */
const con = mysql2.createConnection({
  host:'localhost',
  user: "root",
  password: '',
  database:'machine'
})

/* connect to my mysql */
con.connect(err=>{
  if(err){
    throw err;
  }
  console.log('mysql connected')
})

/* create data base */
router.get('/createdb',(req, res)=>{
  let sql = "CREATE DATABASE machine"
  con.query(sql,err=>{
    if(err){
      throw err
    }
    res.send("data base create")
  })
})

/* crete table */
router.get('/usertable',(req,res)=>{
  let sql = "CREATE TABLE user(id int AUTO_INCREMENT, name VARCHAR(255),email VARCHAR(255),number int,Address VARCHAR(255),city VARCHAR(255), state VARCHAR(255),zip VARCHAR(255), PRIMARY KEY(id))"
  con.query(sql,err=>{
    if(err){
      throw err
    }
    res.send("user table create")
  })
})

/* insert users */
router.post('/users1',(req,res)=>{
  let sql = "INSERT INTO user set ?"
  let query = con.query(sql,req.body,err=>{
    if(err){
      throw err
    }
    res.redirect("/getuser")
  })
})

/* get user */
router.get('/getuser',(req,res)=>{
  let sql = 'SELECT * FROM user'
  let query = con.query(sql,(err,results)=>{
    if(err){
      throw err
    }
    console.log(results)
    res.render("alluser",{results})
  })
})

// edit user
router.get('/edit/:id',(req,res)=>{
 
  let sql = `SELECT * FROM user WHERE id=${req.params.id}`
  let query = con.query(sql,(err,results)=>{
    if(err){
      return err
    }
    console.log(results)
    res.render('update' ,{results})
  })
})


/* update user. */
router.post('/updateuser/:id',(req,res)=>{
 let {name, email, Address,number }= req.body
  let sql = `UPDATE USER SET name=?, email=?, Address=?, number=? WHERE id=${req.params.id}`

  let query = con.query(sql,[name,email, Address, number],err=>{
    if(err){
      throw err
    }
    res.redirect('/getuser')
  })
})
/* delete  user. */
router.get('/delete/:id',(req,res)=>{
  let sql = `DELETE FROM user WHERE id=${req.params.id}`
  let query = con.query(sql,err=>{
    if(err){
      throw err
    }
   res.redirect('back')
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allUser', (req,res)=>{
  res.render("alluser")

})

module.exports = router;
