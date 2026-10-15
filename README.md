# Christian Gomez Diaz — Portfolio

Personal portfolio of Christian Alejandro Gomez Diaz, a Computer Science student at
California State University, San Bernardino focused on software engineering and applied AI.

**Live site:** https://christian101gtz.github.io/Christian_Gomez_Diaz_Intro-26.3/

Built with plain HTML, CSS, and JavaScript. No frameworks or build step.

## Sections

* **About** and **Experience** (education, open-source work, fellowship, and work history)
* **Skills**, grouped by category and rendered from a JavaScript array
* **Projects**: a curated set of project cards with descriptions, tech tags, and source links. The GitHub REST API adds each repo's primary language to its card when the tag row doesn't already list it.
* **Contact**: GitHub, LinkedIn, and email links, plus a message form that sends to my inbox through Formspree. A hidden honeypot field filters out bots.
* **Footer** (copyright and current year) generated with JavaScript

Also included: skip link and landmark regions, visible focus styles, reduced-motion support,
meta description, canonical URL, Open Graph and Twitter card tags, SVG favicon, and a social
preview image.

## Editing the project list

Projects are defined in the `featuredProjects` array in `js/index.js`. Each entry has a
display name, the GitHub repository name, a short description, and a list of tech tags.
Add or remove entries there to control exactly which projects appear.

## Project structure

```
├── index.html
├── favicon.svg
├── og-image.png        Social sharing preview image
├── resume.pdf          Linked from the hero; generated from resume/resume.html
├── css/
│   └── index.css
├── js/
│   └── index.js
└── resume/
    └── resume.html     Editable source for resume.pdf
```

## Run locally

Open `index.html` in a browser, or use the VS Code **Live Server** extension for live reload.

## Updating the resume

Edit `resume/resume.html`, then render it to PDF with headless Chrome from the project
root (PowerShell):

```
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer "--print-to-pdf=$PWD\resume.pdf" "file:///$($PWD -replace '\\','/')/resume/resume.html"
```

Open the result and check it is still one page before committing. Printing from a browser
tab adds its own margins and usually spills to two pages; use the command instead.

## Deployment

Hosted on GitHub Pages from the `main` branch. Changes merged into `main` publish
automatically within a minute or two.

## Built with

* HTML, CSS, and vanilla JavaScript
* [GitHub REST API](https://docs.github.com/en/rest) for project metadata

---

This portfolio began as the final project for Code the Dream's Intro to Programming course.
