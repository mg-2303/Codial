module.exports.profile = function (req, res) {
    return res.end('<h1>User Profile</h1>')
}

// render the sign-in Page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title:'Codiel | Sign In'
    });
}

// render the sign-up Page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Codiel | Sign Up'
    });
}

module.exports.create = function (req, res) {
    //todo-later
}

module.exports.createSeassion = function (req, res) {
    //todo-later
}