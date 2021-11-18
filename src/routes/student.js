const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Course = require('../models/course');


var default_student = {
	  username: "Your ID",
	  password: "Password",
	  name: "Name",
	  rollno: "Roll Number"
	};

var default_username = "User Name"; 

var default_courseid = "Course Code";


router.get('/home', isLoggedInAsStudent, (req, res) => {
    res.render('students/home', { title: 'Student Home Page', student: default_student });
  });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
	
router.get('/new', isLoggedIn, (req, res) => {
    res.render('students/new', { title: 'Add New Student', student: default_student });
  });


router.post('/create', isLoggedIn, (req, res) => {
    // TO DO: Ensure that the student and course exists
    // TO DO: Add failure cases
    var student = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      rollno: req.body.rollno
    };
    var username = req.body.username;

    Student.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc)
          res.redirect('/students/new');
        else {
          Student.create(student, (err, doc) => {
              if (err)
                res.send("Some error occured");



              else
                res.redirect('/admin/home');
            });
        }
      });
  });

router.get('/get_username_edit', isLoggedIn, (req, res) => {
    res.render('students/get_username_edit', { title: "Get Username", username: default_username });
  });


router.get('/edit', isLoggedIn, (req, res) => {
    //Failure renders edit if update is incorrect
    var username = req.query.username;
    Student.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");

        else {
          if (doc)
            res.render('students/edit', { title: 'Edit Student', student: doc });


          else
            res.redirect('/students/get_username_edit');
        }
      });
  });

router.post('/update', isLoggedIn, (req, res) => {
    // TO DO: Ensure that the student and course exists
    // TO DO: Add failure cases
    var student = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      rollno: req.body.rollno
    };
    var prevusername = req.body.prevusername;

    Student.update(prevusername, student, (err, doc) => {
        if (err)
          res.render('students/edit', { title: 'Edit Student', student: student });


        else
          res.redirect('../admin/home');
      });
  });

router.get('/get_username_delete', isLoggedIn, (req, res) => {
    var default_username = "User Name";
    res.render('students/get_username_delete', { title: "Get Username", username: default_username });
  });

router.post('/delete', isLoggedIn, (req, res) => {
    // TO DO: Ensure that the student and course exists
    // TO DO: Add failure cases
    var username = req.body.username;

    Student.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc) {
          Student.remove(username, (err, doc) => {
              if (err)
                res.send("Some error occured");



              else
                res.redirect('../admin/home');
            });
        }


        else
          res.redirect('../students/get_username_delete');
      });
  });

router.get('/register_form', isLoggedIn, (req, res) => {
    res.render('students/register', {
      title: "Register", username: default_username,
      courseid: default_courseid
    });
  });

router.post('/register', isLoggedIn, (req, res) => {
    var username = req.body.username;
    var course_code = req.body.courseid;

    Student.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc) {
          Course.getBycourseid(course_code, (err, doc) => {
              if (err)
                res.send("Some error occured");
              else if (doc) {
                Student.getBycourseid(username, course_code, (err, doc) => {
                    if (err)
                      res.send("Some error occured");
                    else if (doc) { res.redirect('/students/register_form'); }

                    else {
                      Student.register(username, course_code, (err, doc) => {
                          if (err)
                            res.send("Some error occured");
                          else if (doc)
                            res.redirect('/admin/home');

                        });
                    }
                  });
              }



              else
                res.redirect('/students/register_form');

            });
        }


        else
          res.redirect('/students/register_form');

      });
  });

router.get('/deregister_form', isLoggedIn, (req, res) => {
    res.render('students/deregister', {
      title: "Deregister", username: default_username,
      courseid: default_courseid
    });
  });

router.post('/deregister', isLoggedIn, (req, res) => {
    // TO DO: Ensure that the student and course exists
    // TO DO: Add failure cases
    var username = req.body.username;
    var course_code = req.body.courseid;

    Student.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc) {
          Course.getBycourseid(course_code, (err, doc) => {
              if (err)
                res.send("Some error occured");
              else if (doc) {
                Student.getBycourseid(username, course_code, (err, doc) => {
                    if (err)
                      res.send("Some error occured");
                    else if (doc) {
                      Student.deregister(username, course_code, (err, doc) => {
                          if (err)
                            res.send("Some error occured");
                          else if (doc)
                            res.redirect('/admin/home');
                        });
                    }

                    else {
                      res.redirect('/students/register_form');
                    }

                  });
              }



              else
                res.redirect('/students/register_form');
            });
        }


        else
          res.redirect('/students/register_form');
      });
  });



function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='admin')
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isLoggedInAsStudent(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='student')
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;
