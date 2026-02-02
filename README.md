# Discombulated Brain site

## Initial prompt
> @workspace /new  hugo static site project with tailwind and the tailwindcli. implement a typical multisection home pagean about,  and a blog directory. add layouts for home, head (seo etc), list, and singles. Use minimal tailwind classes to begin with. support light mode and darkmode. this site is going to be for a mental health charity so accessability is critical - scaffold and design with tha tin mind.



## Steps to replicate for a new Hugo site
### Step 1: Install Hugo

Make sure you have Hugo installed on your machine. You can install it via Homebrew on macOS:

```bash
brew install hugo
```

Or download it from the [Hugo releases page](https://github.com/goharbor/harbor/releases).

### Step 2: Create a New Hugo Site

Create a new Hugo site:

```bash
hugo new site mental-health-charity
cd mental-health-charity
```

### Step 3: Initialize Tailwind CSS

1. **Install Tailwind CSS CLI v4.0+**:

   First, initialize npm in your project:

   ```bash
   npm init -y
   ```

   Then install Tailwind CSS and the CLI:

   ```bash
   npm install --save-dev tailwindcss @tailwindcss/cli
   ```

2. **Add Hugo build configuration**:

   Update your `config.toml` to enable build stats and cache busters:

   ```toml
   [build]
     [build.buildStats]
       enable = true
     [[build.cachebusters]]
       source = 'assets/notwatching/hugo_stats\.json'
       target = 'css'
     [[build.cachebusters]]
       source = '(postcss|tailwind)\.config\.js'
       target = 'css'

   [module]
     [[module.mounts]]
       source = 'assets'
       target = 'assets'
     [[module.mounts]]
       disableWatch = true
       source = 'hugo_stats.json'
       target = 'assets/notwatching/hugo_stats.json'
   ```

3. **Create a CSS entry file**:

   Create `assets/css/main.css` with:

   ```css
   @import "tailwindcss";
   @source "hugo_stats.json";
   ```

   > **Note**: The `@source` directive tells Tailwind to scan `hugo_stats.json` for class usage.

4. **Create a CSS partial**:

   Create `layouts/partials/css.html`:

   ```html
   {{ with resources.Get "css/main.css" }}
     {{ $opts := dict "minify" (not hugo.IsDevelopment) }}
     {{ with . | css.TailwindCSS $opts }}
       {{ if hugo.IsDevelopment }}
         <link rel="stylesheet" href="{{ .RelPermalink }}">
       {{ else }}
         {{ with . | fingerprint }}
           <link rel="stylesheet" href="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" crossorigin="anonymous">
         {{ end }}
       {{ end }}
     {{ end }}
   {{ end }}
   ```

5. **Update your base template**:

   In `layouts/_default/baseof.html`, add the CSS partial with deferred execution:

   ```html
   <head>
     ...
     {{ with (templates.Defer (dict "key" "global")) }}
       {{ partial "css.html" . }}
     {{ end }}
     ...
   </head>
   ```

   > **Note**: Hugo now processes Tailwind CSS natively during the build process - no separate build command needed!

### Step 4: Create Site Structure

1. **Create Content**:

   Create the necessary content files:

   ```bash
   hugo new about.md
   hugo new blog/_index.md
   hugo new blog/my-first-post.md
   ```

2. **Edit Content**:

   Add some sample content to `content/about.md`:

   ```markdown
   ---
   title: "About Us"
   date: 2023-10-01
   draft: false
   ---

   We are a mental health charity dedicated to providing support and resources for those in need.
   ```

   Add sample content to `content/blog/my-first-post.md`:

   ```markdown
   ---
   title: "My First Blog Post"
   date: 2023-10-01
   draft: false
   ---

   This is my first blog post on mental health awareness.
   ```

### Step 5: Create Layouts

1. **Create Layouts**:

   Create the following layout files in `layouts`:

   - `layouts/_default/baseof.html`
   - `layouts/_default/single.html`
   - `layouts/_default/list.html`
   - `layouts/index.html`
   - `layouts/partials/head.html`

2. **Base Layout** (`baseof.html`):

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       {{ partial "head.html" . }}
   </head>
   <body class="bg-white text-black dark:bg-gray-800 dark:text-white">
       <header>
           <nav>
               <a href="{{ "/" | relLangURL }}">Home</a>
               <a href="{{ "/about/" | relLangURL }}">About</a>
               <a href="{{ "/blog/" | relLangURL }}">Blog</a>
           </nav>
       </header>
       <main>
           {{ block "main" . }}{{ end }}
       </main>
       <footer>
           <p>&copy; 2023 Mental Health Charity</p>
       </footer>
   </body>
   </html>
   ```

3. **Head Layout** (`head.html`):

   ```html
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>{{ .Title }}</title>
   <link rel="stylesheet" href="{{ "css/tailwind.css" | relURL }}">
   <script>
       const toggleDarkMode = () => {
           document.body.classList.toggle('dark');
       };
   </script>
   ```

4. **Home Layout** (`index.html`):

   ```html
   {{ define "main" }}
   <section>
       <h1 class="text-3xl font-bold">Welcome to Our Mental Health Charity</h1>
       <p>Your mental health matters. We are here to help.</p>
   </section>
   <section>
       <h2 class="text-2xl">Latest Blog Posts</h2>
       <ul>
           {{ range .Pages }}
           <li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
           {{ end }}
       </ul>
   </section>
   {{ end }}
   ```

5. **List Layout** (`list.html`):

   ```html
   {{ define "main" }}
   <h1 class="text-3xl">Blog</h1>
   <ul>
       {{ range .Pages }}
       <li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
       {{ end }}
   </ul>
   {{ end }}
   ```

6. **Single Layout** (`single.html`):

   ```html
   {{ define "main" }}
   <h1 class="text-3xl">{{ .Title }}</h1>
   <div>{{ .Content }}</div>
   {{ end }}
   ```

### Step 6: Enable Dark Mode

To enable dark mode, you can use the `dark` class on the body element. The above code already includes a toggle function in the `head.html`. You can enhance this by adding a button to toggle dark mode.

### Step 7: Run Your Site

Run your Hugo site locally:

```bash
hugo server
```

Visit `http://localhost:1313/my-discombobulated-brain` to see your site in action.

### Step 8: Accessibility Considerations

- Ensure all text has sufficient contrast against the background.
- Use semantic HTML elements (like `<header>`, `<nav>`, `<main>`, and `<footer>`).
- Include `alt` attributes for images (if any).
- Use ARIA roles where necessary to enhance accessibility.

## Content Management

This site uses [Sveltia CMS](https://github.com/sveltia/sveltia-cms), a modern Git-based CMS for managing content.

### Accessing the CMS

- **Local Development**: Visit `http://localhost:1313/my-discombobulated-brain/admin/`
- **Production**: Visit `https://stephlocke.com/my-discombobulated-brain/admin/`

### Authentication Setup

This site uses the [Sveltia CMS Auth](https://github.com/sveltia/sveltia-cms-auth) Cloudflare Worker for GitHub OAuth authentication.

**Current Configuration**: The Cloudflare Worker and GitHub OAuth App are currently being hosted and supported by **Nightingale HQ** to save setup effort on MDB's side. This provides a ready-to-use authentication solution without needing to manage infrastructure.

#### How it Works

1. The CMS redirects users to GitHub for authentication
2. The Cloudflare Worker handles the OAuth callback
3. Users can then edit content directly through the CMS interface
4. Changes are committed to the GitHub repository

#### Setting up Your Own (Optional)

If you want to host your own authentication:

1. Deploy the [Sveltia CMS Auth Worker](https://github.com/sveltia/sveltia-cms-auth) to Cloudflare
2. Create a GitHub OAuth App:
   - Go to GitHub Settings → Developer settings → OAuth Apps → New OAuth App
   - **Application name**: `My Discombobulated Brain CMS`
   - **Homepage URL**: `https://stephlocke.com/my-discombobulated-brain/`
   - **Authorization callback URL**: Your Cloudflare Worker URL + `/callback`
3. Configure the Worker with your GitHub OAuth credentials
4. Update `static/admin/config.yml` with your auth endpoint

### Local Development

For local CMS development, uncomment `local_backend: true` in `static/admin/config.yml` and run:

```bash
npx @sveltia/cms-auth localhost
```

Then access the CMS at `http://localhost:1313/admin/`