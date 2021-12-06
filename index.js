const express = require('express');
// const path=require('path');
const port = Process.env.PORT || 3000 ;
const { title } = require('process');
const port=8000;
const  db= require('./config/mongoose');
const Contact= require('./models/contact')
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded())

app.use(express.static('assets'));

var contactList=[
    {
        name:'Rishabh',
        phone:'8851840604'
    },
    {
        name:'Ashok',
        phone:'9212424292'
    },
    {
        name: 'Gaurav',
        phone:'8826230950'
    }
]
app.post('/contact-page',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    // contactList.push(req.body)
    // return res.redirect('/')
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(error,newContact){
        if(error){
            console.log("error",error);
            return;
        }
        console.log('********',newContact);
        return res.redirect('back')

        
    })
    
})


app.get('/',function(req,res){
    Contact.find({},function(error,contacts){
        if(error){
            console.log("error",error);
            return;
        }
        res.render('home',
        {title:'contactlist',
        contact_list:contacts
    })
   

});
    
})
app.get('/practice',function(req,res){
    res.render('practice',{title:"lets practise"})
})
app.get('/delete_contact/',function(req,res){
    // let phone=req.query.phone;
    // let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
    // if(contactList!=-1){
    //     contactList.splice(contactIndex,1);

    // }
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }
        
        return res.redirect('back')
        
    })
 
    
    
})


app.listen(port,function(err){
    if(err){
        console("error in running",err);
    }
    console.log("express server is running at port",port);
})

