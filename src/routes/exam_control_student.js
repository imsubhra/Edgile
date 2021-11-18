const express = require('express');
  const router = express.Router();
  const Exam = require('../models/exam');
  const Course = require('../models/student');
  const teacher = require('../models/teacher');

router.get('/new', isLoggedInAsteacher, (req, res) => {
    var default_exam = {
      exam_name: "Exam Name",
      exam_code: "Exam Code",
      duration_hours: 1,
      duration_minutes: 0,
      course_code: "Course Code",
      teacher_username: "teacher User Name"
    };
    res.render('exams/new', { title: 'Make New Exam', exam: default_exam });
  });


router.post('/create', isLoggedInAsteacher, (req, res) => {
    var exam = {
      exam_name: req.body.exam_name,
      exam_code: req.body.exam_code,
      duration_hours: req.body.duration_hours,
      duration_minutes: req.body.duration_minutes,
      course_code: req.body.course_code,
      teacher_username: req.user.username
    };
    var exam_code = req.body.exam_code;
    var course_code = req.body.course_code;
    var teacher_username = req.user.username;
    Exam.getByExamCode(exam_code, function (err, doc) {
      if (err)
        res.send("Some error occured");
      else if (doc) { res.redirect('/make_exam/new'); }

      else {
        teacher.getBycourseid(teacher_username, course_code, function (err, doc) {
          if (err)
            res.send("Some error occured");
          else if (doc) {
            Exam.create(exam, (err, doc) => {
                if (err)
                  res.send("Some error occured");
                else if (doc) { res.render('exams/question_list', { exam: exam }); };

              });
          }

          else { res.redirect('/make_exam/new'); }
        });
      }

    });
  });

router.get('/question_list', isLoggedInAsteacher, (req, res) => {
    Exam.getByExamCode(req.body.exam_code, (err, docs) => {
        if (err)
          res.send("some error occured");


        else
          res.render('exams/question_list', { exam: docs });
      });
  });

router.get('/add_question', isLoggedInAsteacher, (req, res) => {
    var exam_code = req.body.exam_code;
    var default_question_full = {
      question: "Question",
      optionA: "option A",
      optionB: "option B",
      optionC: "option C",
      optionD: "option D",
      key: "Key"
    };
    res.render('exams/new_question', {
      title: 'Add New Question', question_full: default_question_full,
      exam_code: exam_code
    });
  });

router.post('/add_question', isLoggedInAsteacher, (req, res) => {
    var exam_code = req.body.exam_code;
    var default_question_full = {
      question: "Question",
      optionA: "option A",
      optionB: "option B",
      optionC: "option C",
      optionD: "option D",
      key: "Key"
    };
    res.render('exams/new_question', {
      title: 'Add New Question', question_full: default_question_full,
      exam_code: exam_code
    });
  });




router.post('/create_question', isLoggedInAsteacher, (req, res) => {

    var question_full = {
      question: req.body.question,
      optionA: req.body.optionA,
      optionB: req.body.optionB,
      optionC: req.body.optionC,
      optionD: req.body.optionD,
      key: req.body.key
    };

    var exam_code = req.body.exam_code;

    Exam.addQuestion(exam_code, question_full, (err, docs) => {
        if (err)
          res.send("some error occured");

        else {
          Exam.getByExamCode(exam_code, (err, docs) => {
              if (err)
                res.send("some error occured");



              else
                res.render('exams/question_list', { exam: docs });
            });
        }
      });
  });


router.get('/submit', isLoggedInAsteacher, (req, res) => {
    res.send("exam successfully created");
  });

router.get('/list', isLoggedInAsteacher, (req, res) => {
    Exam.getByExamCode(req.query.exam_code, (err, docs) => {
        if (err)
          res.send("some error occured");


        else
          res.json(docs);
      });
  });




function isLoggedInAsteacher(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()&&req.user.usertype=='teacher')
        {return next();}

    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;
