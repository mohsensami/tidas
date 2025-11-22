# 🪙 Tidas Gold Gallery

**E-commerce platform for premium gold jewelry and accessories.**  
Built with modern web technologies for performance, security, and scalability.

🌐 [www.tidasgold.ir](https://www.tidasgold.ir)

---

## 🚀 Tech Stack

| Technology       | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| **Next.js 14**   | React framework for full-stack web apps with server components |
| **Prisma ORM**   | Type-safe database toolkit for PostgreSQL/MySQL/SQLite         |
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development           |
| **shadcn/ui**    | Reusable, accessible, and beautifully styled UI components     |
| **UploadThing**  | Simple file uploads (e.g. product images, banners)             |
| **Zod**          | Schema validation for type safety and form validation          |
| **NextAuth.js**  | Authentication with providers and session management           |

---

## 🛍️ Features

- 🧭 **Dynamic product catalog** — Manage collections, categories, and details
- 🔒 **User authentication** — Secure login/register with NextAuth
- 💳 **Cart & checkout** — Add to cart, manage quantities, and process orders
- 🖼️ **Image uploads** — Product and banner uploads with UploadThing
- 🧩 **Admin dashboard** — Manage products, inventory, and users
- 🎨 **Modern UI** — Built with Tailwind CSS and shadcn/ui components
- ⚡ **Optimized performance** — Next.js Server Actions & edge-ready APIs

---

## 🧱 Project Structure

```
tidasgold-gallery/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Auth pages (login, register)
│   ├── (shop)/           # Storefront pages
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes (Next.js server actions)
├── components/           # Reusable UI components
├── lib/                  # Utilities (db, auth, validations)
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── styles/               # Global styles and Tailwind setup
```

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/tidasgold-gallery.git
   cd tidasgold-gallery
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="your_database_connection_url"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   UPLOADTHING_SECRET="your_uploadthing_secret"
   UPLOADTHING_APP_ID="your_uploadthing_app_id"
   ```

4. **Run Prisma migrations**

   ```bash
   npx prisma db push
   # or
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Your app will be running at **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Environment Variables

| Variable             | Description                    |
| -------------------- | ------------------------------ |
| `DATABASE_URL`       | Prisma database connection URL |
| `NEXTAUTH_SECRET`    | Secret key for NextAuth        |
| `NEXTAUTH_URL`       | Base URL for auth callbacks    |
| `UPLOADTHING_SECRET` | Secret key for UploadThing     |
| `UPLOADTHING_APP_ID` | App ID for UploadThing         |

---

## 🧩 Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start development server             |
| `npm run build`     | Build for production                 |
| `npm run start`     | Start production server              |
| `npx prisma studio` | Open Prisma Studio for DB inspection |

---

## 🛠️ Deployment

Deploy easily to **Vercel**:

```bash
vercel deploy
```

Ensure that all `.env` variables are added to your **Vercel Project Settings**.

---

## 🧑‍💻 Author

**Mohsen Sami**  
Crafted with 💛 using modern web technologies.  
📍 [www.tidasgold.ir](https://tidasgold.ir)

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

> _"Elegance meets innovation — Tidas Gold Gallery redefines online jewelry shopping."_
