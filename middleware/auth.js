var LocalStrategy = require('passport-local').Strategy;

var AdminUser = require('../models/admin.js');
var StudentUser = require('../models/student.js');
var teacherUser = require('../models/teacher.js');

module.exports = function(passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser(function (user, done) {
        done(null, JSON.parse(user));
    });

    passport.use('local-login-admin', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        AdminUser.findByUserName(username, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));        
            if (user.password!=password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            user.usertype='admin';
            return done(null, user);
        });

    }));
    
    passport.use('local-login-student', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        StudentUser.findByUserName(username, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));        
            if (user.password!=password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            user.usertype='student';
            return done(null, user);
        });

    }));
    
    passport.use('local-login-teacher', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        teacherUser.findByUserName(username, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));        
            if (user.password!=password)
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            user.usertype='teacher';
            return done(null, user);
        });

    }));

};