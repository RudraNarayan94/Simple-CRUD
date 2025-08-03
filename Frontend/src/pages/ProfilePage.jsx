import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import AuthContext from "../contexts/AuthContext";

const ProfilePage = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const api = useAxios();
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/me/");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch("/users/me/", { email: profile.email });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      try {
        await api.delete("/users/me/");
        alert("Account deleted successfully.");
        logoutUser();
      } catch (error) {
        console.error("Failed to delete account", error);
        alert("Failed to delete account.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (cannot be changed)</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            readOnly
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <hr />
      <h3>Danger Zone</h3>
      <button onClick={handleDeleteAccount} className="delete-button">
        Delete My Account
      </button>
    </div>
  );
};

export default ProfilePage;
