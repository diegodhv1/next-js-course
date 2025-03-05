'use server';

import connectDB from "@/config/database";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookMarkProperty(property) {        
    await connectDB();

    const sessionUser= await getSessionUser();

    if (!sessionUser || !sessionUser.userId) 
        throw new Error("User ID is required");

    const user= await User.findById(sessionUser.userId);

    let isBookmarked = user.bookmarks.includes(property._id);
    let message;

    if (isBookmarked) {
        user.bookmarks.pull(property._id);
        message= "Bookmark Removed";
        isBookmarked= false
    } else {
        user.bookmarks.push(property._id);
        message= "Bookmark Saved";
        isBookmarked= true
    }

    await user.save();
    revalidatePath('/properties/saved', 'page');

    return (
        {message,
        isBookmarked}
    )
}

export default bookMarkProperty;