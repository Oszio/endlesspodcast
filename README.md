# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1a7e2ecf-dc35-45b6-a632-91ad573e2688

## Backend Connection

This project is connected to a Supabase backend for data persistence, authentication, and serverless functions.

### Supabase Configuration

The project uses the following Supabase credentials (already configured in `.env`):

- **Project ID**: `xxczlixdprhsdcyfprfx`
- **Supabase URL**: `https://xxczlixdprhsdcyfprfx.supabase.co`
- **Anon Key**: Available in `.env` file

### Connecting to Your Own Backend

If you want to connect this project to your own Supabase instance:

1. Create a new project at [https://supabase.com](https://supabase.com)
2. Get your project credentials from the Supabase dashboard (Settings → API)
3. Update the `.env` file with your credentials:
   ```
   VITE_SUPABASE_PROJECT_ID="your-project-id"
   VITE_SUPABASE_URL="https://your-project-id.supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
   ```
4. Update `supabase/config.toml` with your project ID:
   ```toml
   project_id = "your-project-id"
   ```
5. Run any pending migrations to set up your database schema
6. Deploy edge functions (they will auto-deploy when you push changes)

### Backend Features

- **Database**: PostgreSQL database with Row Level Security (RLS)
- **Authentication**: Built-in user authentication and session management
- **Edge Functions**: Serverless functions in `supabase/functions/`
- **Storage**: File storage capabilities (if configured)

### Managing Secrets

For edge functions that require API keys or secrets:
1. Go to your Supabase dashboard
2. Navigate to Settings → Edge Functions
3. Add your secrets as environment variables
4. Reference them in your edge functions using `Deno.env.get('SECRET_NAME')`

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
