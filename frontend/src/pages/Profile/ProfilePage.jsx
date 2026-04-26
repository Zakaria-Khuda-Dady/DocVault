import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";
import Spinner from "../../components/common/Spinner";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";
import { User, Mail, Lock } from "lucide-react";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  // Edit profile states
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Change password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await authService.getProfile();
      setProfile(data.data || data);
      setEditUsername(data.data?.username || data.username);
      setEditEmail(data.data?.email || data.email);
    } catch (error) {
      toast.error("Failed to fetch profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      await authService.updateProfile({
        username: editUsername,
        email: editEmail,
      });
      toast.success("Profile updated successfully!");
      fetchProfile();
    } catch (error) {
      toast.error(error.error || "Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    setChangingPassword(true);
    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.error || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-2xl mx-auto relative">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-violet-600 rounded-full"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Profile
            </h1>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-6 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="text-white w-8 h-8" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {profile?.username || "User"}
              </p>
              <p className="text-slate-500">{profile?.email}</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={updatingProfile}
              className="w-full"
            >
              {updatingProfile ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Lock size={20} className="text-orange-500" />
            Change Password
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={changingPassword}
              className="w-full"
            >
              {changingPassword ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
