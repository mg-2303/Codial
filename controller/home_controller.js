const Post = require('../model/post');

module.exports.home = function (req, res) {
    console.log(req.cookies);
    Post.find({}).populate('user').populate({
        path: 'comment',
        populate: {
            path: 'user'
        }
    }).then((posts) => {
        return res.render('home', {
            title: 'Home',
            posts: posts
        });
    }).catch((err) => {
        console.log('Error in finding the post');
        return;
    });
}