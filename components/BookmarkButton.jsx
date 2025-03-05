"use client";
import bookMarkProperty from "@/app/actions/bookmarkProperty";
import checkBookMarkStatus from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmark, setIsBookmark] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(true);
      return;
    }
    checkBookMarkStatus(property._id).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.isBookMarked) setIsBookmark(true);
      setLoading(false);
    });
  }, [property._id, userId, checkBookMarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed to bookmark a listing");
    }
    bookMarkProperty(property).then((res) => {
      if (res.error) return toast.error(res.error);
      setIsBookmark(true);
      toast.success(res.message);
    });
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return isBookmark ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className=" mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className=" mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
