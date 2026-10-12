# Mica — Full-Stack Developer portfolio

Live: https://mica-dev.netlify.app/

Plain HTML, CSS and JavaScript — no build step. Deploys to Netlify as a static site.

## Structure

```
index.html              page markup (all sections)
assets/css/tokens.css   design tokens (colors, type, spacing, motion) + base styles
assets/css/styles.css   layout and section styles, mobile-first
assets/js/data.js       editable content: projects + social config
assets/js/main.js       nav, project rendering, counters, contact form, entrance animations
assets/img/photos/      optimized portraits (WebP)
assets/img/projects/    optimized project previews (WebP, 640 + 960 px)
```

## Editing content

- **Projects:** edit `window.PROJECTS` in `assets/js/data.js`. Array order is page order;
  `featured: true` shows a large card in Selected Work, `false` a row in More projects.
  Images go in `assets/img/projects/` as `<name>-640.webp` and `<name>-960.webp`.
- **Instagram:** set `instagramUser` in `assets/js/data.js`. The links stay hidden while it is empty.

## Contact form

Sent with [EmailJS](https://www.emailjs.com/) (`@emailjs/browser` 4.4.1). The form field names
`user_name`, `user_email` and `user_project` must match the EmailJS template.
