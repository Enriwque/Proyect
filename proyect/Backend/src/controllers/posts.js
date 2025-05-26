import { wikiPosts } from "../models/Posts.js";
import { PostEntry } from "../services/index.js";
import { WikiUsers } from "../services/index.js";
import { localUpload } from "../services/cloud.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

async function fetchPosts(req, res) {
    res.send(await wikiPosts());
};

async function fetchPost(req, res) {
    const post = await PostEntry.find({ id: req.params.id });
    res.send(post);
}

async function createPost(req, res) {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await WikiUsers.findOne({ id: decoded.userId });

    if (!user) {
        return res.status(400).send('You need to be logged in to post');
    }

    const newPost = {
        text: req.body.text,
        images: req.body.images,
        user: user.name,
        id: await PostEntry.countDocuments() + 1
    }

    newPost.images = await localUpload(newPost.images);
    const post = new PostEntry(newPost);
    await post.save();
    res.status(201).send(post);
}

async function deletePost(req, res) {
    const { token, id } = req.params;
    const post = await PostEntry.findOne({ id: id });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await WikiUsers.findOne({ id: decoded.userId });

    if (!user) {
        return res.status(400).send('You need to be logged in to post');
    }

    if (user.name !== post.user) {
        return res.status(403).send('You can only delete your own posts');
    }else{
        await PostEntry.deleteOne({ id: id });
        res.status(204).send(`post ${id} deleted`);
    }
}

async function commentOnPost(req, res) {
    const { token, id } = req.params;
    const post = await PostEntry.findOne({ id: id });

    if (!post) {
        return res.status(404).send('Post not found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await WikiUsers.findOne({ id: decoded.userId });

    if (!user) {
        return res.status(400).send('You need to be logged in to comment');
    }

    const newComment = {
        user: user.name,
        text: req.body.text
    };

    if (!post.comments) {
        post.comments = [];
    }

    post.comments.push(newComment);
    await post.save();
    res.status(201).send(post);
}

export { fetchPosts, fetchPost, commentOnPost, createPost, deletePost };