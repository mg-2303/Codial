const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = function (req, res) {
    Post.findById(req.body.post).then((post) => {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then((comment) => {
                post.comment.push(comment);
                post.save();
                return res.redirect('back');
            }).catch((err) => {
                console.log('Error in createing comment');
                return;
            });
        }
    }).catch((err) => {
        console.log('Can not find the post');
        return;
    });
}