import React from "react";
import PropertyCard from "@/components/PropertyCard";
import Property from "@/models/Property";
import connectDB from "@/config/database";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams }) => {
  const { page = 1, pageSize = 2 } = await searchParams;
  await connectDB();
  const skip = (page - 1) * pageSize;

  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6"></div>
      {properties.length === 0 ? (
        <p>no properties found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
      {showPagination && (
        <Pagination
          page={parseInt(page)}
          pageSize={parseInt(pageSize)}
          totalItems={parseInt(total)}
        />
      )}
    </section>
  );
};

export default PropertiesPage;
