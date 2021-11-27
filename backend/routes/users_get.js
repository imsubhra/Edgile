const bodyParser = require('body-parser');
const express = require('express');
const user = require('../models/users');
const router = express.Router();


router.use(bodyParser.json());

//ROUTE FOR FETCHING TEACHERS DETAILS
router.route("/teachers").get((req, res) => {
        let query = user.find({"role" : "teacher"});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json({users : data});
            }
        })
    });

//ROUTE FOR FETCHING STUDENTS DETAILS    
router.route("/students").get((req, res) => {
    let query = user.find({"role" : "student"});
    query.exec((err,data) => {
        if(err) {
            res.status(500);
        } else {
            res.status(200).json({users : data});
        }
    })
});

//ROUTE FOR FETCHING DEPARTMENT ADMINS DETAILS
router.route("/admins").get((req, res) => {
        let query = user.find({"role" : "admin"});
        query.exec((err,data) => {
            if(err) {
                res.status(500);
            } else {
                res.status(200).json({users : data});
            }
        })
    });

module.exports = router;