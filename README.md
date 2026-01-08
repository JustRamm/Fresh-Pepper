# Nur Cafe - Heritage Dining Experience 🍛✨

A modern, premium, and interactive web application for **Nur Cafe**, a fictional high-end Indian heritage restaurant. This project demonstrates a blend of traditional aesthetics with cutting-edge web technologies, featuring Augmented Reality (AR) previews, storytelling elements, and personalized dining recommendations.

![Nur Cafe Hero](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200)

## 🚀 Key Features

*   **🎨 Premium Indian Aesthetic**: Designed with a deep forest green, gold, and cream palette (`#0f3d32`, `#d4af37`), using *Rozha One* and *Playfair Display* typography for a regal feel.
*   **📱 AR Food Menu**: An interactive "See It Before You Eat It" section simulating an Augmented Reality experience with 3D-like hover effects.
*   **🎭 The Spice Archive**: A dark-themed interactive storytelling section revealing the origins of key ingredients (Saffron, Tellicherry Pepper, etc.).
*   **🧠 Mood-Based Recommender**: A "Personalized Dining" widget that suggests dishes based on the user's current mood (Celebratory, Comfort, Spicy, Light).
*   **🛒 Interactive Functionality**: Fully functional "Book a Table" and "Order Online" modals with success states.
*   **⚡ Modern Tech**: Built with React 19, Vite, and the latest Tailwind CSS v4.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@tailwindcss/vite` plugin)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) (Scroll reveals, hover effects, modal transitions)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Fonts**: Google Fonts (Rozha One, Playfair Display, Lato)

## 📦 How to Run Locally

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/JustRamm/Fresh-Pepper.git
cd Fresh-Pepper
```

### 2. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed.
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:5173`.

### 4. Build for Production
To create an optimized build for deployment:
```bash
npm run build
```

## 📂 Project Structure

```
src/
├── App.jsx          # Main application component containing all sections
├── main.jsx         # Entry point
├── index.css        # Global styles & Tailwind imports
└── components/      # (Architecture allows for breaking App.jsx into smaller components)
public/
├── logo.png         # Custom generated Logo
└── favicon.png      # Custom generated Favicon
```

## 🎨 Design System

*   **Primary Color**: Deep Forest Green (`#0f3d32`)
*   **Secondary Color**: Gold/Brass (`#d4af37`)
*   **Background**: Cream (`#FFF8E7`)
*   **Fonts**: *Rozha One* (Headings), *Lato* (Body)

---

**© 2026 Nur Cafe. All rights reserved.**
