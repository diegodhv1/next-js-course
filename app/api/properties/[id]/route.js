// export the api to be used in another application/project
import Property from "@/models/Property";
import connectDB from "@/config/database";

export const GET = async (request, {params}) => {
  await connectDB();

  const property = await Property.findById(params.id).lean();

  if (!property) 
     return new Response(JSON.stringify({message: 'property not found'}), {
        status: 404,
      });

  try {
    return new Response(JSON.stringify({ property }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
};
