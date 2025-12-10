# SwapSpot 🛍️

**SwapSpot** is a modern, full-stack marketplace application designed to help users turn their clutter into cash. Built with Next.js 16, TypeScript, and MongoDB, it offers a seamless platform for buying and selling pre-owned goods locally.

## ✨ Features

* **User Authentication**: Secure Sign-up and Login using NextAuth.js (Credentials Provider).
* **Product Listings**: Browse a grid of available products with real-time data.
* **Sell Your Items**: Easy product creation flow with image uploading.
* **Image Handling**: Fast and secure image uploads powered by ImageKit.io.
* **Dashboard**: Manage your listings (Edit or Delete products).
* **Product Details**: Detailed view for individual items with seller contact information.
* **Responsive Design**: Mobile-first UI built with Tailwind CSS v4.

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Authentication**: [NextAuth.js v4](https://next-auth.js.org/)
* **Image Storage**: [ImageKit.io](https://imagekit.io/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js (v18 or higher recommended)
* MongoDB URI (Local or Atlas)
* ImageKit.io Account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/swap-spot.git](https://github.com/your-username/swap-spot.git)
    cd swap-spot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following variables based on the configuration found in `lib/db.ts`, `lib/auth.ts`, and `app/api/auth/imagekit-auth/route.ts`:

    ```env
    # Database
    MONGODB_URI=your_mongodb_connection_string

    # NextAuth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_string

    # ImageKit.io (For Image Uploads)
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```text
swap_spot/
├── app/
│   ├── api/             # API Routes (Auth, Product CRUD, ImageKit)
│   ├── components/      # Reusable UI components (Header, Loader, Cards)
│   ├── login/           # Login Page
│   ├── my-products/     # User specific listings (Edit/Delete)
│   ├── product/         # Browse & Create Product pages
│   ├── profile/         # User Profile Page
│   └── register/        # Registration Page
├── lib/                 # Utilities (DB Connection, Auth Config)
├── models/              # Mongoose Models (User, Product)
├── public/              # Static Assets
└── ...config files