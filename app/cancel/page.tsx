export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
        <div className="text-6xl mb-4">🛒</div>

        <h1 className="text-3xl font-bold mb-3">
          Checkout Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was cancelled. Your cart is still waiting for you.
        </p>

        <a
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl"
        >
          Return to MarketSale
        </a>
      </div>
    </main>
  );
}