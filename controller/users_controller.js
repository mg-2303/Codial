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
    //step to authenticate 
    // finding the user
    User.findOne({ email: req.body.email }).then((user) => {
        // handle user found
        if (user) {
            if (req.body.password != user.password) {
                // handle password mismatch
                return res.redirect('back');
            }
            else {
                // handle password match / create-session
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            }
        }
        else {
            // handle user not found
            return res.redirect('back');
        }
    }).catch((err) => {
        console.log('Error in Finding the User while signing in'); return;
    });

}