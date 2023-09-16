const User = require('../model/user');
module.exports.profile = function (req, res) {
    return res.end('<h1>User Profile</h1>')
}

// render the sign-in Page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Codiel | Sign In'
    });
}

// render the sign-up Page
module.exports.signUp = function (req, res) {
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

module.exports.createSeassion = function (req, res) {
    //todo-later
}