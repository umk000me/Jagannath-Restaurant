import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import SpecialsSection from "@/components/SpecialsSection";
import ReviewsSection from "@/components/ReviewsSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";

export default function HomePage() {
  useEffect(() => {
    document.title = "Jai Jagannath Restaurant - Authentic Indian Cuisine | Nashik";
  }, []);

  return (
    <div className="relative bg-background text-foreground">
      <FloatingParticles />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SpecialsSection />
      <MenuSection />
      <ReviewsSection />
      <GallerySection />
      <LocationSection />
      <Footer />
    </div>
  );
}
