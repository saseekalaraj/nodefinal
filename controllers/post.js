const Post = require('../models/Post')
exports.getPosts = (req, res) => {
    res.json({
        posts: [
            { title: 'First Posts' },
            { title: 'Secound Posts' },

        ]
    });
};

exports.createPosts = (req, res) => {
    const user = new Post(req.body)
    //console.log("CREATING POST :", req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            post: result
        })
    })

}