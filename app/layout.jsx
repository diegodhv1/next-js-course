import "@/assets/styles/globals.css";
export const metadata = {
  title: "Property app",
  keyword: "Rental, property, real state",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
