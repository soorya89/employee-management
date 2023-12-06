import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()
const con=mysql.createConnection({
    host:process.env.DB_HOST,
    
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})
con.connect(function(err){
    if(err){
    console.log('connection error');
    }else{
        console.log('connected');
    }
})
export default con