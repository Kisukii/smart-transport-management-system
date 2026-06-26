import UserLayout from "./UserLayout";

const UserProfile = () => {
  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6 text-white">Profile</h1>

      <div className="bg-slate-900 p-6 rounded-2xl shadow space-y-3">
        <p><b>Name:</b> Amy Jude</p>
        <p><b>Email:</b> amy@gmail.com</p>
        <p><b>Phone:</b> 9876543210</p>
        <p><b>Address:</b> Trivandrum, Kerala</p>
      </div>
    </UserLayout>
  );
};

export default UserProfile;