// app/layout.js
import Footer from "./components/Footer";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import ChatFidget from "./components/ChatFidget";
import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import AppDownloadPopup from "./components/DownloadAppPopUp";

export const metadata = {
  title: "Devdoot",
  description: "Connecting you to medical help fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ModalProvider>
          <NavbarWrapper />
          <main className="min-h-screen">{children}</main>
          <AppDownloadPopup/>
          <Footer />
          <ChatFidget />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
