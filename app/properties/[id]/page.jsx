import PropertyDetail from "@/components/PropertyDetail";
import PropertyHeaderImage from "@/components/PropertyHeader";
import PropertyImages from "@/components/PropertyImages";
import PropertyContactForm from "@/components/PropertyContactForm";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import { FaArrowLeft } from "react-icons/fa";
import { convertToSerializableObject } from "@/utils/convertToObject";

async function PropertyPage({ params }) {
  const { id } = await params;
  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }
  return (
    <>
      <PropertyHeaderImage image={property.images[0]}></PropertyHeaderImage>
      <section>
        <div className="container m-auto py-6 px-6">
          <a
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </a>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetail property={property}></PropertyDetail>
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images}></PropertyImages>
    </>
  );
}

export default PropertyPage;
