import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import documentService from "../../services/documentService";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import { ArrowLeft, ExternalLink } from "lucide-react";

const DocumentDetailPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content");

  useEffect(() => {
    fetchDocumentDetails();
  }, [id]);

  const fetchDocumentDetails = async () => {
    try {
      const data = await documentService.getDocumentById(id);
      setDocument(data.data || data);
    } catch (error) {
      toast.error("Failed to fetch document details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Link
            to="/documents"
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8 font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Documents
          </Link>
          <p className="text-slate-400">Document not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <Link
          to="/documents"
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Documents
        </Link>

        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-6 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {document.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>
              {document.fileSize
                ? `${(document.fileSize / 1024).toFixed(2)} KB`
                : "N/A"}
            </span>
            <span>•</span>
            <span>{new Date(document.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span
              className={`font-medium ${document.status === "ready" ? "text-orange-600" : "text-yellow-600"}`}
            >
              {document.status === "ready" ? "Ready" : "Processing"}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
          <div className="flex border-b border-slate-100 bg-slate-50">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "content"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Extracted Content
            </button>
            <button
              onClick={() => setActiveTab("chunks")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "chunks"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Text Chunks ({document.chunks?.length || 0})
            </button>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Content Tab */}
            {activeTab === "content" && (
              <div>
                {document.extractedText ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 mb-4">
                      {document.extractedText.split(" ").length} words
                    </p>
                    <div className="bg-white rounded-xl p-4 max-h-96 overflow-y-auto text-sm text-slate-700 leading-relaxed whitespace-pre-wrap border border-slate-200">
                      {document.extractedText}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400">
                    No extracted content available yet. The document is being
                    processed.
                  </p>
                )}
              </div>
            )}

            {/* Chunks Tab */}
            {activeTab === "chunks" && (
              <div>
                {document.chunks && document.chunks.length > 0 ? (
                  <div className="space-y-3">
                    {document.chunks.map((chunk, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 border border-slate-200"
                      >
                        <p className="text-xs font-semibold text-orange-600 mb-2">
                          Chunk {index + 1}
                        </p>
                        <p className="text-sm text-slate-700 line-clamp-4">
                          {chunk}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">
                    No chunks available. The document is being processed.
                  </p>
                )}
              </div>
            )}
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

export default DocumentDetailPage;
