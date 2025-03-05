'use server';
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
    await connectDB();
    const sessionUser= await getSessionUser()
    
    if (!sessionUser ||  !sessionUser.userId) {
        throw new Error("UserId is required");
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId);
    
    if (!property) {
        throw new Error("Property not found");
    }
    
    if (property.owner.toString() !== userId) {
        throw new Error("User not authorized.");
    }

     // extract image url
     const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split("/")
        return parts.at(-1).split(".").at(0);
    })

    if (publicIds.length > 0) {
        for (let publicID of publicIds) {
           await cloudinary.uploader.destroy('propertypulse'+ publicID);
        }
    }

    await property.deleteOne()
    revalidatePath("/", "layout")


}

export default deleteProperty;