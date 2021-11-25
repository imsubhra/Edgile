const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const det = require('../models/schema');
const user = require('../models/userSchema');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
require("dotenv").config();
const router = express.Router();
router.use(bodyParser.json());


router.route("/signup")
    .post((req, res, next) => {
        det.countDocuments({ email: req.body.details.email }, (err, cnt) => {
            if (err) {
                console.log(err);
            }
            else {
                if (cnt) {
                    res.status(422).json({ error: "Email Already Exists" });
                }
                else {
                    const details = new det({
                        firstname: req.body.details.firstname,
                        lastname: req.body.details.lastname,
                        email: req.body.details.email,
                        university: req.body.details.university,
                        designation: req.body.details.designation
                       
                    });
                    det.create(details)
                        // details.save()
                        .then((detail) => {
                            console.log("Details inserted into Database");
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.json({ "statusMessage": "Details Has Been Sent to The Administrator. Check your mail to chech further details" });
                        })
                        .catch((err) => next(err));
                }
            }
        });
    });


router.route("/signin")
    .post((req, res, next) => {
        var query = user.find({ $and: [{ email: { $eq: req.body.admin_users.email } }, { passwd: { $eq: req.body.admin_users.passwd } }] });
        query.exec((err, someValue) => {
            console.log(someValue);
            if (err) {
                next(err);
            }
            else {
                if (someValue.length) {
                    console.log(someValue[0].role)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ "statusMessage": "Login is Successful", "role": someValue[0].role, "email": someValue[0].email, "orgId": someValue[0].orgId});
                }
                else {
                    res.status(401).send({ error: 'Credentials are wrong' });
                }
            }
        })
    });

router.route("/dashboard")
    .get((req, res) => {
        // let cookie = Cookies.get()
        // console.log(cookie)
        det.find({ "status": "pending" })
            .then((values) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(values);
            })
            .catch((err) => res.status(503).send({ error: "Unable to Process Data" }));
    });

router.route("/accepted")
    .get((req, res) => {
        det.find({ "status": "accepted" })
            .then((values) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(values);
            })
            .catch((err) => res.status(503).send({ error: "Unable to Process Data" }));
    });

router.route("/rejected")
    .get((req, res) => {
        det.find({ "status": "rejected" })
            .then((values) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(values);
            })
            .catch((err) => res.status(503).send({ error: "Unable to Process Data" }));
    });

router.route("/confirmation")
    .post((req, res) => {
        let password = generator.generate({
            length: 6,
            uppercase: true,
            numbers: true
        });

        det.find({ "email": { $in: [req.body.details.email] } })
            .then(data => {
                console.log(data[0]._id)
                user.collection.find({ "email": { $in: [req.body.details.email] } }).count()
                    .then((countUserExist) => {
                        console.log(countUserExist);
                        if (countUserExist === 0) {
                            let queryData = [];
                            queryData.push({
                                "email": req.body.details.email,
                                "passwd": password,
                                "role": "admin",
                                "orgId": data[0]._id
                            });
                            user.collection.insertMany(queryData)
                                .then(() => {
                                    console.log("success");
                                    let transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: 'subhrasankhasarma1999@gmail.com',
                                            pass: process.env.password
                                        }
                                    });
                                    let mailOptions = {
                                        from: 'subhrasankhasarma1999@gmail.com',
                                        to: req.body.details.email,
                                        subject: 'Application Accepted',
                                        text: `Your department has been successfully registered. Now you can use our application for conducting exam for students. Here is your password ${password} & This is your Registered E-Mail for your Department  ${req.body.details.email}`
                                    }
                                    transporter.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            console.log(err);
                                            res.statusCode = 502;
                                            res.send({ error: "Mail Not Sent" });
                                        }
                                        else {
                                            det.findOneAndUpdate({ email: req.body.details.email }, { $set: { status: "accepted" } }, { new: true }, (error, doc) => {
                                                if (error) {
                                                    res.statusCode = 501;
                                                    res.send({ error: "Failed to Update DB" })
                                                }
                                                else {
                                                    console.log('email sent ' + info.response)
                                                    res.statusCode = 200;
                                                    res.setHeader('Content-Type', 'text/plain');
                                                    res.json({ "statusMessage": "Mail Sent Successfully" });
                                                }
                                            })

                                        }
                                    })
                                })
                                .catch((err) => {
                                    console.log("error");
                                    res.status(500).send({error : "Server Side Error Occured !" })
                                })
                        } else {
                            res.status(200).json({ "statusMessage": "Email id already exists" })
                        }
                    });
            })
            .catch(err => res.status(500).send({ error: "Server Error Occured !" }))


    });

router.route("/rejection")
    .post((req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'subhrasankhasarma1999@gmail.com',
                pass: 'Subhra1@'
            }
        });
        let mailOptions = {
            from: 'subhrasankhasarma1999@gmail.com',
            to: req.body.details.email,
            subject: 'Application Rejected',
            text: `Sorry, your application has been rejected. It may be due to multiple logins registered. For any further guidance mail us at subhrasankhasarma1999@gmail.com`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.statusCode = 502;
                res.send({ error: "Mail unable to sent" });
            }
            else {
                det.findOneAndUpdate({ email: req.body.details.email }, { $set: { status: "rejected" } }, { new: true }, (error, doc) => {
                    if (error) {
                        res.statusCode = 501;
                        res.send({ error: "Failed to Update database" })
                    }
                    else {
                        console.log('email sent ' + info.response)
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.json({ "statusMessage": "Mail successfully sent" });
                    }
                })

            }
        })

    });

module.exports = router;
