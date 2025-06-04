import { useEffect, useState } from "react";
import { Globe, Twitter } from "lucide-react";
import { useParams } from "react-router-dom";
import data from "../data/products.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Badge from "../components/ui/Badge";
import { avatar1, avatar2, avatar3 } from "../constants/images";
import Loading from "../components/Loading";

const Avatar = ({ src, alt, className = "" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-[3px] border-white ${className}`}
    />
  );
};

const TeamMember = ({ name, twitter, image, position }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        // TODO: Replace static image with the image prop
        src={"/images/avatar.jpeg"}
        alt="Chidera Anichebe"
        className="w-16 h-16 rounded border-4 border-gray-700 object-cover"
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="font-semibold">{name}</p>
          <a
            href={twitter}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={20} />
          </a>
        </div>

        <p className="text-sm">{position}</p>
      </div>
    </div>
  );
};

function formatVolume(volume) {
  const num = Number(volume);
  if (isNaN(num)) return volume;

  if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num}`;
}

function ProductPage() {
  const avatars = [avatar1, avatar2, avatar3];
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: Replace this local data lookup with an API call.
  // This useEffect currently fetches the product details from a static JSON file (../data/products.json).
  // To make the app dynamic and production-ready, update this block to fetch data from the backend API
  // using the `id` from the route params (e.g., via fetch or axios), and then set the response to `setProduct`.
  useEffect(() => {
    if (id) {
      const foundProduct = data.find((item) => item.id === id);
      console.log(foundProduct);

      setProduct(foundProduct);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!product) return;

    document.title = `${product.name} | SuperteamNG`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", product.description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = product.description;
      document.head.appendChild(meta);
    }
  }, [product]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-[#0A0D14] text-gray-700 dark:text-gray-300">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Product Not Found
        </h1>
        <p className="text-sm md:text-base mb-6 text-gray-500 dark:text-gray-400">
          The product you're looking for doesn’t exist or has been removed.
        </p>
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-[#223FD3] to-[#DC97EF] text-white font-medium px-6 py-3 rounded-full text-sm md:text-base hover:shadow-md transition-all duration-300"
        >
          Return Home
        </a>
      </section>
    );
  }

  return (
    <section className="flex-1 lg:px-[80px] lg:py-[48px] p-4 dark:bg-[#0A0D14] min-h-screen font-regular">
      <Header isHome={false} />

      {/* Product details section */}
      <div className="py-10 text-black dark:text-white font-regular text-sm sm:text-base md:text-lg leading-relaxed">
        <div className="w-full border border-[#E2E4E9] rounded-xl overflow-hidden mb-8 shadow-sm">
          <div
            className="relative h-[110px] w-full"
            style={{ backgroundColor: product.colors[0] }}
          >
            <img
              // TODO: Replace with product image link from database
              src={`/images/avatar.jpeg`}
              alt={product.name}
              className="w-30 h-30 rounded-lg border-4 border-white shadow-md absolute left-15 -bottom-15"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between p-6 pt-20 gap-6">
            <div>
              <h1 className="text-4xl font-semibold">{product.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.category && (
                  <Badge variant={product.category}>{product.category}</Badge>
                )}
                {product.features &&
                  product.features.map((feature) => (
                    <Badge key={feature} variant={feature}>
                      {feature}
                    </Badge>
                  ))}
                {product.status === "Live" && (
                  <Badge variant="Live">Live</Badge>
                )}
              </div>
              <p className="text-sm mt-2 text-gray-500">
                Collect stablecoin payments in your DMs
              </p>
            </div>

            <div className="flex items-center justify-between md:justify-normal gap-4 w-full md:w-auto">
              {avatars && avatars.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {avatars.map((avatar, index) => {
                      const bgColors = [
                        "bg-[#00F2FF]",
                        "bg-[#C336F4]",
                        "bg-[#19E6AD]",
                      ];
                      return (
                        <Avatar
                          key={index}
                          src={avatar}
                          alt={`Team member ${index + 1}`}
                          className={bgColors[index] || "bg-gray-300"}
                        />
                      );
                    })}
                  </div>
                  <span className="text-lg md:text-xl font-semibold">
                    {product.userCount}+
                  </span>
                </div>
              )}

              <button className="bg-gradient-to-r from-[#223FD3] to-[#DC97EF] text-white font-regular px-5 md:px-6 py-2.5 md:py-3 rounded-lg flex items-center gap-0 hover:gap-2 hover:shadow-lg transition-all duration-300 text-sm md:text-[14px] group overflow-hidden text-center whitespace-nowrap">
                Contact us
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-10">
          <div className="flex justify-between items-baseline">
            <h2 className="text-4xl font-semibold mb-2">About</h2>

            {/* Social links */}
            <div className="flex gap-1 -space-x-4 ml-2">
              <a
                href={product.xAccount}
                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a
                href={product.website}
                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
          <p className="text-[#0A0D14] dark:text-white font-regular">
            {product.about}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 font-bold">
          <div className="text-3xl font-semibold mb-2">
            <h3>Number of monthly active users</h3>
            <p className="text-xl">{product.userCount}+ active users</p>
          </div>
          <div className="text-3xl font-semibold mb-2">
            <h3>Transaction Volume</h3>
            <p className="text-xl">
              {formatVolume(product.transactionVolume)} USDC processed since
              launch.
            </p>
          </div>
        </div>

        {/* Team Section */}
        {product.team?.length > 0 && (
          <div>
            <h2 className="text-4xl font-semibold mb-2">Team</h2>

            <div className="space-y-4">
              {product.team.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  twitter={member.twitter}
                  image={member.image}
                  position={member.position}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default ProductPage;
