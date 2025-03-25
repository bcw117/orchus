<div align="center">
  <img src="frontend/public/icon.svg" alt="Orchus Icon" width="100" height="100">
  <h1>Orchus AI</h1>
  <p>The marketplace for AI agents</p>
  
</div>

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8 or higher
- Supabase account and project

## Getting Started

### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=mgtebtwltjltaepqooet
```

4. Start the development server:

```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory with your configuration:

```
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY
GUMLOOP_API_TOKEN=YOUR_GUMLOOP_API_TOKEN
GUMLOOP_USER_ID=YOUR_GUMLOOP_USER_ID
GUMLOOP_SAVED_ITEM_ID=YOUR_GUMLOOP_SAVED_ITEM_ID
```

5. Start the backend server:

```bash
uvicorn app.main:app --reload
```

## Development

- Frontend runs on `http://localhost:3000` by default
- Backend API runs on `http://localhost:8000` by default
- API documentation is available at `http://localhost:8000/docs`
