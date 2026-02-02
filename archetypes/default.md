### Step 1: Install Hugo

First, ensure you have Hugo installed. You can download it from [Hugo's official website](https://gohugo.io/getting-started/installation/).

### Step 2: Create a New Hugo Site

Open your terminal and run the following command to create a new Hugo site:

```bash
hugo new site mental-health-charity
cd mental-health-charity
```

### Step 3: Initialize a Git Repository (Optional)

If you want to use version control, initialize a Git repository:

```bash
git init
```

### Step 4: Add a Theme

You can either create your own theme or use an existing one. For simplicity, let's create a new theme called `tailwind-theme`.

```bash
mkdir themes/tailwind-theme
```

### Step 5: Install Tailwind CSS

You can install Tailwind CSS using npm. First, initialize npm in your project:

```bash
npm init -y
```

Then install Tailwind CSS:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### Step 6: Configure Tailwind CSS

Edit the `tailwind.config.js` file to set up your content paths:

```javascript
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './content/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 7: Create Tailwind CSS File

Create a CSS file for Tailwind in `assets/css/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles for light and dark mode */
body {
  @apply bg-white text-black;
}

body.dark {
  @apply bg-gray-900 text-white;
}
```

### Step 8: Create Layouts

Create the necessary layouts in `themes/tailwind-theme/layouts/`.

1. **Base Layout (`baseof.html`)**:

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    {{ partial "head.html" . }}
</head>
<body class="dark:bg-gray-900 bg-white text-black">
    {{ block "main" . }}{{ end }}
</body>
</html>
```

2. **Head Layout (`head.html`)**:

```html
<title>{{ .Title }}</title>
<meta name="description" content="{{ .Description }}">
<link href="{{ "css/tailwind.css" | relURL }}" rel="stylesheet">
```

3. **Home Layout (`index.html`)**:

```html
{{ define "main" }}
<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold">Welcome to Our Mental Health Charity</h1>
    <section class="my-8">
        <h2 class="text-2xl">Our Mission</h2>
        <p>We aim to provide support and resources for mental health awareness.</p>
    </section>
    <section class="my-8">
        <h2 class="text-2xl">Latest Blog Posts</h2>
        <ul>
            {{ range .Pages }}
            <li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
            {{ end }}
        </ul>
    </section>
</div>
{{ end }}
```

4. **List Layout (`list.html`)**:

```html
{{ define "main" }}
<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold">Blog</h1>
    <ul>
        {{ range .Pages }}
        <li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
        {{ end }}
    </ul>
</div>
{{ end }}
```

5. **Single Layout (`single.html`)**:

```html
{{ define "main" }}
<div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold">{{ .Title }}</h1>
    <div>{{ .Content }}</div>
</div>
{{ end }}
```

### Step 9: Create Content

1. **Homepage**: Create a file `content/_index.md`:

```markdown
---
title: "Home"
---
```

2. **About Page**: Create a file `content/about.md`:

```markdown
---
title: "About Us"
---
We are dedicated to supporting mental health awareness and providing resources.
```

3. **Blog Posts**: Create a few sample blog posts in `content/posts/`:

```bash
hugo new posts/my-first-post.md
hugo new posts/my-second-post.md
```

Edit these files to add content.

### Step 10: Enable Dark Mode

To toggle dark mode, you can add a button in your `baseof.html` layout:

```html
<button id="theme-toggle" class="p-2">Toggle Dark Mode</button>
<script>
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
</script>
```

### Step 11: Build and Serve Your Site

Run the following command to build and serve your site:

```bash
hugo server
```

Visit `http://localhost:1313` to see your site in action.

### Step 12: Accessibility Considerations

- Use semantic HTML elements (like `<header>`, `<nav>`, `<main>`, `<footer>`) to improve accessibility.
- Ensure sufficient color contrast between text and background colors.
- Use ARIA roles and properties where necessary to enhance screen reader support.

### Conclusion

You now have a basic Hugo static site with Tailwind CSS, supporting light and dark modes, and structured for a mental health charity. You can expand upon this foundation by adding more content, improving styles, and enhancing accessibility features as needed.