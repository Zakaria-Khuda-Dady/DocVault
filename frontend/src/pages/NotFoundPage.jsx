import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, ArrowLeft } from "lucide-react";
import Button from "../components/common/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-md w-full text-center relative">
        <div className="mb-8 animate-fade-in">
          <div className="text-8xl font-bold bg-gradient-to-r from-orange-500 to-violet-600 bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Page Not Found
          </h1>
          <p className="text-slate-500 mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 mb-6 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HomeIcon className="text-orange-600 w-10 h-10" />
          </div>
          <p className="text-slate-600 mb-6">
            Let's get you back on track by returning to the dashboard.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1 gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="primary"
              className="flex-1"
            >
              Dashboard
            </Button>
          </div>
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

export default NotFoundPage;
