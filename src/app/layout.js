// app/layout.js
import Footer from "./components/Footer";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import ChatFidget from "./components/ChatFidget";

export const metadata = {
  title: "Devdoot",
  description: "Connecting you to medical help fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatFidget />
      </body>
    </html>
  );
}