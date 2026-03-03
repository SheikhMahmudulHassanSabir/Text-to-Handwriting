
  <h1>Text to Handwriting</h1>
  <p><strong>A minimalist, client-side web application that transforms typed text into authentic-looking handwritten documents.</strong></p>
</div>

---

## 🖋️ Overview

Text to Handwriting is a sleek, browser-based tool designed to bridge the gap between digital efficiency and analog aesthetics. Whether you're a student converting notes or a professional adding a personal touch to correspondence, this tool provides a seamless, high-quality experience without the need for server-side processing.

> **Privacy First:** This application processes everything locally within your browser. Your text, font choices, and generated images are never uploaded to any server.

## ✨ Features

- **Real-Time Preview:** See your handwriting instantly as you type and adjust settings.
- **Multiple Fonts:** Choose from 8 carefully selected handwritten Google Fonts (Caveat, Dancing Script, Indie Flower, etc.).
- **Smart Pagination:** Dynamic multi-page support. When your text exceeds the chosen paper size, it automatically flows onto a new sheet.
- **Customization Controls:**
    - Font Family & Size
    - Ink Colors (Black, Blue, Red)
    - Paper Sizes (A4, Letter, A5)
    - Spacing (Line Height, Word, Letter, Margin)
- **Visual Effects:** Add realism with "Scanner", "Paper Texture", or "Shadow" effects.
- **High-Quality Export Docs:** Download your creations as high-resolution PNG images or multi-page PDF documents.
- **Minimalist UI:** A refined, monochrome design system ensuring a distraction-free environment.
- **Mobile Responsive:** Fully functional on mobile devices with an intuitive side-scrolling preview.

## 🚀 Getting Started

Since this is a client-side vanilla web application, no build steps or dependencies are required to run it locally.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/text-to-handwriting.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd text-to-handwriting
   ```
3. **Run a local server:**
   You can use any local HTTP server. Examples:
   - Python 3: `python -m http.server 8000`
   - Node.js (http-server): `npx http-server`
   - VS Code: Use the "Live Server" extension.
4. **Open in browser:**
   Navigate to `http://localhost:8000` (or the port specified by your server).

## 🛠️ Tech Stack

- **HTML5 & CSS3:** Semantic markup and a bespoke design system utilizing CSS Variables.
- **Vanilla JavaScript (ES Modules):** Modularized logic controlling state, rendering, and export without heavy frameworks.
- **html2canvas:** For reliably capturing the DOM into images for export.
- **jsPDF:** For generating multi-page PDF files entirely on the client side.

## 📂 Project Structure

```text
/
├── index.html        # Main application interface
├── about.html        # About page detailing mission & privacy
├── guide.html        # Usage guide
├── css/
│   └── style.css     # Global styles and design tokens
└── js/               # ES modules
    ├── main.js       # Entry point, event wiring, and bootstrap
    ├── state.js      # Centralized state management
    ├── preview.js    # Logic for rendering the live handwriting sheets
    ├── export.js     # Image and PDF generation logic
    ├── config.js     # Constants (Fonts, Colors, Paper sizes)
    ├── menu.js       # Mobile navigation toggle
    └── toast.js      # Notification system
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new fonts, effects, or UI improvements, please open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

Developed and curated by **Sheikh** (EST. 2026).

## 📄 License

This project is open-source. Please see the [LICENSE](LICENSE) file for more information (if applicable).

