const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
                var usertype = req.query.usertype;
                if (usertype == 'admin')
                        res.render('login', { title: "Admin Login", method: "authenticate_admin" });
                if (usertype == 'student')
                        res.render('login', { title: "Student Login", method: "authenticate_student" });
                if (usertype == 'teacher')
                        res.render('login', { title: "teacher Login", method: "authenticate_teacher" });
        });

router.post('/authenticate_admin', passport.authenticate('local-login-admin', {
        successRedirect : '../admin/home', 
        failureRedirect : '/',
        failureFlash : true 
}));

router.post('/authenticate_student', passport.authenticate('local-login-student', {
        successRedirect : '../students/home',
        failureRedirect : '/', 
        failureFlash : true 
}));

router.post('/authenticate_teacher', passport.authenticate('local-login-teacher', {
        successRedirect : '../teachers/home', 
        failureRedirect : '/', 
        failureFlash : true 
}));


module.exports = router;