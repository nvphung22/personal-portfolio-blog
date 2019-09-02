const Blog = require('../models/blog');
var AsyncLock = require('async-lock');
var lock = new AsyncLock();

exports.getBlogs = (req, res) => {
    Blog.find()
        .sort({ 'startDate': -1 })
        .exec((err, allBlogs) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(allBlogs);
        })
}

// exports.getBlogById = (req, res) => {
//     const blogId = req.params.id;
//     Blog.findById(blogId, (err, blog) => {
//         if (err) {
//             return res.status(422).send(err);
//         }
//         return res.json(blog);
//     })
// }

exports.getBlogById = (req, res) => {
    const blogId = req.params.id;
    Blog.findById(blogId)
        .select('-__v')
        .exec((err, blog) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(blog);
        });
}

exports.createBlog = (req, res) => {
    const { lockKey } = req.query;
    if (!lock.isBusy(lockKey)) {
        lock.acquire(lockKey, function (done) {
            const blogData = req.body;
            const blog = new Blog(blogData);
            blog.userId = req.user && req.user.sub;
            blog.author = req.user && req.user.name;
            blog.save((err, createdBlog) => {
                // setTimeout(() => done(), 5000);
                if (err) {
                    return res.status(422).send(err);
                }
                return res.json(createdBlog);
            })
        }, function (err, ret) {
            err && console.error(err)
        });
    } else {
        return res.status(422).send({ message: 'Blog is getting saved!' })
    }
}

exports.updateBlog = (req, res) => {
    const blogId = req.params.id;
    const blogData = req.body;
    console.log(blogId)
    console.log(blogData)
    Blog.findById(blogId, (err, foundBlog) => {
        if (err) {
            res.status(422).send(err);
        }

        foundBlog.set(blogData);
        foundBlog.save((err, savedBlog) => {
            if (err) {
                return res.status(422).send(err);
            }
            return res.json(savedBlog);
        })
    })
}

exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;
    Blog.deleteOne({ _id: blogId }, (err, deletedBlog) => {
        if (err) {
            res.status(422).send(err);
        }

        return res.json({
            status: 'DELETED'
        });
    })
}