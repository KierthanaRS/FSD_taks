const express= require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const mysql=require("mysql")

const app=express()
app.use(cors())
app.use(bodyparser.json())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"Employee"
})

db.connect((err)=>{
    if(err){
        console.log("Failed to connet");
        return;
    }
    console.log("Mysql is connected")
})

app.get("/",(req,res)=>{
    res.status(200).send({message:"API is running"})
})

app.post("/post-data",(req,res)=>{
    const  {firstName,lastName,employeeId,email,phone,department,joiningDate,role}=req.body;
    const insertQuery=`INSERT INTO EmpDetails VALUES(?,?,?,?,?,?,?,?)`
    db.query(insertQuery,[employeeId,firstName,lastName,email,phone,department,joiningDate,role],
        (err,result)=>{
            if(err){
                res.status(500).send({message:"Failed to insert data", error: err})
                return;
            }
            res.status(200).send({message:"Data inserted successfully",data:result})
        }
    )

})

app.get("/fetch-details",(req,res=>{
    const query=`SELECT * FROM EmpDetails`
    db.query(query,(err,res)=>{
        if(err){
            res.status(500).send({message:"Failed to Fetch data", error: err})
                return;
        }
        res.status(200).send({message:"Data Fetched",data:result})

    })
}))
app.listen(5000,()=>{
    console.log("Server is runnig on port 5000")
})