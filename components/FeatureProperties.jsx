import connectDB from "@/config/database";
import Property from "@/models/Property";
import React from "react";
import FeaturePropertyCard from "./FeaturePropertyCard";

const FeaturedProperties = async () => {
  await connectDB();
  const properties = await Property.find({
    is_featured: true,
  }).lean();
  return properties.length > 0 ? (
    <section className="bg-blue-50 px-4 pt-9 pb-10">
      <div className="container-xl lg:container mx-auto">
        <h2 className="text-3xl front-bold text-blue-5000 mb-6 text-center">
          Featured properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <FeaturePropertyCard property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
