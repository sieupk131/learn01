const express = require('express')
const router = express.Router()
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    if (!title)
        return res.status(400).json({ success: false, message: 'Title is required' })
    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        })
        await newPost.save()
        return res.json({ success: true, message: 'Welcome to Learn02', post: newPost })

    } catch (error) {
        res.status(500).json({ success: false, message: `Internal server error ${error}` })
    }
})
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    let updatedPost = {
        title,
        description,
        url: (url.startsWith('https://')) ? url : `https://${url}`,
        status: status || 'TO LEARN',
    }
    if (!title)
        return res.status(400).json({ success: false, message: 'Title is required' })
    try {
        const newPost = new Post({
            title,
            description: description || '',
            url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
            user: req.userId,
        })
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true })
        if (!updatedPost)
            return res.status(401).json({ success: false, message: 'Post not found or user authorized' })
        return res.json({ success: true, message: 'Update success', post: updatedPost })
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal server error ${error}` })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)
        if (!deletedPost)
            return res.status(401).json({ success: false, message: 'Post not found or user not authorized' })
        res.json({ success: true, post: deletedPost })

    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error ${error}` })
    }
})
module.exports = router