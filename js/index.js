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
    skills: ["Python", "JavaScript", "HTML", "CSS", "SQL"]
  },
  {
    title: "Frontend",
    skills: ["React", "Vite", "React Router", "Responsive Design"]
  },
  {
    title: "Backend & Data",
    skills: ["Flask", "Node.js", "Express", "Supabase", "REST APIs"]
  },
  {
    title: "AI & Machine Learning",
    skills: ["Gemini API", "Retrieval-Augmented Generation", "ChromaDB", "NLP", "DistilBERT"]
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Open Source Workflow"]
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

const featuredProjects = [
  {
    name: "The Archive",
    repo: "The_Archive",
    description:
      "Community-driven full-stack platform for preserving media, documenting cultural history, and discussing physical collections.",
    tech: ["React", "Vite", "Supabase"]
  },
  {
    name: "VibeCheck",
    repo: "Vibe_Check",
    description:
      "Hybrid AI music recommender that combines Gemini intent parsing, content-based scoring, reliability evaluation, and adaptive user feedback.",
    tech: ["Python", "Gemini API", "RAG"]
  },
  {
    name: "PathReview — Open Source Contribution",
    repo: "pathreview",
    description:
      "Merged pull request to an open-source portfolio review assistant: improved JavaScript/TypeScript skill detection and fixed language-classification false positives.",
    tech: ["Open Source", "CodePath AI301"]
  },
  {
    name: "Provenance Guard",
    repo: "provenance-guard",
    description:
      "Explainable AI-attribution API that combines LLM analysis with stylometric heuristics, with confidence scoring, audit logs, appeals, and rate limiting.",
    tech: ["Python", "REST API", "LLMs"]
  },
  {
    name: "TakeMeter",
    repo: "takemeter",
    description:
      "NLP classification project comparing a fine-tuned DistilBERT model against a zero-shot LLM baseline on manually labeled r/Games discussion.",
    tech: ["Python", "DistilBERT", "NLP"]
  },
  {
    name: "PS5 Game Discovery RAG",
    repo: "ps5-game-discovery-rag",
    description:
      "Retrieval-augmented game recommender that ingests ten gaming sources, embeds them with Sentence Transformers into ChromaDB, reranks results, and generates grounded answers with source attribution.",
    tech: ["Python", "ChromaDB", "Sentence Transformers", "Llama 3.3"]
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
    const demoLink = createElement("a", { text: "Live Demo" });
    demoLink.href = project.demo;
    links.appendChild(demoLink);
  }

  links.appendChild(
    createExternalLink(
      `https://github.com/${GITHUB_USER}/${project.repo}`,
      "View Code"
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
