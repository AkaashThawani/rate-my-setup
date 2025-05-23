// src/app/actions.ts
"use server"; // Directive indicating Server Actions in this file

import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";
// Optional: Import your Prisma singleton instance if you created one
// import { prisma } from '@/lib/prisma';

// Initialize Prisma (or use singleton)
const prisma = new PrismaClient(); // Replace with import if using singleton

// Configure Cloudinary (reads from .env automatically if keys are set)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
});

// Define the action function
export async function submitSetupAction(formData: FormData) {
    // ---- Step 1: Extract data from FormData ----
    const imageFile = formData.get("image") as File | null; // Matches name="imageFile" in form
    const description = formData.get("description") as string; // Matches name="description"
    const ratingString = formData.get("rating") as string | null; // Matches name="rating"

    // ---- Step 2: Validate the data ----
    if (!imageFile || imageFile.size === 0) {
        return { success: false, message: "Image file is required." };
    }
    if (!ratingString) {
        return { success: false, message: "Rating is required." };
    }
    const rating = parseInt(ratingString, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
        return { success: false, message: "Invalid rating value (must be 1-5)." };
    }
    // Add other validation as needed (file type, size limits?)

    let imageUrl = ''; // Variable to store Cloudinary URL

    // ---- Step 3: Upload Image to Cloudinary ----
    try {
        console.log("Attempting image upload to Cloudinary...");
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => { // You can add upload options here
                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    reject(error);
                    return;
                }
                resolve(result);
            }).end(buffer);
        });

        if (!uploadResult || !uploadResult.secure_url) {
            throw new Error("Cloudinary upload failed to return a secure URL.");
        }
        imageUrl = uploadResult.secure_url;
        console.log("Image uploaded successfully:", imageUrl);

    } catch (error) {
        console.error("Error during Cloudinary upload:", error);
        return { success: false, message: `Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }

    // ---- Step 4: Save data to Database using Prisma ----
    try {
        console.log("Attempting to save setup to database...");
        const newSetup = await prisma.setup.create({
            data: {
                title: "Default Title",
                imageUrl: imageUrl, // The URL from Cloudinary
                description: description, // The description from the form
                ratingSum: rating,    // Store the first rating in the sum
                ratingCount: 1,       // Mark that one rating has been given
            },
        });
        console.log("Setup saved successfully:", newSetup.id);

        // ---- Step 5: Revalidate Cache ----
        revalidatePath("/"); // Tell Next.js to refresh the data for the gallery page ('/')
        console.log("Revalidated path /");

        // ---- Step 6: Return Success ----
        return { success: true, message: "Setup submitted successfully!", setupId: newSetup.id };

    } catch (error) {
        console.error("Error during database save:", error);
        return { success: false, message: `Database error: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
}