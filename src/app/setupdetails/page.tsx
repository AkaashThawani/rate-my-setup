"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Redo, Trash, Upload } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { submitSetupAction } from "../actions";

export default function SetupDetails() {
      console.log("--- SetupDetails Component Rendered/Remounted ---"); // <-- ADD THIS
    const FormRef = useRef<HTMLFormElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionMessage, setActionMessage] = useState<string>("");

    const handleFormSubmit = async (formData: FormData) => { // formData, not FormData
        setIsSubmitting(true);
        setActionMessage(""); // Clear previous messages
        console.log("Submitting form...");

        // --- ADD THESE LOGS ---
        console.log("CLIENT: fileInputRef.current?.value before submit:", fileInputRef.current?.value);
        console.log("CLIENT: fileInputRef.current?.files before submit:", fileInputRef.current?.files);
        const fileFromRef = fileInputRef.current?.files ? fileInputRef.current.files[0] : null;
        console.log("CLIENT: file from Ref:", fileFromRef);
        console.log("CLIENT: file size from Ref:", fileFromRef?.size);

        // Log FormData object again just in case
        console.log("CLIENT: formDataFromEvent.get('image') before action call:", formData.get("image"));
        // --- END OF ADDED LOGS ---

        try { // Add try...catch for the await
            const result = await submitSetupAction(formData); // <-- Use await

            // ---- Add this result handling back ----
            if (result.success) {
                setActionMessage("Success! Your setup details submitted.");
                FormRef.current?.reset(); // Reset form fields on success
                handleImageDelete(); // Clear image state/preview
            } else {
                setActionMessage(`Error: ${result.message}`); // Show error message
            }
            // ---------------------------------------

        } catch (error) {
            // Catch potential errors if the action itself throws unexpectedly
            console.error("Form submission error:", error);
            setActionMessage("An unexpected error occurred during submission.");
        } finally {
            setIsSubmitting(false); // <-- Ensure this runs whether success or error
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = () => {
        fileInputRef.current?.click();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleImageConfirmation = () => {
        // console.log("Image confirmed:", image);
        // setImage(image);
    }

    const handleImageDelete = () => {
        // setImage(null);
        // setImagePreview(null);
        // if (fileInputRef.current) {
        //     fileInputRef.current.value = ""; // Clear the file input value
        // }
    }

    const handleImageReupload = () => {
        // handleImageDelete();
        // handleImageUpload();
    }



    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-4">
            <div className="flex flex-col items-center mb-4 h-1/5">
                <h1 className="text-3xl font-bold mb-4">Setup Details</h1>
                <p className="text-lg mb-2">Here you can view your setup.</p>
            </div>
            <form ref={FormRef} action={handleFormSubmit} className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-row flex-nowrap gap-2 items-stretch justify-between w-full h-4/5">
                    <div className="w-1/2 flex-1" id="imageupload">
                        <div className="flex flex-col flex-1 justify-center bg-white shadow-md rounded-lg p-6 w-full h-full ">
                            <Input id="image" name="image" type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageChange} />
                            {imagePreview ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="h-full w-full flex justify-center">
                                        <img
                                            src={imagePreview}
                                            alt="Image Preview"
                                            className="max-h-full max-w-full object-cover"
                                        />
                                    </div>

                                    <div className="text-black mt-2 flex flex-row justify-around w-full gap-2">
                                        <Button type="button" onClick={handleImageConfirmation} variant="default" size="icon">
                                            <Check />
                                        </Button>
                                        <Button type="button" onClick={handleImageReupload} variant="secondary" size="icon">
                                            <Redo />
                                        </Button>
                                        <Button type="button" onClick={handleImageDelete} variant="destructive" size="icon">
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4 mb-2 flex flex-col justify-center items-stretch h-full text-center bg-gray-100 text-black py-2 px-4 rounded transition duration-300 cursor-pointer hover:bg-gray-200" onClick={handleImageUpload}>
                                    <div className="flex flex-col text-center justify-center items-center flex-1"> <Upload size={64} /></div>
                                    <label htmlFor="image" className="mb-2 justify-center">Upload Your Setup Image Here !!</label>

                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 w-1/2 text-black gap-4 flex flex-col flex-1">
                        <div className="">
                            <Label htmlFor="rating" className="text-black mb-2">Rating (1-5)</Label>
                            <Input id="rating" name="rating" type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} required disabled={isSubmitting} />
                        </div>
                        <div className="flex flex-col flex-nowrap items-stretch justify-center w-full h-7/8 flex-1">
                            <Label htmlFor="description" className="text-black mb-2">Description</Label>
                            <Textarea id="description" className="flex-1 resize-none" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required disabled={isSubmitting} />

                            <Button variant="default" className="mt-4 mb-2 bg-black text-white py-2 px-4 rounded cursor-pointer transition duration-300" disabled={isSubmitting} type="submit">
                                {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Submit"}
                            </Button>
                        </div>
                        {actionMessage && (
                            <p className={`mt-4 text-sm ${actionMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                                {actionMessage}
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}


