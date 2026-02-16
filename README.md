# Anand Gadge — Portfolio

Full Stack Developer portfolio built with **Next.js**, **MongoDB**, **Prisma**, **React**, **Framer Motion**, and **Tailwind CSS**.

## Features

- **Sections:** Hero, About, Projects (GitHub API), Experience, Contact
- **Light / Dark theme** with toggle and system preference
- **Framer Motion** animations, smooth scrolling, hover effects
- **Contact form** stored in MongoDB via Prisma
- **Projects** loaded from GitHub API (6 most recent repos)
- Responsive layout and mobile menu

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`
   - Set `DATABASE_URL` to your MongoDB connection string (for contact form).  
     If not set, the contact form will show an error on submit but the site still runs.

3. **Images (optional)**  
   Add your assets under `public/images/`:
   - `logoo.png` — Navbar/Footer logo (optional; currently using "AG" initial)
   - `wp5320845.webp` — Hero profile image
   - `workk.jpg` — About section work image  
   If missing, fallback images are used.

4. **Prisma (for contact form)**
   ```bash
   npx prisma generate
   # When DATABASE_URL is set:
   npx prisma db push
   ```

5. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Stack

- Next.js 14 (App Router)
- React 18
- MongoDB + Prisma
- Framer Motion
- Tailwind CSS
- JavaScript
