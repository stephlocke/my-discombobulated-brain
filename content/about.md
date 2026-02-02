---
title: "About Us"
date: 2026-02-02
description: "Learn about our mission to support mental health and provide resources for those in need"
---

## Our Story

We are a dedicated mental health charity committed to providing compassionate support, resources, and advocacy for individuals facing mental health challenges. Founded on the belief that mental health matters just as much as physical health, we work tirelessly to break down stigma and create a more supportive world.

## Our Mission

Our mission is threefold:

### Support
We provide accessible resources, information, and connections to professional services for those experiencing mental health challenges. We believe everyone deserves support, regardless of their circumstances.

### Education
Through workshops, resources, and open conversations, we work to increase awareness and understanding of mental health issues. Knowledge is power, and we're committed to empowering our community.

### Community
We foster safe, inclusive spaces where people can share their experiences, find connection, and receive support without judgment. No one should face mental health challenges alone.

## Our Values

**Compassion**: We approach every individual with empathy, understanding, and without judgment.

**Accessibility**: Mental health support should be available to everyone, regardless of background or circumstance.

**Evidence-Based**: We rely on scientific research and best practices to guide our programs and resources.

**Inclusivity**: We welcome and support people of all backgrounds, identities, and experiences.

**Hope**: We believe in recovery, resilience, and the inherent strength within each person.

## What We Do

- Provide free educational resources and information
- Connect individuals with professional mental health services
- Offer support groups and peer connection opportunities
- Advocate for mental health awareness and policy change
- Share stories of hope and recovery
- Create accessible, stigma-free spaces for conversation

## Get Involved

Whether you're seeking support, want to volunteer, or simply want to learn more about mental health, we're here for you. Together, we can build a more understanding and supportive community.

### Need Support?

If you or someone you know is struggling with mental health, please don't hesitate to reach out. Visit our [contact page](/contact/) or call your local crisis helpline.

**Remember**: Seeking help is a sign of strength, not weakness. You matter, and your mental health matters.

1. **Head Layout**: Create `layouts/partials/head.html`:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ .Title }}</title>
    <link href="{{ .Site.BaseURL }}css/tailwind.css" rel="stylesheet">
</head>
```

2. **Home Layout**: Create `layouts/index.html`:

```html
{{ partial "head.html" . }}
<body class="bg-white text-black dark:bg-gray-800 dark:text-white">
    <header class="p-4">
        <h1 class="text-3xl font-bold">Mental Health Charity</h1>
        <nav>
            <a href="/" class="mr-4">Home</a>
            <a href="/about/">About</a>
            <a href="/blog/">Blog</a>
        </nav>
    </header>
    <main>
        <section class="p-4">
            <h2 class="text-2xl">Welcome to Our Charity</h2>
            <p>Your mental health matters. We provide resources and support.</p>
        </section>
        <section class="p-4">
            <h2 class="text-2xl">Get Involved</h2>
            <p>Join us in making a difference.</p>
        </section>
    </main>
</body>
```

3. **About Layout**: Create `layouts/about.html`:

```html
{{ partial "head.html" . }}
<body class="bg-white text-black dark:bg-gray-800 dark:text-white">
    <header class="p-4">
        <h1 class="text-3xl font-bold">About Us</h1>
    </header>
    <main class="p-4">
        <p>We are dedicated to supporting mental health awareness and providing resources.</p>
    </main>
</body>
```

4. **Blog List Layout**: Create `layouts/blog/list.html`:

```html
{{ partial "head.html" . }}
<body class="bg-white text-black dark:bg-gray-800 dark:text-white">
    <header class="p-4">
        <h1 class="text-3xl font-bold">Blog</h1>
    </header>
    <main class="p-4">
        {{ range .Pages }}
            <article>
                <h2 class="text-xl"><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
                <p>{{ .Summary }}</p>
            </article>
        {{ end }}
    </main>
</body>
```

5. **Blog Single Layout**: Create `layouts/blog/single.html`:

```html
{{ partial "head.html" . }}
<body class="bg-white text-black dark:bg-gray-800 dark:text-white">
    <header class="p-4">
        <h1 class="text-3xl font-bold">{{ .Title }}</h1>
    </header>
    <main class="p-4">
        {{ .Content }}
    </main>
</body>
```

### Step 10: Create Content

Create the necessary content files:

1. **Homepage**: Create `content/_index.md`:

```markdown
---
title: "Home"
---
```

2. **About Page**: Create `content/about.md`:

```markdown
---
title: "About Us"
---
We are dedicated to supporting mental health awareness and providing resources.
```

3. **Blog Directory**: Create `content/blog/_index.md`:

```markdown
---
title: "Blog"
---
```

4. **Sample Blog Post**: Create `content/blog/sample-post.md`:

```markdown
---
title: "Sample Blog Post"
date: 2023-10-01
---
This is a sample blog post about mental health.
```

### Step 11: Enable Dark Mode

To enable dark mode, you can add a toggle button in your header and use Tailwind's dark mode classes. Update your header in `layouts/index.html`:

```html
<button id="theme-toggle" class="p-2">Toggle Dark Mode</button>
```

Add a script to handle the theme toggle:

```html
<script>
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    // Load theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
</script>
```

### Step 12: Run Your Hugo Site

Now you can run your Hugo site:

```bash
hugo server
```

Visit `http://localhost:1313` in your browser to see your new site.

### Conclusion

You now have a basic Hugo static site with Tailwind CSS, supporting light and dark modes, and structured for a mental health charity. You can expand upon this foundation by adding more styles, content, and features as needed.