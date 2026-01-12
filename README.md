# HireDesk

<div align="center">
  <img src="https://api.iconify.design/lucide:briefcase.svg?color=%23D4F223&width=120" alt="HireDesk Logo" />
  
  <h1 style="margin-top: 20px;">HireDesk</h1>
  
  <p align="center">
    <strong>AI-Powered Recruitment & Applicant Tracking System (ATS)</strong>
  </p>

  <p align="center">
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    </a>
    <a href="https://firebase.google.com/">
      <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat&logo=firebase&logoColor=black" alt="Firebase" />
    </a>
  </p>
</div>

---

## 🚀 Overview

**HireDesk** is a modern, high-performance Applicant Tracking System (ATS) designed to streamline the recruitment process. It leverages AI to parse resumes, match candidates to job descriptions, and provide real-time analytics for hiring managers.

Built with a stunning **Dark/Neon UI**, HireDesk offers a premium user experience with glassmorphism effects, smooth animations, and intuitive data visualization.

## ✨ Key Features

- **📊 Intelligent Dashboard**: Real-time analytics on active jobs, candidate pipeline, and AI match scores.
- **📄 AI Resume Parser**: Drag-and-drop resume upload (PDF/DOCX) with instant skills extraction and job matching.
- **🎯 Candidate Scoring**: Automated scoring system ranking candidates based on relevance to the job description.
- **💼 Job Management**: Create, edit, and track job openings across different departments.
- **🔐 Secure Authentication**: Robust login/signup system with Email & Google Authentication via Firebase.
- **🎨 Modern UI/UX**: Fully responsive design with Framer Motion animations and a sleek dark theme.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Backend/Auth**: Firebase
- **State Management**: React Context API

## 📂 Project Structure

```bash
HireDesk/
├── src/
│   ├── components/       # Reusable UI components (Modals, Navbar, etc.)
│   ├── contexts/         # React Context providers (AuthContext)
│   ├── pages/            # Application pages (Dashboard, Jobs, Home)
│   ├── utils/            # Utility functions and API helpers
│   ├── assets/           # Static assets
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point
├── public/               # Public assets
└── README.md             # Project documentation
```

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/hiredesk.git
   cd hiredesk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Update `src/firebase.js` with your Firebase project credentials if needed.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM (v7)
- **Authentication**: Firebase Auth

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/hiredesk.git
   cd hiredesk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase and API config:

   ```env
   VITE_API_URL=http://your-backend-api.com
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
