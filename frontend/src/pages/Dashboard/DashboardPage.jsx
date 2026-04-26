import React, { useState, useEffect } from "react";
import progressServices from "../../services/progressServices";
import toast from "react-hot-toast";
import { FileText, Clock, TrendingUp } from "lucide-react";

// Loading Skeleton Component
const StatSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-3 bg-slate-200 rounded w-24 mb-3"></div>
        <div className="h-8 bg-slate-200 rounded w-16"></div>
      </div>
      <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
    </div>
  </div>
);

const ActivitySkeleton = () => (
  <div className="animate-pulse space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-3">
        <div className="w-2 h-2 bg-slate-200 rounded-full mt-2 shrink-0"></div>
        <div className="flex-1">
          <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-slate-100 rounded w-24"></div>
        </div>
      </div>
    ))}
  </div>
);

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await progressServices.getDashboardData();
        setDashboardData(data.data);
      } catch (error) {
        toast.error("Failed to fetch dashboard data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      label: "Total Documents",
      value: dashboardData?.overview?.totalDocuments ?? 0,
      icon: FileText,
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-violet-600 rounded-full"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <p className="text-slate-500 ml-4">
              Monitor your document library and activity
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {loading ? (
              <>
                <StatSkeleton />
              </>
            ) : (
              stats.map(({ label, value, icon: Icon, iconBg, color }, idx) => (
                <div
                  key={label}
                  className="group bg-white rounded-2xl p-8 border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">
                        {label}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                          {value}
                        </p>
                        <TrendingUp className={`${color} w-5 h-5 opacity-60`} />
                      </div>
                    </div>
                    <div
                      className={`${iconBg} rounded-2xl p-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="text-white w-7 h-7" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full w-12 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                </div>
              ))
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Clock className="text-white w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Recent Documents
                </h2>
              </div>
            </div>

            <div className="p-8">
              {loading ? (
                <ActivitySkeleton />
              ) : dashboardData?.recentDocuments?.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recentDocuments.map((doc, index) => (
                    <div
                      key={doc._id}
                      className="group flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-purple-200 cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FileText className="text-white w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 group-hover:text-purple-600 transition-colors truncate">
                            {doc.title}
                          </p>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {new Date(doc.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full group-hover:bg-purple-200 transition-colors">
                        {doc.status === "ready" ? "Ready" : "Processing"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-slate-400 w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-medium">No documents yet</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Start by uploading a document
                  </p>
                </div>
              )}
            </div>
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

export default DashboardPage;
