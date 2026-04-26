# DocVault — AI-Powered Document Management System

A full-stack document management application powered by Google Gemini AI. Upload your documents, ask questions about them, and get instant AI-generated answers — all secured with JWT authentication.

## Live Demo

> [Coming soon — deploying to AWS EC2]

---

## Preview

### Login Page
Secure login with JWT authentication. Passwords are hashed using bcrypt and never stored in plain text.

![Login](screenshots/Login.png)

---

### Register Page
Create a new account to get started with DocVault.

![Sign In](screenshots/Signin.png)

---

### Dashboard
Overview of your document library with total document count and recent activity.

![Dashboard](screenshots/Dashboard.png)

---

### Documents
Browse and manage all your uploaded documents in one place.

![Documents](screenshots/Documents.png)

---

### Upload Documents
Upload documents directly from the app with a clean drag-and-drop interface.

![Upload](screenshots/UploadDocuments.png)

---

### Upload Popup
A modal popup for selecting and confirming document uploads.

![Upload Popup](screenshots/UploadDocumentsPopup.png)

---

### Document View & AI Chat
View your document and chat with Google Gemini AI about its contents — ask questions and get instant answers based on the document.

![View Page](screenshots/ViewPage.png)

---

### Profile Page
Manage your account details and profile information.

![Profile](screenshots/ProfilePage.png)

---

### Encrypted Data in Memory
JWT token and user data stored securely in localStorage — passwords are never cached.

![Encrypted Data](screenshots/encryptedDataInMemory.png)

---

## Features

- Upload and manage PDF documents
- AI-powered document Q&A using Google Gemini
- Secure JWT authentication
- Password hashing with bcrypt
- File uploads handled with Multer
- PDF text extraction for AI processing
- React Markdown rendering for AI responses
- Syntax highlighting for code in AI answers
- Responsive UI with Tailwind CSS
- Toast notifications for user feedback

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Markdown | React Markdown, Remark GFM |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JWT, Bcrypt |
| File Uploads | Multer |
| PDF Parsing | pdf-parse |
| AI | Google Gemini API (@google/genai) |

---

## Project Structure

```
DocVault/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── utils/
│   ├── screenshots/
│   └── vite.config.js
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- Google Gemini API key

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## How the AI Works

1. User uploads a PDF document
2. Backend extracts text from the PDF using pdf-parse
3. User asks a question about the document
4. The extracted text + question is sent to Google Gemini API
5. Gemini returns an AI-generated answer based on the document content
6. Answer is rendered with Markdown and syntax highlighting

---

## Security

- Passwords hashed with **bcrypt** — never stored in plain text
- **JWT tokens** used for stateless authentication
- Protected routes on both frontend and backend
- Input validation with **express-validator**

---

## Deployment

This project is deployed using a full CI/CD pipeline:

- **Docker** — containerized frontend and backend
- **Jenkins** — automated build, test, and deploy on every git push
- **AWS EC2** — hosted on a Linux server

Every `git push` to `main` automatically builds and deploys the latest version.

---

## Author

**Zakaria Khudadady** — Full Stack Developer

---

## License

MIT
