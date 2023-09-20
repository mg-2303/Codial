const Post = require('../model/post');
const Comment = require('../model/comment');

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

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id).then((post) => {
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.deleteOne();
            Comment.deleteMany({ post: req.params.id }).then((comment) => {
                return res.redirect('back');
            }).catch((err) => {
                console.log('Error in deleting comments', err);
                return;
            });
        }
        else {
            return res.redirect('back');
        }
    }).catch((err) => {
        console.log('Error in finding post', err);
        return;
    });
}