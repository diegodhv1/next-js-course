import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";


const getSessionUser = async () => {
    const session= await getServerSession(authOptions)
    if (!session) {
        return null;
    }
    return {
        user: session.user,
        userId: session.user.id
    }
}

export default getSessionUser
