const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const user = require('../models/userSchema');
const forms = require('../models/forms')
const generator = require('generate-password');
const router = express.Router();
const nodemailer = require('nodemailer');
router.use(bodyParser.json());
require("dotenv").config();
router.route("/")
    .post((req, res) => {
        let body = req.body.users;
        var passwords = generator.generateMultiple(body.length, {
            length: 6,
            uppercase: true,
            numbers: true,
        });
        let queryData  = [];
        let queryData2  = [];
        let emails = [];
        for(let i=0;i<body.length;i++) {
            emails.push(body[i].email);
            queryData.push({
                "email" : body[i].email,
                "passwd" : passwords[i],
                "role" : body[i].role,
                "orgId" : body[i].orgId  
            });
            queryData2.push({
                "email":body[i].email,
                "exam":[]
            })
        }
        user.collection.find({"_id" : {$in: [queryData[0].orgId]}}).count().then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
        user.collection.find({"email" : { $in: emails }}).count()
        .then((countUserExist) => {
            console.log(countUserExist);
            if(countUserExist===0) {
                forms.collection.insertMany(queryData2)
                .then(() => {
                    console.log("forms inserted");
                })
                .catch((err)=>{
                    console.log("forms error",err);
                })
                user.collection.insertMany(queryData)
                .then(() => {
                    console.log("success");
                    
                    for(let i=0;i<queryData.length;i++) {
                        let toEmail = queryData[i].email;
                        let pwd = queryData[i].passwd;

                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'subhrasankhasarma1999@gmail.com',
                                pass: process.env.password
                            }
                        });

                        let mailOptions = {
                            from: 'subhrasankhasarma1999@gmail.com',
                            to: toEmail,
                            subject: 'Edgile',
                            text: `You has been successfully registered by your HOD. Here is your password ${pwd} & This is your Registered E-Mail  ${toEmail}`
                        }
                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                console.log(err);
                                res.status(200).json({"status" : "All Users Generated Successfully ! but mail not sent !"})
                            }
                            else {
                                console.log("Mail sent");
                                res.status(200).json({"status" : "All Users Generated Successfully !"})
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log("error");   
                    res.status(200).json({"status" : "Server Side Error Occured !"})
                })
            } else {
                res.status(200).json({"status" :countUserExist+" user/users from the file already exist, please check and generate again after updating the files !"})
            }
        }).catch((err) => {
            res.status(500);
        });
    });
module.exports = router;