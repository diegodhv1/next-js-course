// export the api to be used in another application/project
import Property from "@/models/Property";
import connectDB from "@/config/database";

export const GET = async () => {
  await connectDB();

  const properties = await Property.find({}).lean();

  try {
    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
};
