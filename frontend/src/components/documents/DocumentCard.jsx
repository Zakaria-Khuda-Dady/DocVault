import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Trash2, BookOpen, BrainCircuit, Clock } from "lucide-react";

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (!bytes) return "N/A";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const DocumentCard = ({ document, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:border-orange-200 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-violet-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FileText className="text-orange-600 w-6 h-6" strokeWidth={2} />
        </div>
        <button
          onClick={() => onDelete(document._id)}
          className="text-slate-400 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors">
        {document.title}
      </h3>

      {/* Document Info */}
      <div className="text-sm text-slate-500 mb-4">
        {document.fileSize !== undefined && (
          <span className="inline-block">
            {formatFileSize(document.fileSize)}
          </span>
        )}
        {document.fileSize !== undefined && document.createdAt && (
          <span className="mx-2">•</span>
        )}
        {document.createdAt && (
          <span className="inline-block">
            {new Date(document.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg mx-auto mb-1">
            <BookOpen className="text-orange-600 w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {document.flashcardCount ?? 0}
          </p>
          <p className="text-xs text-slate-400">Flashcards</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
            <Clock className="text-blue-600 w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {document.pages ?? 0}
          </p>
          <p className="text-xs text-slate-400">Pages</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(`/documents/${document._id}`)}
          className="flex-1 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-violet-50 rounded-lg transition-all duration-300 border border-orange-200"
        >
          View
        </button>
        {/* <button
          onClick={() => navigate(`/flashcards?docId=${document._id}`)}
          className="flex-1 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Create Flashcards
        </button> */}
      </div>
    </div>
  );
};

export default DocumentCard;
