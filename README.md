# 🌈 Color Contrast Checker — Nested Layer Accessibility Visualizer  
Live at 👉 [contrasttree.vercel.app](https://contrasttree.vercel.app)

A unique web tool designed to test color contrast accessibility in **deeply nested layouts**—built out of real-world frustration, curiosity, and creativity.

---

## 🔍 Why I Built This

While attending a design bootcamp, I came across a typical color contrast checker online. But there was a catch:  
> None of the existing tools supported **nested layers**, such as deeply structured divs or sections with complex background/text layering.

As a frontend developer focused on **accessibility-first UI/UX**, this gap caught my attention.

After scouring Google with no success, I decided to build my own solution—powered by:
- 🧠 Prompt engineering techniques
- 🤖 Claude AI (code generation)
- 🛠️ ChatGPT (debugging and refinement)

I spent **6–10 focused hours** designing, coding, and refining this project from idea to deployment.

That’s how **Color Contrast Checker** was born.

---

## 🧠 What It Does

- ✅ Check contrast compliance (AA/AAA) between **text and its computed background**, no matter how many nested layers exist
- 🌲 Visualizes the **background cascade (contrast tree)** used to compute the final color
- 🧩 Test combinations of layers like semi-transparent overlays, gradients, background images, and deeply nested elements
- ♿ Built with accessibility (WCAG) guidelines at the core

---

## 🧪 Features

- 🧮 **Real-Time Contrast Calculation**  
  Handles real CSS background inheritance and layering logic

- 🌳 **Contrast Tree Viewer**  
  Understand how final contrast is computed with visual layering

- 🎨 **Interactive UI for Testing**  
  Modify colors, add layers, and test instantly

- ⚙️ **Built for Designers & Developers**  
  Perfect for accessibility audits, UI testing, and educational purposes

---

## 🛠️ Tech Stack

- **Frontend**: TypeScript, Next.js, Tailwind CSS  
- **Rendering Engine**: DOM Layer Simulation via JavaScript  
- **Deployment**: Vercel

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/arifmiah07/color-contrast-checker.git
cd color-contrast-checker

# Install dependencies
npm install

# Start local dev server
npm run dev
