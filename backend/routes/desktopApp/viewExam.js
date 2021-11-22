const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const forms = require('../../models/forms');
const path = require('path');
const generator = require('generate-password');
const router = express.Router();

router.use(bodyParser.json());

var db = mongoose.connection;

router.route("/")
    .post((req, res) => {
        let user = req.body.user;
        console.log(user);
        let query = forms.find({"email" : user});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                console.log(data);
                res.status(200).json({exams : data});
            }
        })
    });
module.exports = router;