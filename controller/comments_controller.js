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
                req.flash('success', 'Comment added');
                return res.redirect('back');
            }).catch((err) => {
                req.flash('error', err);
                console.log('Error in createing comment');
                return;
            });
        }
    }).catch((err) => {
        req.flash('error', err);
        console.log('Can not find the post');
        return;
    });
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id).then((comment) => {
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }).then((post) => {
                req.flash('success', 'Comment deleted');
                return res.redirect('back');
            }).catch((err) => {
                req.flash('error', err);
                console.log('Error in Updating Post', err);
                return;
            });
        }
        else {
            return res.redirect('back');
        }
    }).catch((err) => {
        req.flash('error', err);
        console.log('Error in finding comment', err);
        return;
    });

}







