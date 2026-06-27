import UserLayout from "./UserLayout";

const UserNotifications = () => {
  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">Notifications</h1>

      <div className="space-y-4">
        <div className="bg-slate-900 p-5 rounded-2xl shadow">
          Your shipment TRK12345 is in transit.
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl shadow">
          Your delivery ORD102 has been completed.
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl shadow">
          Receipt for ORD102 is ready to download.
        </div>
      </div>
    </UserLayout>
  );
};

export default UserNotifications;