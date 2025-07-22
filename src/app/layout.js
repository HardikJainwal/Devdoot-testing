

import Footer from "./components/Footer";
import "./globals.css";
import Navbar from "@/app/Components/Navbar";



export const metadata = {
  title: "Devdoot",
  description: "Connecting you to medical help fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
