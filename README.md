# EbayCut - Deal Finder Website

A static website for finding and sharing deals across multiple retailers, designed to be hosted on GitHub Pages with no backend database required.

## Features

- Browse deals by category
- View detailed product information
- Compare prices across multiple retailers
- Admin interface for managing products
- Export/Import product data as JSON

## How It Works

This project is designed to be hosted on GitHub Pages as a completely static website:

1. **Local Development**: Develop and test the website locally
2. **Admin Interface**: Use the admin interface to manage products locally
3. **Export/Import**: Export your product data to a JSON file
4. **GitHub Deployment**: Commit and push the JSON file to GitHub to update the live site

## Setup Instructions

Follow these steps to set up the project:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Admin Workflow

### Accessing the Admin Interface

1. Navigate to `/admin` in your browser
2. Login with the password: `admin123`

### Adding/Editing Products

1. Log in to the admin interface
2. Navigate to the "Add Product" tab
3. Fill in the product details
4. Click "Add Product"

### Exporting Products

1. Log in to the admin interface
2. Click "Export Products (JSON)" on the dashboard
3. Save the JSON file

### Updating the Live Site

1. Export your products to a JSON file
2. Replace the existing products.json file in the repository
3. Commit and push to GitHub
4. The GitHub Action will automatically build and deploy the site

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- GitHub Pages for hosting

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The GitHub Action workflow handles the build and deployment process.

### Manual Deployment

If you prefer to deploy manually:

1. Build the project: `npm run build`
2. The built files will be in the `dist` directory
3. Deploy these files to any static hosting service

## Setting Up GitHub Pages

1. In your GitHub repository, go to Settings > Pages
2. Set the source to the `gh-pages` branch
3. The site will be available at `https://<username>.github.io/<repository-name>/`

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add your domain in the GitHub repository settings
2. Create a CNAME record pointing to your GitHub Pages URL
3. Add a CNAME file to your repository with your domain name
