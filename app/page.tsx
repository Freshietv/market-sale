"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  country: string;
  emoji: string;
  badge?: string;
};

const products: Product[] = [
  // FASHION
  { id: 1, name: "Italian Leather Handbag", category: "Fashion", price: 189, country: "Italy", emoji: "👜", badge: "Bestseller" },
  { id: 2, name: "Premium Cotton Shirt", category: "Fashion", price: 85, country: "USA", emoji: "👕" },
  { id: 3, name: "Designer Sunglasses", category: "Fashion", price: 145, country: "France", emoji: "🕶️" },
  { id: 4, name: "Men's Leather Loafers", category: "Fashion", price: 165, country: "Spain", emoji: "👞" },
  { id: 5, name: "Women's Blazer", category: "Fashion", price: 175, country: "Italy", emoji: "🧥" },
  { id: 6, name: "Silk Evening Dress", category: "Fashion", price: 260, country: "France", emoji: "👗" },
  { id: 7, name: "Cashmere Sweater", category: "Fashion", price: 220, country: "Scotland", emoji: "🧶" },
  { id: 8, name: "Premium Denim Jacket", category: "Fashion", price: 135, country: "USA", emoji: "🧥" },
  { id: 9, name: "Leather Belt", category: "Fashion", price: 75, country: "Italy", emoji: "👔" },
  { id: 10, name: "Luxury Wallet", category: "Fashion", price: 110, country: "France", emoji: "👛" },
  { id: 11, name: "Classic Polo Shirt", category: "Fashion", price: 70, country: "USA", emoji: "👕" },
  { id: 12, name: "Women's Ankle Boots", category: "Fashion", price: 195, country: "Italy", emoji: "👢" },
  { id: 13, name: "Men's Oxford Shoes", category: "Fashion", price: 210, country: "England", emoji: "👞" },
  { id: 14, name: "Premium Sneakers", category: "Fashion", price: 155, country: "Germany", emoji: "👟" },
  { id: 15, name: "Linen Summer Dress", category: "Fashion", price: 125, country: "Spain", emoji: "👗" },
  { id: 16, name: "Leather Jacket", category: "Fashion", price: 285, country: "USA", emoji: "🧥" },
  { id: 17, name: "Cashmere Scarf", category: "Fashion", price: 95, country: "Scotland", emoji: "🧣" },
  { id: 18, name: "Designer Backpack", category: "Fashion", price: 180, country: "Italy", emoji: "🎒" },
  { id: 19, name: "Evening Clutch", category: "Fashion", price: 135, country: "France", emoji: "👝" },
  { id: 20, name: "Premium Baseball Cap", category: "Fashion", price: 55, country: "USA", emoji: "🧢" },

  // ELECTRONICS
  { id: 21, name: "Aura Wireless Headphones", category: "Electronics", price: 249, country: "Japan", emoji: "🎧", badge: "Trending" },
  { id: 22, name: "Smartwatch Pro", category: "Electronics", price: 299, country: "USA", emoji: "⌚" },
  { id: 23, name: "Premium Wireless Earbuds", category: "Electronics", price: 159, country: "South Korea", emoji: "🎧" },
  { id: 24, name: "4K Smart Television", category: "Electronics", price: 799, country: "South Korea", emoji: "📺" },
  { id: 25, name: "Professional Laptop", category: "Electronics", price: 1199, country: "USA", emoji: "💻" },
  { id: 26, name: "Premium Tablet", category: "Electronics", price: 599, country: "USA", emoji: "📱" },
  { id: 27, name: "Flagship Smartphone", category: "Electronics", price: 999, country: "South Korea", emoji: "📱" },
  { id: 28, name: "Portable Bluetooth Speaker", category: "Electronics", price: 129, country: "Japan", emoji: "🔊" },
  { id: 29, name: "Digital Camera", category: "Electronics", price: 899, country: "Japan", emoji: "📷" },
  { id: 30, name: "4K Action Camera", category: "Electronics", price: 349, country: "Japan", emoji: "📹" },
  { id: 31, name: "Gaming Console", category: "Electronics", price: 499, country: "Japan", emoji: "🎮" },
  { id: 32, name: "Gaming Headset", category: "Electronics", price: 149, country: "USA", emoji: "🎧" },
  { id: 33, name: "Mechanical Keyboard", category: "Electronics", price: 129, country: "Germany", emoji: "⌨️" },
  { id: 34, name: "Wireless Mouse", category: "Electronics", price: 69, country: "Switzerland", emoji: "🖱️" },
  { id: 35, name: "20,000mAh Power Bank", category: "Electronics", price: 79, country: "China", emoji: "🔋" },
  { id: 36, name: "USB-C Hub", category: "Electronics", price: 59, country: "USA", emoji: "🔌" },
  { id: 37, name: "Smart Home Hub", category: "Electronics", price: 119, country: "USA", emoji: "🏠" },
  { id: 38, name: "Portable Projector", category: "Electronics", price: 399, country: "Japan", emoji: "📽️" },
  { id: 39, name: "Premium E-Reader", category: "Electronics", price: 229, country: "USA", emoji: "📖" },
  { id: 40, name: "Wireless Charging Station", category: "Electronics", price: 89, country: "Germany", emoji: "🔋" },

  // WATCHES
  { id: 41, name: "Classic Chronograph", category: "Watches", price: 420, country: "Switzerland", emoji: "⌚", badge: "Luxury" },
  { id: 42, name: "Automatic Dress Watch", category: "Watches", price: 680, country: "Switzerland", emoji: "⌚" },
  { id: 43, name: "Stainless Steel Watch", category: "Watches", price: 310, country: "Japan", emoji: "⌚" },
  { id: 44, name: "Minimalist Watch", category: "Watches", price: 180, country: "Denmark", emoji: "⌚" },
  { id: 45, name: "Luxury Gold Watch", category: "Watches", price: 1250, country: "Switzerland", emoji: "⌚" },
  { id: 46, name: "Leather Strap Watch", category: "Watches", price: 275, country: "Italy", emoji: "⌚" },
  { id: 47, name: "Professional Diver Watch", category: "Watches", price: 590, country: "Japan", emoji: "⌚" },
  { id: 48, name: "Pilot Watch", category: "Watches", price: 475, country: "Germany", emoji: "⌚" },
  { id: 49, name: "GMT Travel Watch", category: "Watches", price: 720, country: "Switzerland", emoji: "⌚" },
  { id: 50, name: "Skeleton Watch", category: "Watches", price: 890, country: "Switzerland", emoji: "⌚" },
  { id: 51, name: "Premium Smartwatch", category: "Watches", price: 399, country: "USA", emoji: "⌚" },
  { id: 52, name: "Women's Classic Watch", category: "Watches", price: 340, country: "France", emoji: "⌚" },
  { id: 53, name: "Diamond-Style Watch", category: "Watches", price: 650, country: "France", emoji: "⌚" },
  { id: 54, name: "Ceramic Watch", category: "Watches", price: 520, country: "Japan", emoji: "⌚" },
  { id: 55, name: "Titanium Watch", category: "Watches", price: 610, country: "Germany", emoji: "⌚" },
  { id: 56, name: "Moonphase Watch", category: "Watches", price: 950, country: "Switzerland", emoji: "⌚" },
  { id: 57, name: "Racing Chronograph", category: "Watches", price: 560, country: "Italy", emoji: "⌚" },
  { id: 58, name: "Sports Watch", category: "Watches", price: 260, country: "USA", emoji: "⌚" },
  { id: 59, name: "Vintage-Inspired Watch", category: "Watches", price: 375, country: "England", emoji: "⌚" },
  { id: 60, name: "Executive Watch", category: "Watches", price: 740, country: "Switzerland", emoji: "⌚" },

  // BEAUTY
  { id: 61, name: "Scent No. 07 Eau de Parfum", category: "Beauty", price: 120, country: "France", emoji: "🧴" },
  { id: 62, name: "Gentle Facial Cleanser", category: "Beauty", price: 32, country: "South Korea", emoji: "🧴" },
  { id: 63, name: "Hyaluronic Serum", category: "Beauty", price: 45, country: "South Korea", emoji: "🧴" },
  { id: 64, name: "Vitamin C Serum", category: "Beauty", price: 48, country: "USA", emoji: "🧴" },
  { id: 65, name: "Niacinamide Serum", category: "Beauty", price: 39, country: "France", emoji: "🧴" },
  { id: 66, name: "Luxury Moisturizing Cream", category: "Beauty", price: 65, country: "France", emoji: "🧴" },
  { id: 67, name: "Hydrating Facial Toner", category: "Beauty", price: 35, country: "Japan", emoji: "🧴" },
  { id: 68, name: "Premium Body Lotion", category: "Beauty", price: 42, country: "USA", emoji: "🧴" },
  { id: 69, name: "Exfoliating Body Scrub", category: "Beauty", price: 38, country: "Brazil", emoji: "🧴" },
  { id: 70, name: "Silk Hair Conditioner", category: "Beauty", price: 29, country: "Italy", emoji: "🧴" },
  { id: 71, name: "Luxury Shampoo", category: "Beauty", price: 31, country: "France", emoji: "🧴" },
  { id: 72, name: "Nourishing Hair Oil", category: "Beauty", price: 36, country: "India", emoji: "🧴" },
  { id: 73, name: "Premium Beard Oil", category: "Beauty", price: 34, country: "USA", emoji: "🧴" },
  { id: 74, name: "Men's Grooming Kit", category: "Beauty", price: 85, country: "England", emoji: "🧴" },
  { id: 75, name: "Professional Makeup Brush Set", category: "Beauty", price: 55, country: "USA", emoji: "💄" },
  { id: 76, name: "Luxury Lip Gloss", category: "Beauty", price: 28, country: "France", emoji: "💄" },
  { id: 77, name: "Premium Foundation", category: "Beauty", price: 49, country: "USA", emoji: "💄" },
  { id: 78, name: "Perfume Gift Set", category: "Beauty", price: 145, country: "France", emoji: "🎁" },
  { id: 79, name: "Bath & Body Collection", category: "Beauty", price: 75, country: "USA", emoji: "🛁" },
  { id: 80, name: "Luxury Skincare Gift Box", category: "Beauty", price: 110, country: "South Korea", emoji: "🎁" },

  // HOME
  { id: 81, name: "Modern Table Lamp", category: "Home", price: 95, country: "Denmark", emoji: "💡" },
  { id: 82, name: "Decorative Wall Mirror", category: "Home", price: 180, country: "Italy", emoji: "🪞" },
  { id: 83, name: "Luxury Throw Pillow", category: "Home", price: 55, country: "France", emoji: "🛋️" },
  { id: 84, name: "Scented Candle Collection", category: "Home", price: 65, country: "France", emoji: "🕯️" },
  { id: 85, name: "Modern Coffee Table", category: "Home", price: 390, country: "Denmark", emoji: "🪑" },
  { id: 86, name: "Accent Chair", category: "Home", price: 450, country: "Italy", emoji: "🪑" },
  { id: 87, name: "Premium Area Rug", category: "Home", price: 320, country: "Turkey", emoji: "🧶" },
  { id: 88, name: "Bedside Table", category: "Home", price: 145, country: "Sweden", emoji: "🪑" },
  { id: 89, name: "Professional Kitchen Mixer", category: "Home", price: 299, country: "Germany", emoji: "🍳" },
  { id: 90, name: "Espresso Machine", category: "Home", price: 599, country: "Italy", emoji: "☕" },
  { id: 91, name: "Luxury Dinnerware Set", category: "Home", price: 165, country: "England", emoji: "🍽️" },
  { id: 92, name: "Crystal Glassware Set", category: "Home", price: 125, country: "Czech Republic", emoji: "🥂" },
  { id: 93, name: "Electric Kettle", category: "Home", price: 89, country: "England", emoji: "🫖" },
  { id: 94, name: "Smart Air Purifier", category: "Home", price: 249, country: "South Korea", emoji: "🌬️" },
  { id: 95, name: "Smart Doorbell", category: "Home", price: 179, country: "USA", emoji: "🔔" },
  { id: 96, name: "Modern Wall Art", category: "Home", price: 140, country: "France", emoji: "🖼️" },
  { id: 97, name: "Storage Organizer Set", category: "Home", price: 65, country: "Japan", emoji: "📦" },
  { id: 98, name: "Premium Bedding Set", category: "Home", price: 210, country: "Italy", emoji: "🛏️" },
  { id: 99, name: "Decorative Ceramic Vase", category: "Home", price: 85, country: "Portugal", emoji: "🏺" },
  { id: 100, name: "Modern Floor Lamp", category: "Home", price: 220, country: "Denmark", emoji: "💡" },

  // ACCESSORIES
  { id: 101, name: "Leather Card Holder", category: "Accessories", price: 65, country: "Italy", emoji: "💳" },
  { id: 102, name: "Designer Belt", category: "Accessories", price: 95, country: "France", emoji: "👔" },
  { id: 103, name: "Silk Scarf", category: "Accessories", price: 85, country: "France", emoji: "🧣" },
  { id: 104, name: "Premium Sunglasses", category: "Accessories", price: 150, country: "Italy", emoji: "🕶️" },
  { id: 105, name: "Leather Gloves", category: "Accessories", price: 90, country: "Italy", emoji: "🧤" },
  { id: 106, name: "Premium Wallet", category: "Accessories", price: 115, country: "Spain", emoji: "👛" },
  { id: 107, name: "Leather Key Holder", category: "Accessories", price: 45, country: "France", emoji: "🔑" },
  { id: 108, name: "Travel Organizer", category: "Accessories", price: 75, country: "Germany", emoji: "🧳" },
  { id: 109, name: "Premium Laptop Sleeve", category: "Accessories", price: 80, country: "USA", emoji: "💻" },
  { id: 110, name: "Luxury Phone Case", category: "Accessories", price: 60, country: "Italy", emoji: "📱" },
  { id: 111, name: "Watch Travel Case", category: "Accessories", price: 70, country: "Switzerland", emoji: "⌚" },
  { id: 112, name: "Jewelry Organizer Box", category: "Accessories", price: 90, country: "France", emoji: "💎" },
  { id: 113, name: "Leather Passport Holder", category: "Accessories", price: 55, country: "Italy", emoji: "🛂" },
  { id: 114, name: "Leather Briefcase", category: "Accessories", price: 240, country: "England", emoji: "💼" },
  { id: 115, name: "Premium Crossbody Bag", category: "Accessories", price: 155, country: "France", emoji: "👜" },
  { id: 116, name: "Travel Backpack", category: "Accessories", price: 130, country: "Germany", emoji: "🎒" },
  { id: 117, name: "Premium Fedora Hat", category: "Accessories", price: 85, country: "England", emoji: "🎩" },
  { id: 118, name: "Executive Cufflinks", category: "Accessories", price: 110, country: "Switzerland", emoji: "💎" },
  { id: 119, name: "Luxury Tie Set", category: "Accessories", price: 95, country: "Italy", emoji: "👔" },
  { id: 120, name: "Premium Travel Umbrella", category: "Accessories", price: 70, country: "Japan", emoji: "☂️" },
];

