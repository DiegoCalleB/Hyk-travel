import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "60vh", paddingTop: "80px", background: "var(--cream)" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
