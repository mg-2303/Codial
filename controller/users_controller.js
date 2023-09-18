const passport = require('passport');
const User = require('../model/user');

module.exports.profile = function (req, res) {
    // return res.render('<h1>User Profile</h1>');
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id).then((user) => {
            if (user) {
                return res.render('user_profile', {
                    title: 'Codiel | Profile',
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        }).catch((err) => {
            console.log('Error in Finding User');
            return;
        });
    }
    else {
        return res.redirect('/users/sign-in');
    }
}

// render the sign-in Page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Codiel | Sign In'
    });
}

// render the sign-up Page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codiel | Sign Up'
    });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            User.create(req.body).then((user) => {
                return res.redirect('/users/sign-in');
            }).catch((err) => {
                console.log('Error in creating the User');
                return;
            });
        }
    }).catch((err) => {
        console.log('Error in Finding the User');
        return;
    })
}

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroy = function (req, res) {
    req.logout((err) => {
        if (err) {
            // Handle any error that occurs during logout
            return next(err);
        }
    });
    return res.redirect('/');
}