import React from "react";
import { useEffect, useState } from "react";
import { Globe, Twitter, Mail } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Badge from "./ui/Badge";
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
        src={avatar1}
        alt="Chidera Anichebe"
        className="w-16 h-16 rounded border-4 border-gray-700 object-cover"
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="font-semibold">{name}</p>
          <a
            href={`mailto:${name}`}
            className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <Twitter size={20} /> */}
            <Mail size={20} />
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

// Add Product type based on API response
interface Product {
  id: string;
  name: string;
  description: string;
  alias: string;
  category: string[];
  verified: boolean;
  openSource: boolean;
  isApproved: boolean;
  icon: string;
  gallery: string[];
  playstore: boolean[];
  appstore: boolean[];
  teamMembers: string[];
  website: string;
  explainerVideo: string;
  xAccount: string;
  features: string[];
  techStack: string[];
  launchDate: string;
  userCount: string;
  status: string;
  brandColors: string[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  transactionVolume?: number; // Not in API, but used in UI
}

function ProductPage() {
  const avatars = [avatar1, avatar2, avatar3];
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      fetch(`https://superteamng-products-backend.vercel.app/api/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
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

  // console.log(product.icon)

  if (error || !product) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-[#0A0D14] text-gray-700 dark:text-gray-300">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Product Not Found
        </h1>
        <p className="text-sm md:text-base mb-6 text-gray-500 dark:text-gray-400">
          {error || "The product you're looking for doesn't exist or has been removed."}
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

  // Helper for brand colors fallback
  const brandColor = product.brandColors && product.brandColors.length > 0 ? product.brandColors[0] : "#E2E4E9";
  // console.log(product.brandColors)
  // Helper for gallery image fallback
  const productImage = product.gallery && product.gallery.length > 0 ? product.gallery[0] : "/images/avatar.jpeg";
  const readableLaunchDate = new Date(product.launchDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


  return (
    <section className="flex-1 lg:px-[80px] lg:py-[48px] dark:bg-[#0A0D14] min-h-screen font-regular">
      <Header isHome={false} />

      {/* Product details section */}
      <div className="py-10 text-black dark:text-white px-4 font-regular text-sm sm:text-base md:text-lg leading-relaxed">
        <div className="w-full border border-[#20232d] rounded-xl overflow-hidden mb-8 shadow-sm">
          <div
            className="relative h-[110px] w-full"
            style={{ backgroundColor: brandColor }}
          >
            <img
              src={product.icon}
              alt={product.name}
              className="w-30 h-30 rounded-lg border-white border-4 bg-white shadow-md absolute left-15 -bottom-15"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between p-6 pt-20 gap-6">
            <div>
              <h1 className="text-4xl font-semibold">{product.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.category && product.category.map((cat) => (
                  <Badge key={cat} variant={cat}>{cat}</Badge>
                ))}
              </div>
              {/* <p className="text-sm mt-2 text-gray-500">
                {product.description}
              </p> */}
            </div>

            <div className="flex items-center justify-between md:justify-normal gap-4 w-full md:w-auto">
              {product.teamMembers && product.teamMembers.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {product.teamMembers.map((member, index) => (
                      <Avatar
                        key={index}
                        src={avatars[index % avatars.length]}
                        alt={`Team member ${member}`}
                        className={"bg-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-lg md:text-xl font-semibold">
                    {product.userCount}+
                  </span>
                </div>
              )}

              <a href={product.xAccount} target="_blank">
                <button
                  style={{
                    background: `linear-gradient(to right, ${product.brandColors[0]}, ${product.brandColors[1]})`
                  }}
                  className="text-white cursor-pointer font-regular px-5 md:px-6 py-2.5 md:py-3 rounded-lg flex items-center gap-0 hover:gap-2 hover:shadow-lg transition-all duration-300 text-sm md:text-[14px] group overflow-hidden text-center whitespace-nowrap"
                >
                  Contact us
                </button>
              </a>

            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-10">
          <div className="flex justify-between items-baseline">
            <h2 className="text-4xl font-bold mb-2">About</h2>

            {/* Social links */}
            <div className="flex gap-1 -space-x-4 ml-2">
              {product.xAccount && (
                <a
                  href={product.xAccount}
                  className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={20} />
                </a>
              )}
              {product.website && (
                <a
                  href={product.website.startsWith("http") ? product.website : `https://${product.website}`}
                  className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-green-base transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe size={20} />
                </a>
              )}
            </div>
          </div>
          <p className="text-[#0A0D14] dark:text-white font-regular">
            {product.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 font-bold">
          <div className="text-3xl font-semibold mb-2">
            <h3>Number of monthly active users</h3>
            <p className="text-xl">{product.userCount} active users</p>
          </div>

          <div className="text-3xl font-semibold mb-2">
            <h3>Launch Date</h3>
            <p className="text-xl">
              {product.name} launched {readableLaunchDate}.
            </p>
          </div>
        </div>

        {/* Team Section */}
        {product.teamMembers && product.teamMembers.length > 0 && (
          <div>
            <h2 className="text-4xl font-semibold mb-2 font-size 32pt">Team</h2>

            <div className="space-y-4">
              {product.teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member}
                  twitter={"#"}
                  image={avatars[index % avatars.length]}
                  position={"Team Member"}
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
