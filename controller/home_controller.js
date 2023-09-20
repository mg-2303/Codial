const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = function (req, res) {
    console.log(req.cookies);
    Post.find({}).populate('user').populate({

        path: 'comment',
        populate: {
            path: 'user'
        }
    }).then((posts) => {
        User.find({}).then((user) => {
            return res.render('home', {
                title: 'Home',
                posts: posts,
                all_users: user
            });
        }).catch((err) => {
            console.log('Error in finding user', err);
            return;
        });

    }).catch((err) => {
        console.log('Error in finding the post');
        return;
    });
}