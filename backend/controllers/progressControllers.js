import Document from "../models/Document.js";

// @desc    Get user dashboard overview
// @route   GET /api/progress/dashboard
// @access  Private
export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get document count
    const totalDocuments = await Document.countDocuments({ userId });

    // Get recent documents
    const recentDocuments = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title fileSize createdAt status");

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalDocuments,
        },
        recentDocuments,
      },
    });
  } catch (error) {
    next(error);
  }
};
