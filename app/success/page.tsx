export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-bold mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with MarketSale.
          Your payment has been received.
        </p>

        <a
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl"
        >
          Continue Shopping
        </a>
      </div>
    </main>
  );
}