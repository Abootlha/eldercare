import express from "express";
import mongoose from "mongoose";
import { getDb } from "../db/conn.mjs";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();


export default router;