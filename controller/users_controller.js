const passport = require('passport');
const User = require('../model/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    // return res.render('<h1>User Profile</h1>');
    // if (req.cookies.user_id) {
    //     User.findById(req.cookies.user_id).then((user) => {
    //         if (user) {
    //             return res.render('user_profile', {
    //                 title: 'Codiel | Profile',
    //                 user: user
    //             });
    //         }
    //         return res.redirect('/users/sign-in');
    //     }).catch((err) => {
    //         console.log('Error in Finding User');
    //         return;
    //     });
    // }
    // else {
    //     return res.redirect('/users/sign-in');
    // }

    User.findById(req.params.id).then((user) => {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    }).catch((err) => {
        console.log('Error in findind the user', err);
        return;
    });
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
    req.flash('success', 'Logged in Succesfully');
    return res.redirect('/');
}

module.exports.destroy = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Signed Out Succesfully');
        return res.redirect('/');
    });
}

module.exports.update = async function (req, res) {
    // if (req.user._id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body).then((user) => {
    //         return res.redirect('back');
    //     }).catch((err) => {
    //         console.log('Error in Updating the user', err);
    //         return;
    //     });
    // }
    // else {
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user._id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('Multer Error', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    console.log(req.file);
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname + '..' + user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch (err) {
            console.log('Error ', err);
            return res.redirect('back');
        }
    }
    else {
        return res.status(401).send('Unauthorized');
    }
}