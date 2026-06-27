import UserLayout from "./UserLayout";

const DeliveryHistory = () => {
  const deliveries = [
    { id: "ORD101", item: "Electronics", status: "In Transit" },
    { id: "ORD102", item: "Books", status: "Delivered" },
    { id: "ORD103", item: "Clothes", status: "Delivered" },
  ];

  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">
        Delivery History
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl shadow">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="flex justify-between items-center bg-slate-50 p-4 rounded-xl mb-3"
          >
            <div>
              <p className="font-bold">{delivery.id}</p>
              <p className="text-slate-600">{delivery.item}</p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
              {delivery.status}
            </span>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default DeliveryHistory;