import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ExpandableNavigationBar from "./components/HeroFilter";
import ProductCard from "./components/ProductCard";
import ProductCardDisplay from "./components/ProductCardDisplay";
import Button from "./components/ui/Button";
import { ThemeProvider } from "./lib/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <section className="flex-1 lg:px-[80px] lg:py-[48px] dark:bg-[#0A0D14]">
        <Header />
        <Hero />
        <ProductCardDisplay />
        <Footer />
      </section>
    </ThemeProvider>
  );
}

export default App;