const categories = [
  {
    name: "Fashion",
    icon: "✦",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Electronics",
    icon: "◈",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Watches",
    icon: "⌁",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Beauty",
    icon: "✧",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Home",
    icon: "⌂",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Accessories",
    icon: "◇",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        !search.trim() ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.country.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Unable to start checkout.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong starting checkout.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#171717]">
      <div className="bg-[#111111] px-4 py-2 text-center text-xs tracking-[0.18em] text-white">
        WORLDWIDE SHOPPING • DISCOVER PRODUCTS FROM AROUND THE GLOBE
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f5f1]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5 lg:px-8">
          <a href="/" className="text-2xl font-black tracking-[-0.06em]">
            MARKET<span className="font-light">SALE</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#shop" className="hover:opacity-50">Shop</a>
            <a href="#categories" className="hover:opacity-50">Categories</a>
            <a href="#featured" className="hover:opacity-50">Featured</a>
            <a href="#sell" className="hover:opacity-50">Sell on MarketSale</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center rounded-full border border-black/10 bg-white px-4 py-2">
              <span className="mr-2 text-gray-400">⌕</span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={handleCheckout}
              className="rounded-full bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white hover:scale-[1.03]"
            >
              Bag ({cart.length})
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm md:hidden"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/10 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <a href="#shop">Shop</a>
              <a href="#categories">Categories</a>
              <a href="#featured">Featured</a>
              <a href="#sell">Sell on MarketSale</a>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="rounded-full border border-black/10 bg-white px-4 py-3 outline-none"
              />
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden bg-[#151515] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.13),transparent_30%)]" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
              The global marketplace
            </p>

            <h1 className="max-w-3xl text-6xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-7xl lg:text-8xl">
              Shop the world.
              <br />
              <span className="text-white/50">
                Find your exceptional.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/65">
              Discover remarkable products from independent sellers and
              businesses around the world, all in one marketplace.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#shop"
                className="rounded-full bg-white px-7 py-4 text-sm font-bold text-black hover:scale-[1.03]"
              >
                Explore Marketplace
              </a>

              <a
                href="#sell"
                className="rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10"
              >
                Become a Seller
              </a>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="relative h-[440px] w-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/15 via-white/5 to-transparent p-5 shadow-2xl">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8">
                <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/50">
                  <span>MarketSale</span>
                  <span>Global</span>
                </div>

                <div>
                  <div className="mb-6 text-8xl">🛍️</div>

                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                    Worldwide marketplace
                  </p>

                  <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                    Your next
                    <br />
                    discovery.
                  </h2>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-5 text-xs text-white/50">
                  <span>Worldwide</span>
                  <span>Est. 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            Explore
          </p>

          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
            Shop by category
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Explore 20 products in every category.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-xl ${
              selectedCategory === "All"
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white"
            }`}
          >
            <div className="mb-10 text-2xl">◎</div>
            <div className="font-semibold">All Products</div>

          </button>

          {categories.map((category) => {
            const count = products.filter(
              (product) => product.category === category.name
            ).length;

            return (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group rounded-3xl border p-6 text-left transition hover:-translate-y-1 hover:shadow-xl ${
                  selectedCategory === category.name
                    ? "border-black bg-black text-white"
                    : "border-black/10 bg-white"
                }`}
              >
                <div className="mb-10 text-2xl opacity-60">
                  {category.icon}
                </div>

                <div className="font-semibold">{category.name}</div>

              
              </button>
            );
          })}
        </div>
      </section>

      <section id="shop" className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                MarketSale selection
              </p>

              <h2
                id="featured"
                className="mt-2 text-4xl font-semibold tracking-[-0.04em]"
              >
                {selectedCategory === "All"
                  ? "Featured products"
                  : selectedCategory}
              </h2>
            </div>

            <p className="text-sm text-gray-400">
              {filteredProducts.length} products
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                selectedCategory === "All"
                  ? "bg-black text-white"
                  : "bg-[#f3f1ec]"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  selectedCategory === category.name
                    ? "bg-black text-white"
                    : "bg-[#f3f1ec]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#f7f5f1] transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#e9e5dd]">
                  {product.badge && (
                    <span className="absolute left-5 top-5 z-10 rounded-full bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      {product.badge}
                    </span>
                  )}

                  <div className="text-7xl transition duration-500 group-hover:scale-110">
                    {product.emoji}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                      {product.category}
                    </span>

                    <span className="text-[10px] text-gray-400">
                      {product.country}
                    </span>
                  </div>

                  <h3 className="mt-3 min-h-[3.5rem] text-lg font-semibold tracking-tight">
                    {product.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:scale-[1.03]"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                One marketplace
              </p>

              <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
                The world is full of good things.
                <br />
                <span className="text-white/40">
                  We put them closer.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-white/55">
              MarketSale connects shoppers with products from businesses
              around the world in one beautifully simple marketplace.
            </p>
          </div>

          <div className="mt-20 grid border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Global Sellers", "Discover products from businesses worldwide."],
              ["02", "Secure Checkout", "Simple and secure payment through Stripe."],
              ["03", "Worldwide Products", "Explore products across multiple categories."],
              ["04", "Built to Scale", "A marketplace designed for global commerce."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="border-white/10 py-8 sm:border-r sm:px-8 first:sm:pl-0 last:sm:border-r-0"
              >
                <span className="text-xs text-white/30">{number}</span>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/40">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sell" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#dedbd3]">
          <div className="grid items-center gap-10 px-8 py-16 sm:px-14 lg:grid-cols-2 lg:px-20 lg:py-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/40">
                For businesses
              </p>

              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Take your products global.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-black/55">
                Put your products in front of customers beyond your borders.
              </p>

              <button className="mt-8 rounded-full bg-black px-7 py-4 text-sm font-bold text-white hover:scale-[1.03]">
                Become a Seller
              </button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="flex h-64 w-64 items-center justify-center rounded-full border border-black/10 bg-white/30 text-8xl shadow-xl">
                🌎
              </div>
            </div>
          </div>
        </div>
      </section>

      {cart.length > 0 && (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/10 bg-[#111111] p-4 text-white shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-white/50">
                {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
              </p>

              <p className="mt-1 text-lg font-bold">
                ${cartTotal.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:scale-[1.03]"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-black/10 bg-[#f7f5f1] px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="text-2xl font-black tracking-[-0.06em]">
                MARKET<span className="font-light">SALE</span>
              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-gray-500">
                A global marketplace connecting people with products from
                around the world.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold">Marketplace</h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-500">
                <a href="#shop">Shop</a>
                <a href="#categories">Categories</a>
                <a href="#featured">Featured</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">Business</h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-500">
                <a href="#sell">Sell on MarketSale</a>
                <a href="#sell">Become a Seller</a>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-black/10 pt-6 text-xs text-gray-400 sm:flex-row">
            <span>© 2026 MarketSale. All rights reserved.</span>
            <span>Secure payments • Global marketplace</span>
          </div>
        </div>
      </footer>
    </main>
  );
}