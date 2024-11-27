import express from "express";
import bodyParser from "body-parser";  // If you are using body-parser
import multer from "multer";           // If you're using multer
import { CloudinaryStorage } from "multer-storage-cloudinary"; 
import { v2 as cloudinary } from "cloudinary";
import MissingPerson from "../models/missingReport.mjs"; 
import { getDb } from "../db/conn.mjs";

// Express setup
const app = express();

const router = express.Router();
// Body parser setup with limit
app.use(bodyParser.json({ limit: "50mb" }));  // Limit for JSON body (adjust as necessary)
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Multer configuration for file upload limits
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "mediaFiles", 
        resource_type: "auto", 
        chunk_size: 6000000,  // Limits per file (6MB)
        transformation: [
            { 
                quality: 'auto:low', 
                width: 1280, 
                height: 720, 
                bitrate: '500k' 
            }
        ],
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }  // Limit each file to 10MB (adjust as needed)
});

// Route for file upload and report creation
router.post("/upload-data", upload.fields([{ name: "Image", maxCount: 1 }]), async (req, res) => {
    try {
        const db = getDb().connection;
        let { fullName, age, lastSeenDate, description, contactInfo } = req.body;

        const CurrUser = await db.collection("users").findOne({ username: req.user.username });

        if (!CurrUser) {
            return res.status(400).json({ message: "Unauthorized Access" });
        }

        const requiredFields = [
            { field: fullName, message: "Full Name is required" },
            { field: age, message: "Age is required" },
            { field: lastSeenDate, message: "Last Seen Date is required" },
            { field: description, message: "Description is required" },
            { field: contactInfo, message: "Contact Information is required" }
        ];

        for (const { field, message } of requiredFields) {
            if (!field) {
                return res.status(400).json({ message });
            }
        }

        if (!req.files || !req.files.Image) {
            console.error('No files uploaded');
            return res.status(400).json({ 
                message: "Image is required", 
                details: {
                    filesExist: !!req.files,
                    imageFieldExists: req.files && !!req.files.Image
                }
            });
        }

        const imageFile = req.files.Image[0];
        const imageUrl = imageFile.secure_url || imageFile.path;

        if (!imageUrl) {
            console.error('Image URL could not be determined', imageFile);
            return res.status(400).json({ 
                message: "Image upload failed", 
                fileDetails: JSON.stringify(imageFile)
            });
        }

        const missingPersonData = new MissingPerson({
            media: {
                Image: imageUrl // Store the Cloudinary image URL
            },
            fullName,
            age,
            lastSeenDate,
            description,
            contactInfo,
            createdAt: new Date(),
            reportedBy: CurrUser._id
        });

        const result = await missingPersonData.save();

        res.status(200).json({
            message: "Missing person data uploaded successfully",
            reportId: result._id,
            imageUrl: imageUrl
        });
    } catch (err) {
        console.error('Complete upload error:', err);
        res.status(500).json({ 
            message: "Server error. Try again later.",
            error: err.message 
        });
    }
});


router.get('/missing-persons', async (req, res) => {
    try {
        const db = await getDb();

        const missingPersons = await MissingPerson.find({});

        if (!missingPersons || missingPersons.length === 0) {
            return res.status(404).json({ message: "No data found!" });
        }

        res.status(200).json({
            success: true,
            data: missingPersons,
        });
    } catch (error) {
        console.error('Error fetching missing persons:', error);
        res.status(500).json({ message: 'Server error. Unable to fetch missing persons.' });
    }
});


export default router;
