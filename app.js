const express=require("express")
const  bodyParser=require("body-parser")
const request=require("request")
const https =require("https")
const client = require("@mailchimp/mailchimp_marketing");
 
const res = require("express/lib/response")



const app=express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

client.setConfig({
    apiKey: "3API key",
    server: "usXX" // example : us12
})
 //request the home route from our server it should deliver the file at diroctoryName 
//and specify the route "In this case : "the home route"and callback function specify the 
//response to send the file at the location __dirname
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
   
})

 // After setting up the body perser to be used by the app at the 3rd step,Now we Pull up the values 
//of those things inside our 'form' by creating var called 1stname,lastName,email , added them at index.html 
app.post("/",function(req,res){
    const firstName = req.body.fName    //as long as I am not change them as var ,I will turn them as Const 
    const lastName= req.body.lName
    const  email= req.body.email
    console.log(firstName,lastName,email)
    // creating our data we waanna post as a JSON by creating a javascript object called data 




        async function run() {
            //Use batch operations to complete multiple operations with a single call.
            const response = await client.lists.batchListMembers("List ID", {
                members: [{
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }]
              });
              res.sendFile(__dirname + "/success.html");
        }
        //The try...catch statement marks a try block and a catch block. If the code in the try block throws 
        // an exception then the code in the catch block will be executed.
        run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });
    
    app.listen(process.env.PORT||3000, () => {
        console.log("server is running on port 3000");
    });















