# 🌳 BitTree — Link in Bio

BitTree is a simple Linktree-style web application built with Next.js. Users can claim a custom handle, add social or website links, and share a single public profile page.

## ✨ Features

- 🔗 Create a personalized BitTree profile
- 🪪 Claim a unique handle
- 🖼️ Add a profile picture and description
- ➕ Add multiple custom links
- 🌐 View public profiles at `/<handle>`
- 💾 Store profile and link data in MongoDB
- 🔔 Success and error notifications

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB
- **Notifications:** React Toastify
- **Runtime:** Node.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18 or newer
- npm
- A MongoDB database and connection URI

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd linktree-clone
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env.local` file in the project root:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## 📖 Usage

1. Open the home page and enter a desired handle.
2. Click **Claim your Bittree**.
3. Add your profile picture, description, and links.
4. Click **Create your BitTree**.
5. Visit `http://localhost:3000/<handle>` to view the public profile.

## 🔌 API

### Create a BitTree

```http
POST /api/add
```

Example request body:

```json
{
  "handle": "yourhandle",
  "pic": "https://example.com/profile.jpg",
  "desc": "A short profile description",
  "links": [
    {
      "link": "https://example.com",
      "linktext": "My Website"
    }
  ]
}
```

Handles must be unique. The API returns an error when a handle is already registered.

## 📁 Project Structure

```text
app/
├── [handle]/          # Public BitTree profile route
├── api/add/           # Profile creation API route
├── generate/          # Profile creation page
├── layout.js          # Shared application layout
└── page.js            # Home page
components/
└── Navbar.js          # Application navigation
lib/
└── mongodb.js         # MongoDB connection setup
public/
├── home.png           # Home page image
└── generate.png       # Generator page image
```

## 📜 Available Scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Start the production server
npm run lint   # Run ESLint checks
```

## 🔐 Environment Variables

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string used by the application |

Keep `.env.local` private and never commit database credentials.

## 📄 License

This project is available for personal and educational use.
