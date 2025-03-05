import React from "react";
import InfoBox from "./infoBox";

export const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            buttonInfo={{
              link: "/properties",
              text: "Browse Properties",
              backGroundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            backGroundColor="bg-blue-100"
            heading="For Properties Owners"
            buttonInfo={{
              link: "/properties/add",
              text: "Add Properties",
              backGroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
