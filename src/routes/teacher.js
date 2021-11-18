const express = require('express')
const router = express.Router()
const teacher = require('../models/teacher')
const Course = require('../models/course');

var default_teacher = {
	  username: "Your LDAP ID",
	  password: "Password",
	  name: "Name"
	};
	
var default_username = "User Name";

var default_courseid = "Course Code";



router.get('/home', isLoggedInAsteacher, (req, res) => {
    res.render('teachers/home', { title: 'teacher Home Page', teacher: default_teacher });
  });

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/new',isLoggedIn, (req, res) => {
    res.render('teachers/new', { title: 'Add New teacher', teacher: default_teacher });
  });


router.post('/create',isLoggedIn, (req, res) => {
    var teacher = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    };
    var username = req.body.username;

    teacher.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc)
          res.redirect('/teachers/new');
        else {
          teacher.create(teacher, (err, doc) => {
              if (err)
                res.send("Some error occured");



              else
                res.redirect('/admin/home');
            });
        }
      });
  });

router.get('/get_username_edit',isLoggedIn, (req, res) => {
    res.render('teachers/get_username_edit', { title: "Get Username", username: default_username });
  });

router.get('/edit',isLoggedIn, (req, res) => {
    //Failure renders edit if update is incorrect
    var username = req.query.username;
    teacher.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");

        else {
          if (doc)
            res.render('teachers/edit', { title: 'Edit teacher', teacher: doc });


          else
            res.redirect('/teachers/get_username_edit');
        }
      });
  });

router.post('/update',isLoggedIn, (req, res) => {
    var teacher = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    };
    var prevusername = req.body.prevusername;
    teacher.update(prevusername, teacher, (err, doc) => {
        if (err)
          res.render('teachers/edit', { title: 'Edit teachers', teacher: teacher });


        else
          res.redirect('../admin/home');
      });
  });

router.get('/get_username_delete',isLoggedIn, (req, res) => {
    res.render('teachers/get_username_delete', { title: "Get Username", username: default_username });
  });

router.post('/delete',isLoggedIn, (req, res) => {
    var username = req.body.username;

    teacher.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc) {
          teacher.remove(username, (err, doc) => {
            if (err)
              res.send("Some error occured");



            else
              res.redirect('../admin/home');
          });
        }


        else
          res.redirect('../teachers/get_username_delete');
      });
  });

router.get('/assign_form',isLoggedIn, (req, res) => {
    res.render('teachers/assign', {
      title: "Assign", username: default_username,
      courseid: default_courseid
    });
  });

router.post('/assign',isLoggedIn, (req, res) => {
    var username = req.body.username;
    var course_code = req.body.courseid;

    teacher.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc) {
          Course.getBycourseid(course_code, (err, doc) => {
              if (err)
                res.send("Some error occured");
              else if (doc) {
                teacher.getBycourseid(username, course_code, (err, doc) => {
                    if (err)
                      res.send("Some error occured");
                    else if (doc) { res.redirect('/teachers/assign_form'); }

                    else {
                      teacher.assign(username, course_code, (err, doc) => {
                          if (err)
                            res.send("Some error occured");
                          else if (doc)
                            res.redirect('/admin/home');

                        });
                    }
                  });
              }



              else
                res.redirect('/teachers/assign_form');

            });
        }


        else
          res.redirect('/teachers/assign_form');

      });
  });


router.get('/unassign_form',isLoggedIn, (req, res) => {
    res.render('teachers/unassign', {
      title: "unassign", username: default_username,
      courseid: default_courseid
    });
  });

router.post('/unassign',isLoggedIn, (req, res) => {
    var username = req.body.username;
    var course_code = req.body.courseid;

    teacher.getByUserName(username, (err, doc) => {
        if (err)
          res.send("Some error occured");
        else if (doc) {
          Course.getBycourseid(course_code, (err, doc) => {
              if (err)
                res.send("Some error occured");
              else if (doc) {
                teacher.getBycourseid(username, course_code, (err, doc) => {
                    if (err)
                      res.send("Some error occured");
                    else if (doc) {
                      teacher.unassign(username, course_code, (err, doc) => {
                          if (err)
                            res.send("Some error occured");
                          else if (doc)
                            res.redirect('/admin/home');
                        });
                    }

                    else {
                      res.redirect('/teachers/unassign_form');
                    }

                  });
              }



              else
                res.redirect('/teachers/unassign_form');
            });
        }


        else
          res.redirect('/teachers/unassign_form');
      });
  });



function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='admin')
        {return next();}

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isLoggedInAsteacher(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='teacher')
        {return next();}

    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;
