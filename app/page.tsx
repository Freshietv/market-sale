"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 129.99,
    category: "Electronics",
    emoji: "⌚",
  },
  {
    id: 3,
    name: "Classic Sneakers",
    price: 64.99,
    category: "Fashion",
    emoji: "👟",
  },
  {
    id: 4,
    name: "Leather Backpack",
    price: 89.99,
    category: "Fashion",
    emoji: "🎒",
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    category: "Electronics",
    emoji: "🔊",
  },
  {
    id: 6,
    name: "Premium Sunglasses",
    price: 39.99,
    category: "Fashion",
    emoji: "🕶️",
  },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Market<span className="text-blue-600">Sale</span>
            </h1>
            <p className="text-xs text-gray-500">
              Shop smart. Live better.
            </p>
          </div>

          <div className="hidden max-w-md flex-1 md:block">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
            🛒 Cart ({cart.length})
          </div>
        </div>

        <div className="px-6 pb-4 md:hidden">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold text-blue-400">
              WELCOME TO MARKETSALE
            </p>

            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Everything you want.
              <br />
              One place to shop.
            </h2>

            <p className="mt-6 max-w-xl text-lg text-gray-400">
              Discover great products, add them to your cart and check out
              securely with Flutterwave.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 rounded-full bg-blue-600 px-7 py-3 font-bold transition hover:bg-blue-500"
            >
              Shop Now →
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-semibold text-blue-600">OUR STORE</p>
            <h2 className="mt-1 text-3xl font-black">Featured Products</h2>
          </div>

          <p className="text-sm text-gray-500">
            {filteredProducts.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">🔎</div>
            <h3 className="mt-4 text-xl font-bold">No products found</h3>
            <p className="mt-2 text-gray-500">
              Try searching for something else.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-56 items-center justify-center bg-gray-100 text-8xl">
                  {product.emoji}
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">{product.name}</h3>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-black">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-gray-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="border-t bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-500">Your cart</p>
              <h3 className="text-2xl font-black">
                {cart.length} item{cart.length > 1 ? "s" : ""}
              </h3>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-black">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() =>
                  (handleCheckout)
                }
                className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-500"
              >
                Checkout →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-950 px-6 py-10 text-center text-gray-400">
        <p className="font-bold text-white">MarketSale</p>
        <p className="mt-2 text-sm">
          Secure shopping powered by Flutterwave.
        </p>
      </footer>
    </main>
  );
}