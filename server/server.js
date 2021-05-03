const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { response } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const saltRounds = 10;

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
}));


app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "collegesystem",
    port: 3306
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log("CONNECTED");
    }
})

app.post('/register', (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    bcrypt.hash(password, saltRounds, (err, hash)=>{
        if(err){
            console.log(err);
        }
        db.query("INSERT INTO users (username, password, roles) VALUES (?, ?, ?)", [username, hash, role], (err, result)=>{
            console.log(err);
        })

    })
    
    
});

app.get('/listUsers',(req,res)=>{
    var userList = 'SELECT id,username,roles FROM users';
    db.query(userList, function(err, data, fields){
        if(err) throw err;
        //res.render('listUsers', {title:'USER LIST', userData: data});
        res.send(data);
    });
    
})

app.get('/login', (req, res)=>{
    if(req.session.user){
        res.send({loggedIn : true, user: req.session.user})
    }else{
        res.send({loggedIn : false})
    }
})

app.post('/login',(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    //console.log(role);
    
    db.query("SELECT * FROM users WHERE username = ? and roles = ?", [username, role], (err, result)=>{
        if(err){
            res.send({err: err});
        }

        if(result.length > 0){
            // res.send(result);
            bcrypt.compare(password, result[0].password, (error, response)=>{
                if(response){
                    req.session.user = result;
                    //console.log(req.session.user);
                    
                    res.send(result);
                }else{
                    res.send({message: "WRONG CREDENTIALS"})
                }
            })

        }else{
             res.send({message : "USER DOESNT EXIST"})
        }
        
    })
})

app.post('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        res.send("SUCCESS");


    })

})

app.listen(5000, ()=> console.log("SERVER RUNNING"));