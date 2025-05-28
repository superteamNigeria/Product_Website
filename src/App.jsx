import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ExpandableNavigationBar from "./components/HeroFilter";
import ProductCard from "./components/ProductCard";
import ProductCardDisplay from "./components/ProductCardDisplay";
import Button from "./components/ui/Button";

function App() {
  return (
    <section className="flex-1 lg:px-[80px] lg:py-[48px] dark:bg-[#0A0D14] bg-white dark:text-white">
      <Header />
      <Hero />
      <ProductCardDisplay />
      <Footer />
    </section>
  );
}

export default App
