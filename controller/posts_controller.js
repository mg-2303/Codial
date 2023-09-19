const Post = require('../model/post');
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then((user) => {
        return res.redirect('back');
    }).catch((err) => {
        if (err) {
            console.log('Error in createing post');
            return;
        }
    });
}