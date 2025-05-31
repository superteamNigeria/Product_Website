import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCardDisplay from "../components/ProductCardDisplay";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <section className="flex-1 lg:px-[80px] lg:py-[48px] dark:bg-[#0A0D14] min-h-screen">
      <Header />
      <Hero />
      <ProductCardDisplay />
      <Footer />
    </section>
  );
};

export default HomePage;
