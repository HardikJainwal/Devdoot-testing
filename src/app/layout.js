// app/layout.js
import Footer from "./components/Footer";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import ChatFidget from "./components/ChatFidget";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Devdoot",
  description: "Connecting you to medical help fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <NavbarWrapper />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatFidget />
        </AuthProvider>
      </body>
    </html>
  );
}