import UserLayout from "./UserLayout";

const UserDeliveryConfirmation = () => {
  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">
        Delivery Confirmation
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl shadow space-y-3">
        <p><b>Order ID:</b> ORD102</p>
        <p><b>Status:</b> Delivered</p>
        <p><b>Delivered To:</b> Amy Jude</p>

        <button
          onClick={() => alert("Delivery confirmed")}
          className="bg-green-600 text-white px-5 py-3 rounded-lg mt-4"
        >
          Confirm Delivery Received
        </button>
      </div>
    </UserLayout>
  );
};

export default UserDeliveryConfirmation;