import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUser(data);
      setEditUser(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editUser),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setUser(data);
      setEditUser(data);
      setEditing(false);

      alert("Profile Updated Successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setEditUser(user);
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <button
        onClick={() => navigate("/admin")}
        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg mb-6"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl shadow-xl p-8">

        {/* Avatar */}
        <div className="flex flex-col items-center">

          <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-5">
            {user.name}
          </h1>

          <p className="text-gray-400 capitalize">
            {user.role}
          </p>

        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-6 mt-10">

          <div>
            <label className="block mb-2 text-gray-400">
              Full Name
            </label>

            <input
              name="name"
              value={editUser.name || ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full bg-slate-800 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-400">
              Email
            </label>

            <input
              name="email"
              value={editUser.email || ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full bg-slate-800 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-400">
              Phone
            </label>

            <input
              name="phone"
              value={editUser.phone || ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full bg-slate-800 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-400">
              Role
            </label>

            <input
              value={user.role || ""}
              disabled
              className="w-full bg-slate-800 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-400">
              Status
            </label>

            <input
              value={user.status || "Active"}
              disabled
              className="w-full bg-slate-800 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-400">
              Joined On
            </label>

            <input
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ""
              }
              disabled
              className="w-full bg-slate-800 p-3 rounded-lg"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;