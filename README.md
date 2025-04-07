
# 🚀 ZePortfolioBuilder

## 📖 Overview

This is a **web development tool** built with **Next.js**, **Firebase**, and **Tailwind CSS**. It allows users to create, edit, delete, and manage projects with customizable features such as icons, colors, labels, and descriptions. The app also includes authentication and profile management functionalities.

---

## 💡 Features

### 🔑 Authentication:
- User login and signup functionality.
- Firebase authentication integration.

### 📁 Project Management:
- Create new projects with customizable:
  - Icons (e.g., rocket, stars, zap).
  - Colors (e.g., purple, green, blue).
  - Labels (tags to categorize projects).
  - Descriptions.
- Edit existing projects:
  - Change name, description, icon, color, or labels.
- Delete projects with confirmation modal.

### 🎨 Design Customization:
- Tailwind CSS-based styling.
- Dynamic color selection for project cards.
- Icon selection using `lucide-react`.

### 🖼 Profile Management:
- User profile settings and customization.

### ⏳ Loading States:
- Loading spinner displayed during async operations like fetching or saving data.

---

## ⚙️ Installation & Setup

### Prerequisites:
1. **Node.js** installed on your system.
2. **Firebase Project** set up with authentication and Firestore database enabled.

### Steps:
1. Clone this repository:

    ```
        git clone https://github.com/your-repo/project-management-app.git
        cd project-management-app
    ```

2. Install dependencies:
    ```
        npm install
    ```

3. Create a `.env.local` file in the root directory and add your Firebase configuration:

    ```
        NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain-here.firebaseapp.com
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id-here
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket-here.appspot.com
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id-here
        NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
    ```

4. Run the development server:

    ```
        npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## 🛠 Technologies Used

### Frontend:
- **Next.js**: React framework for building server-side rendered apps.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **lucide-react**: Icon library used for project icons.

### Backend:
- **Firebase**: Authentication and Firestore database.

---

## 📂 Key Files & Directories

### `/app`
- Contains all Next.js pages and layouts.

### `/components`
- Modular components used across the application.

### `/css`
- Custom stylesheets for additional design elements.

---

## 🚧 Future Improvements

1. Add drag-and-drop functionality to reorder projects.
2. Implement advanced analytics dashboards for project insights.
3. Enhance profile management with avatar uploads.