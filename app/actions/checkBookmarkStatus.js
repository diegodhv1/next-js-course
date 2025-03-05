'use server';

import connectDB from "@/config/database";
import User from "@/models/Users";
import getSessionUser from "@/utils/getSessionUser";

async function checkBookMarkStatus(propertyId) {        
    await connectDB();

    const sessionUser= await getSessionUser();

    if (!sessionUser || !sessionUser.userId) 
        throw new Error("User ID is required");

    const user= await User.findById(sessionUser.userId);

    let isBookMarked = user.bookmarks.includes(propertyId);

    return {isBookMarked}
}

export default checkBookMarkStatus;