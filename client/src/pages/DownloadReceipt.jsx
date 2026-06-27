import UserLayout from "./UserLayout";

const DownloadReceipt = () => {
  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">
        Download Receipt
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl shadow space-y-3">
        <p><b>Order ID:</b> ORD102</p>
        <p><b>User:</b> Amy Jude</p>
        <p><b>Amount:</b> ₹500</p>
        <p><b>Status:</b> Paid</p>

        <button
          onClick={() => alert("Receipt downloaded")}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-4"
        >
          Download Receipt
        </button>
      </div>
    </UserLayout>
  );
};

export default DownloadReceipt;