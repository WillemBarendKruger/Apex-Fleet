# 🖥️ Apex IT – Office Equipment Management System

**Apex IT** is a full-stack office equipment management solution designed to help organizations track, maintain, and manage their office equipment with ease. Built using the **ABP Framework v9**, **Next.js with TypeScript**, and **Ant Design**, this app ensures a clean, responsive, and enterprise-ready experience.

---

## 🚀 Features

- ✅ Add and categorize office equipment (PCs, printers, projectors, etc.)
- 📍 Track equipment usage, status, and location
- 📝 Submit and track issue reports
- 👤 Role-based access for supervisors and employees users
- 🔐 Secure login and registration (JWT)
- 🤖 AI chatbot for equipment troubleshooting (image and text)
- 📰 Condition reporting and maintenance tracking

---

## 🛠️ Tech Stack

| Layer           | Technology                             |
|-----------------|----------------------------------------|
| Backend         | ASP.NET Boilerplate (ABP v9)           |
| Frontend        | Next.js v15 (TypeScript) + Ant Design  |
| Database        | PostgreSQL / SQL Server                |
| Auth            | JWT / Identity                         |
| Styling         | CSS / Ant Design Theming               |

---

# 📦 Installation

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- A valid Google Gemini API key for AI features

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/WillemBarendKruger/Apex-IT.git
   cd Apex-IT/Frontend
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file in the `Frontend` directory.
   - Add your Gemini API key:
     ```
     NEXT_PUBLIC_GOOGLE_CLOUD_API=your-gemini-api-key
     ```

4. **Run the development server:**
   ```sh
   yarn dev
   # or
   npm run dev
   ```

   ### Backend
   ```bash
   cd Backend
   dotnet run
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) or open the one shown in the terminal in your browser.

```
### Folder structure
Apex IT/
├── Backend/         # Backend ABP project
├── Frontend/        # Next.js frontend
├── README.md

---

## Figma Design

> _Paste your Figma design link here:_
>
> [Figma Design](https://www.figma.com/design/torUGjC3PtWRRmVdMl28P7/Apex-IT?node-id=0-1&t=2tM7m3cZqZQAGGk9-1)

---

## Domain Model

> [Domian model](https://drive.google.com/file/d/1pZFZEN1ZNz7tCKQhRWzZ_vO1K_HddPJh/view?usp=sharing)

---

###👤 Author
Willem Kruger – Graduate Software Engineer @ Boxfusion

📍 South Africa

## Contact

For questions or support, contact [your-email@example.com](mailto:Willem.Kruger@boxfusion.io).
