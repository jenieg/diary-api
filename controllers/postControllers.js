import mongoose from 'mongoose';
import Post from '../models/Post.js';

//GET ALL POSTS
export const getAllPosts = async (req, res) => {
    try {
        //get all posts and sort in desc order
        const posts = await Post.find({}).sort({createdAt: -1})
        //send all posts with 200 status
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({error: err.message})
    }
};

//GET SINGLE POST BY ID
export const getPost = async (req, res) => {
    const { id } = req.params;

    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ error: 'post does not exist'});

    try {
        //find post by id
        const post = await Post.findById(id);
        //send post with 200 status
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: 'An error occured while fetching the post.'})
    }
};

//CREATE NEW POST
export const createPost = async (req, res) => {
    const { date, title, content } = req.body;
    
    try {
        //create new post with the date, title, and content from form body
        const post = await Post.create ({ date, title, content });
        //send post with 200 status
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

//DELETE POST BY ID
export const deletePost = async (req, res) => {
    const { id } = req.params;

    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ error: 'post does not exist' });

    try {
        //find by id and delete
        const deletedPost = await Post.findByIdAndDelete(id);
        //if successful send 200 status
        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//UPDATE POST BY ID
export const updatePost = async (req, res) => {
    const { id } = req.params;

    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ error: 'post does not exist' });

    try {
        //find by id and update 
        const updatedPost = await Post.findOneAndUpdate( {_id: id }, { ...req.body });
        //if successful send 200 status
        res.status(200).json(updatedPost);;
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};