'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import getSessionUser from "@/utils/getSessionUser";


async function addMessage(prevState, formData) {
    await connectDB();
    const sessionUser= await getSessionUser();
    console.log(formData, prevState);

    if (!sessionUser || !sessionUser.userId) {
        throw new Error("Session id is required.");
    }

    const {userId} = sessionUser;
    
    const recipient= formData.get('recipient');

    if (userId === recipient) {
        return {error: "you can not send the message to yourself"} 
    }


    const messageData = {
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('body'),
    }    

    const newMessage= new Message(messageData);
    await newMessage.save();

    return {submitted: true}
    
}

export default addMessage;