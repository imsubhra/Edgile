const bodyParser = require('body-parser');
const express = require('express');
const user = require('../models/users');
const router = express.Router();
router.use(bodyParser.json());


router.route("/")
    .post((req, res) => {
        let body = req.body.email;
        emails = [body];
        var query = user.find({ $and: [{ email: { $eq: body } }] });
        query.exec((err, someValue) => {
            if (err) {
                res.status(500);
            }
            else {
                if (someValue.length) {
                    console.log(someValue[0].orgId)
                    res.status(200).json({code : 1, status: 'User found with emailid', orgId : someValue[0].orgId});
                }
                else {
                    res.status(200).json({code : 2, status: 'No data with that emailid exist'});
                }
            }
        });
    });


module.exports = router;