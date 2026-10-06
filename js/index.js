// =========================================================
// Christian Gomez Diaz — Portfolio scripts
// Sections rendered here: footer, skills, featured projects,
// GitHub repositories, and the "Leave a Message" form.
// =========================================================

const GITHUB_USER = "Christian101GTZ";
const PORTFOLIO_REPO = "Christian_Gomez_Diaz_Intro-26.3";


// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = options.text;

  return element;
}


function createExternalLink(href, text, className) {
  const link = createElement("a", { text, className });

  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  return link;
}


// ---------------------------------------------------------
// Footer
// ---------------------------------------------------------

const footer = document.createElement("footer");
const thisYear = new Date().getFullYear();

const copyright = createElement("p", {
  text: `© ${thisYear} Christian Alejandro Gomez Diaz`
});

const footerNote = createElement("p", {
  text: "Built with HTML, CSS, and vanilla JavaScript. "
});

footerNote.appendChild(
  createExternalLink(
    `https://github.com/${GITHUB_USER}/${PORTFOLIO_REPO}`,
    "View the source on GitHub"
  )
);

footer.append(copyright, footerNote);
document.body.appendChild(footer);


// ---------------------------------------------------------
// Skills
// ---------------------------------------------------------

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "SQL", "C++", "HTML", "CSS"]
  },
  {
    // Only technologies used in public GitHub projects.
    title: "AI & Machine Learning",
    skills: [
      "Retrieval-Augmented Generation",
      "Sentence Transformers",
      "ChromaDB",
      "Hugging Face Transformers",
      "DistilBERT Fine-Tuning",
      "LLM Agents & Tool Use",
      "Gemini API",
      "Groq API"
    ]
  },
  {
    title: "Frameworks & Tools",
    skills: [
      "React",
      "Flask",
      "SQLAlchemy",
      "Supabase",
      "Streamlit",
      "Gradio",
      "Pytest",
      "Playwright",
      "Docker",
      "Google Cloud",
      "Git"
    ]
  }
];

const skillsContainer = document.querySelector("#Skills .skills-groups");

for (const group of skillGroups) {
  const groupElement = createElement("div", { className: "skill-group" });

  groupElement.appendChild(
    createElement("p", { className: "group-title", text: group.title })
  );

  const list = document.createElement("ul");

  for (const skill of group.skills) {
    list.appendChild(createElement("li", { text: skill }));
  }

  groupElement.appendChild(list);
  skillsContainer.appendChild(groupElement);
}


// ---------------------------------------------------------
// Featured projects
// ---------------------------------------------------------

// Each entry: display name, GitHub repo name, description, tech tags,
// optional extra links (demo for a live site, pr for a pull request),
// and an optional codeLabel to rename the repository button.
const featuredProjects = [
  {
    name: "The Archive",
    repo: "The_Archive",
    demo: "https://thearchive101.netlify.app",
    description:
      "Deployed full-stack media preservation platform. Authenticated users publish, edit, search, vote on, and comment on media artifacts with image uploads. Built a per-user Votes table and enforced ownership with Supabase Row Level Security policies.",
    tech: ["React", "Vite", "Supabase"]
  },
  {
    name: "PS5 Game Discovery RAG",
    repo: "ps5-game-discovery-rag",
    description:
      "RAG pipeline over 10 gaming sources (212 chunks): MiniLM embeddings, ChromaDB retrieval, query-specific reranking, and grounded generation with source attribution. Switched to one-game-per-chunk after tests showed multi-game chunks diluted embeddings.",
    tech: ["Python", "Sentence Transformers", "ChromaDB", "Groq", "Gradio"]
  },
  {
    name: "VibeCheck",
    repo: "Vibe_Check",
    description:
      "Hybrid AI music recommender. Gemini parses natural-language requests into structured preferences, a deterministic engine scores a hand-labeled 300-song, 78-genre catalog, and Gemini evaluates confidence and retries with relaxed constraints when results are weak. Evaluated against 7 user profiles with a documented model card.",
    tech: ["Python", "Streamlit", "Gemini 2.5 Flash", "Pytest"]
  },
  {
    name: "PathReview — Open Source Contribution",
    repo: "pathreview",
    pr: "https://github.com/ascherj/pathreview/pull/546",
    description:
      "Pull request to an open-source portfolio review assistant: fixed JavaScript/TypeScript detection in the document-ingestion pipeline by replacing filename-only detection with syntax-based regex patterns, resolving issue #148 with 15 tests passing.",
    tech: ["Python", "Pytest", "Open Source"]
  },
  {
    name: "Provenance Guard",
    repo: "provenance-guard",
    description:
      "Explainable AI-attribution API that combines LLM analysis with stylometric heuristics, with confidence scoring, audit logs, appeals, and rate limiting.",
    tech: ["Python", "REST API", "LLMs"]
  },
  {
    name: "CineLog API — Watchlist Feature",
    repo: "cinelog-api",
    pr: "https://github.com/Christian101GTZ/cinelog-api/pull/1",
    description:
      "Added a watchlist feature to an existing Flask and SQLAlchemy REST API through a simulated code-review process: six rounds of review, a rebase onto an upstream UUID migration, and a crash fix the tests missed, caught by exercising the endpoint end-to-end. 8 tests passing.",
    tech: ["Python", "Flask", "SQLAlchemy", "Pytest"]
  },
  {
    name: "TakeMeter",
    repo: "takemeter",
    codeLabel: "View Write-up & Results",
    description:
      "NLP experiment classifying r/Games posts into four discourse categories. Hand-labeled a balanced 200-post dataset, fine-tuned DistilBERT, and compared it against a zero-shot Llama 3.3 70B baseline. The LLM won, so the write-up digs into dataset size, label overlap, and the confusion matrix to explain why.",
    tech: ["Python", "Hugging Face Transformers", "DistilBERT", "Groq API"]
  }
];

