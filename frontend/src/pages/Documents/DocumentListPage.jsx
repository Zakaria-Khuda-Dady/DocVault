import React, { useState, useEffect } from "react";
import { Plus, Upload, Trash2, FileText, X, Search } from "lucide-react";
import documentService from "../../services/documentService";
import Button from "../../components/common/Button";
import DocumentCard from "../../components/documents/DocumentCard";
import toast from "react-hot-toast";

// Loading Card Skeleton
const DocumentCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
      </div>
      <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
    </div>
  </div>
);

const DocumentListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [listUploadModalOpen, setListUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const [listDeleteModalOpen, setListDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data.data || []);
    } catch (error) {
      console.error(error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadTitle) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", uploadTitle);
      await documentService.uploadDocument(formData);
      setUploadFile(null);
      setUploadTitle("");
      setListUploadModalOpen(false);
      toast.success("Document uploaded successfully!");
      fetchDocuments();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId) => {
    setDeleting(true);
    try {
      await documentService.deleteDocument(docId);
      setListDeleteModalOpen(false);
      setSelectedDoc(null);
      toast.success("Document deleted successfully!");
      fetchDocuments();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete document");
    } finally {
      setDeleting(false);
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Search */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-violet-600 rounded-full"></div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Documents
                  </h1>
                </div>
                <p className="text-slate-500 ml-4">
                  Manage and organize your study materials
                </p>
              </div>
              <Button
                onClick={() => setListUploadModalOpen(true)}
                variant="primary"
                size="md"
                className="gap-2 shadow-lg hover:shadow-xl bg-gradient-to-r from-orange-500 to-violet-600 hover:from-orange-600 hover:to-violet-700"
              >
                <Upload size={18} />
                Upload Document
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by name..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-300 outline-none text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Documents Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <DocumentCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc, idx) => (
                <div
                  key={doc._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <DocumentCard
                    document={doc}
                    onDelete={(docId) => {
                      setSelectedDoc(doc);
                      setListDeleteModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="text-orange-600 w-10 h-10" />
              </div>
              <p className="text-slate-800 font-semibold text-lg mb-2">
                {searchQuery ? "No documents found" : "No documents yet"}
              </p>
              <p className="text-slate-500 mb-6">
                {searchQuery
                  ? "Try adjusting your search criteria"
                  : "Upload your first PDF document to get started"}
              </p>
              <Button
                onClick={() => setListUploadModalOpen(true)}
                variant="primary"
                className="gap-2 bg-gradient-to-r from-orange-500 to-violet-600 hover:from-orange-600 hover:to-violet-700"
              >
                <Upload size={18} />
                Upload Your First Document
              </Button>
            </div>
          )}

          {/* Upload Modal */}
          {listUploadModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Upload Document
                  </h2>
                  <button
                    onClick={() => {
                      setListUploadModalOpen(false);
                      setUploadFile(null);
                      setUploadTitle("");
                    }}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Document Title
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g., Physics Notes Chapter 5"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all outline-none text-slate-800"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Select PDF File
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-orange-50 file:to-violet-50 file:text-orange-700 hover:file:from-orange-100 hover:file:to-violet-100 transition-colors cursor-pointer"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    PDF format only • Max 50MB
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setListUploadModalOpen(false);
                      setUploadFile(null);
                      setUploadTitle("");
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={!uploadFile || !uploadTitle || uploading}
                    variant="primary"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-violet-600 hover:from-orange-600 hover:to-violet-700"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {listDeleteModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Delete Document?
                </h2>
                <p className="text-slate-500 text-sm mb-6">
                  Are you sure you want to delete "
                  <span className="font-semibold text-slate-700">
                    {selectedDoc?.title}
                  </span>
                  "? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setListDeleteModalOpen(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleDelete(selectedDoc?._id)}
                    disabled={deleting}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    variant="primary"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          )}
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

export default DocumentListPage;
