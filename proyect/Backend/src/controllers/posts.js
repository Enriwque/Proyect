import { wikiPosts } from "../models/Posts.js";
import { PostEntry } from "../services/index.js";
import { WikiUsers } from "../services/index.js";
import { uploadFromBuffer } from '../services/cloud.js';
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
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await WikiUsers.findOne({ id: decoded.userId });

    if (!user) {
      return res.status(400).send('You need to be logged in to post');
    }

    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadFromBuffer(req.file.buffer); // ¡aquí lo usas!
    }

    const newPost = {
      text: req.body.text,
      images: imageUrl ? [imageUrl] : [],
      user: user.name,
      id: await PostEntry.countDocuments() + 1
    };

    const post = new PostEntry(newPost);
    await post.save();

    res.status(201).send(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error al crear el post');
  }
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