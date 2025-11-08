# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1a7e2ecf-dc35-45b6-a632-91ad573e2688

## Backend Connection

This frontend connects to a Python backend hosted at: [https://github.com/DataAthleteChamp/Unlimited_Podcast](https://github.com/DataAthleteChamp/Unlimited_Podcast)

### Setting Up the Backend Connection

To connect this frontend to your Python backend:

1. **Clone and start your Python backend server**
   ```bash
   git clone https://github.com/DataAthleteChamp/Unlimited_Podcast.git
   cd Unlimited_Podcast
   # Follow the setup instructions in the backend repository
   ```
   - Ensure the backend is running and accessible

2. **Configure the API endpoint**
   - Add your backend URL to the `.env` file:
     ```
     VITE_API_URL="http://localhost:8000"  # or your production URL
     ```
   - Update this URL based on your environment (local development vs production)

3. **Handle CORS (if needed)**
   - Make sure your Python backend allows requests from this frontend
   - Configure CORS headers in your Python backend (e.g., using Flask-CORS or FastAPI middleware)

4. **API Integration**
   - Use `fetch` or `axios` to make requests to your backend
   - Example:
     ```typescript
     const API_URL = import.meta.env.VITE_API_URL;
     const response = await fetch(`${API_URL}/api/endpoint`);
     ```

### Backend API Endpoints

The frontend expects the following endpoints from the Python backend:

- **POST `/api/topics/suggestions`**: Generate topic suggestions based on chat messages
  - Request body: `{ messages: [{ text: string, sender: string, timestamp: string }] }`
  - Response: `[{ id: number, title: string, description: string }]`

Additional endpoints may be required for:
- Real-time audio streaming
- Agent conversation management
- User voting/interaction tracking

### Environment Variables

Add any necessary API keys or configuration to `.env`:
```
VITE_API_URL="your-backend-url"
VITE_API_KEY="your-api-key"  # if needed
```

**Note**: Environment variables in Vite must be prefixed with `VITE_` to be accessible in the frontend code.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1a7e2ecf-dc35-45b6-a632-91ad573e2688) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1a7e2ecf-dc35-45b6-a632-91ad573e2688) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
