const express=require("express")
const  bodyParser=require("body-parser")
const request=require("request")
const https =require("https")
const client = require("@mailchimp/mailchimp_marketing");
 
const res = require("express/lib/response")



const app=express()
//2ndstep
//In order for our server to serve a static file such a CSS and Images 
// We need to use a special function of express Called Static  
// And we Gonna add the name of foldr that we gonna keep static and wa gonna call it "Public"
//PS:We should reffer to these static folders by a relative URL to the puvlic folder 
app.use(express.static("public"))
//3rd step
//In order to create a POST route we use (app.post) to target the home route 
// and inside the call back fuction we trynna to "log" what user entered and i Order to do that we need 
//to use Body-Parser and Urlencoded of BodyPardser 
app.use(bodyParser.urlencoded({extended:true}))

client.setConfig({
    apiKey: "3714519978d34ab4d4959d79f2a32b19-us11",
    server: "us11" // example : us12
})
//1st step :  request the home route from our server it should deliver the file at diroctoryName 
//and specify the route "In this case : "the home route"and callback function specify the 
//response to send the file at the location __dirname
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
   
})

 //4th step After setting up the body perser to be used by the app at the 3rd step,Now we Pull up the values 
//of those things inside our 'form' by creating var called 1stname,lastName,email , added them at index.html 
app.post("/",function(req,res){
    const firstName = req.body.fName    //as long as I am not change them as var ,I will turn them as Const 
    const lastName= req.body.lName
    const  email= req.body.email
    console.log(firstName,lastName,email)
    //5th step is creating our data we waanna post as a JSON by creating a javascript object called data 

    //stringfy turn data into a string 

    //now we have jsonData and its ready to be sent to mailchimp by Makindg a Request 
    //we need to post data to external resource 
    // const url="3714519978d34ab4d4959d79f2a32b19-us11"
    // https.request(url,options,(response){

        async function run() {
            //Use batch operations to complete multiple operations with a single call.
            const response = await client.lists.batchListMembers("c7807167d3", {
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


















//c7807167d3
//3714519978d34ab4d4959d79f2a32b19-us11