const featuredList = document.querySelector("#featured-projects");

// Keep a handle on each card's metadata line so the GitHub data
// fetched below can fill it in.
const projectMetaByRepo = new Map();

for (const project of featuredProjects) {
  const card = createElement("li", { className: "project-card" });

  card.appendChild(createElement("h3", { text: project.name }));
  card.appendChild(createElement("p", { text: project.description }));

  const tags = createElement("ul", { className: "project-tags" });

  for (const tech of project.tech) {
    tags.appendChild(createElement("li", { text: tech }));
  }

  card.appendChild(tags);

  const meta = createElement("span", { className: "repo-meta" });
  card.appendChild(meta);
  projectMetaByRepo.set(project.repo, meta);

  const links = createElement("div", { className: "project-links" });

  if (project.demo) {
    links.appendChild(createExternalLink(project.demo, "Live Demo"));
  }

  if (project.pr) {
    links.appendChild(createExternalLink(project.pr, "View Pull Request"));
  }

  links.appendChild(
    createExternalLink(
      `https://github.com/${GITHUB_USER}/${project.repo}`,
      project.codeLabel || "View Code"
    )
  );

  card.appendChild(links);
  featuredList.appendChild(card);
}


// ---------------------------------------------------------
// GitHub REST API: enrich the featured cards with live data
// (primary language and last-updated date) for the repos
// listed above. Only repositories in featuredProjects are shown.
// ---------------------------------------------------------

fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    return response.json();
  })

  .then(repositories => {
    for (const repo of repositories) {
      const meta = projectMetaByRepo.get(repo.name);
      if (!meta) continue;

      const updated = new Date(repo.pushed_at).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric"
      });

      const parts = [];
      if (repo.language) parts.push(repo.language);
      parts.push(`Updated ${updated}`);

      meta.textContent = parts.join(" · ");
    }
  })

  .catch(error => {
    // The cards already render without this data, so just log it.
    console.error(error);
  });


// ---------------------------------------------------------
// Leave a Message form
// ---------------------------------------------------------

const messageForm = document.querySelector("form[name='leave_message']");
const messageList = document.querySelector("#messages ul");

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.usersName.value.trim();
  const email = event.target.usersEmail.value.trim();
  const message = event.target.usersMessage.value.trim();

  const newMessage = document.createElement("li");

  // Build the message content safely with DOM methods
  const authorLink = createElement("a", { text: name });
  authorLink.href = `mailto:${email}`;

  newMessage.appendChild(authorLink);
  newMessage.appendChild(createElement("span", { text: ` — ${message}` }));

  const removeButton = createElement("button", { text: "Remove" });
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", `Remove message from ${name}`);

  removeButton.addEventListener("click", function () {
    newMessage.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  event.target.reset();
});
