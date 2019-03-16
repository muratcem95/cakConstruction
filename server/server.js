const path=require('path');
const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const viewsPath=path.join(__dirname,'../views');
const port=process.env.PORT || 3000;
const app=express();
const server=http.createServer(app);
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'muratcem95@gmail.com',
        pass:'hqkjctddswrplwjm'
    }
});
app.set('views',viewsPath);  
app.use(express.static(viewsPath));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.sendFile('index.html');
});
app.post('/contactForm',(req,res)=>{
    var mailOptions={
        from:'muratcem95@gmail.com',
        to:'cakartsandcrafts@gmail.com',
        subject:'CAK Arts & Crafts - Construction Page Contact Us',
        html:`<p><b>Name:</b> ${req.body.name}<br><b>Email address:</b> ${req.body.email}</p><p><b>Message:</b> ${req.body.message}</p>`
    };
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent:'+info.response);
        }
    });
});
server.listen(port,()=>console.log(`Server is up on port ${port}`));