module.exports.profile = function (req, res) {
    res.end('<h1>User Profile</h1>')
}

// render the sign up page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Codial|Sign In'
    });
}

// render the sign in page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Codial | Sign Up'
    });
}
