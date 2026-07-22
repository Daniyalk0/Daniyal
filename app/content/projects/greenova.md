---
title: Greenova
description: Full-Stack E-Commerce Platform for Fresh Fruits & Vegetables
actions:
  - type: live
    label: Live Demo
    url: https://greenova-pi.vercel.app/
  - type: github
    label: GitHub
    url: https://github.com/Daniyalk0/Greenova
---

## Greenova

Greenova is a modern full-stack e-commerce platform built by Daniyal for selling fresh fruits and vegetables. Designed with scalability, performance, and user experience in mind, it delivers a complete online shopping experience featuring secure authentication, intelligent cart synchronization, online payments, and a comprehensive admin dashboard for efficient business management.

## Tech Stack

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Supabase)
- NextAuth.js
- Redux Toolkit
- React Hook Form
- Zod
- Razorpay
- Nodemailer

## Highlights

- Secure authentication with Email, Google, and Facebook OAuth
- Hybrid cart system with automatic guest-to-user synchronization
- Wishlist, product search, category and seasonal filtering
- Address management with delivery availability based on serviceable pincodes
- Complete checkout flow supporting Razorpay and Cash on Delivery
- Admin dashboard for managing products, orders, users, banners, and service areas
- Responsive UI with loading skeletons, optimistic updates, and smooth user interactions
- Dynamic product catalog with category-based browsing and seasonal collections
- Reusable component architecture with centralized state management
- Performance-focused rendering using Server Components and streaming where appropriate

## Engineering Challenges

- Designed a hybrid cart architecture that seamlessly synchronizes localStorage with the database after user authentication.
- Solved OAuth account linking and authentication edge cases while maintaining a secure login experience using NextAuth.js.
- Implemented optimistic UI updates while ensuring data consistency between the client and server.
- Built a shared delivery availability system used consistently across client components, server actions, and checkout flows.
- Structured reusable server actions and utilities to reduce code duplication and simplify maintenance.
- Improved perceived performance through streaming, Suspense boundaries, loading skeletons, and efficient state management.
- Managed complex relational database models with Prisma while maintaining scalable application architecture.

## What I Learned

- Building scalable full-stack applications with the Next.js App Router
- Architecting secure authentication systems with NextAuth.js
- Designing efficient client-server synchronization strategies
- Managing complex global state using Redux Toolkit
- Integrating online payment gateways with Razorpay
- Working with relational databases using Prisma ORM and PostgreSQL
- Building maintainable applications through reusable components and modular architecture
- Optimizing performance using Server Components, streaming, and progressive loading techniques
- Balancing developer experience, maintainability, and user experience in production-style applications

## Local Development

### Prerequisites

Make sure you have the following installed:

- Git
- Node.js
- npm

### Clone the Repository

```bash
git clone https://github.com/Daniyalk0/Greenova
cd Greenova
```

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```