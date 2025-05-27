import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ExpandableNavigationBar from "./components/HeroFilter";
import ProductCard from "./components/ProductCard";
import ProductCardDisplay from "./components/ProductCardDisplay";
import Button from "./components/ui/Button";

function App() {
  return (
    <section className="flex-1 px-[80px] py-[48px]">
    <Header/>
    <Hero/>
    <ProductCardDisplay/>
    <Footer />
    </section>
  );
}

export default App
