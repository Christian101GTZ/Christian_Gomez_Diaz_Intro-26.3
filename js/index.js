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
  text: "Built by hand with HTML, CSS, and JavaScript. No frameworks. "
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
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "SQL", "C++", "HTML", "CSS"]
  },
  {
    // Only technologies used in public GitHub projects.
    title: "AI & Machine Learning",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
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
    title: "Tools & Frameworks",
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
      "A live site where people post media worth preserving, vote on it, and argue about it in the comments. Signed-in users can publish, edit, search, and upload images. Votes live in a per-user table, and Supabase Row Level Security keeps anyone from editing posts that aren't theirs.",
    tech: ["React", "Vite", "Supabase"]
  },
  {
    name: "PS5 Game Discovery RAG",
    repo: "ps5-game-discovery-rag",
    description:
      "A chatbot that recommends PS5 games and cites where its answers came from. Under the hood it's a RAG pipeline over 10 gaming sources: MiniLM embeddings, ChromaDB retrieval, query-specific reranking, then grounded generation. Early versions stored several games per chunk and retrieval got noticeably worse, so I switched to one game per chunk.",
    tech: ["Python", "Sentence Transformers", "ChromaDB", "Groq", "Gradio"]
  },
  {
    name: "VibeCheck",
    repo: "Vibe_Check",
    description:
      "A music recommender you talk to in plain English. Gemini turns the request into structured preferences, a deterministic scoring engine ranks a 300-song, 78-genre catalog I labeled by hand, and if the results are weak Gemini relaxes the constraints and tries again. Evaluated against 7 user profiles, with a model card.",
    tech: ["Python", "Streamlit", "Gemini 2.5 Flash", "Pytest"]
  },
  {
    name: "PathReview — Open-Source Bug Fix",
    repo: "pathreview",
    pr: "https://github.com/ascherj/pathreview/pull/546",
    description:
      "A pull request to PathReview, an open-source portfolio review tool. It was detecting JavaScript and TypeScript by filename alone, which missed real cases, so I replaced that with syntax-based regex patterns. Closed issue #148, 15 tests passing.",
    tech: ["Python", "Pytest", "Open Source"]
  },
  {
    name: "Provenance Guard",
    repo: "provenance-guard",
    description:
      "An API that estimates whether a piece of text was written by a person or an AI, and shows its reasoning. It pairs LLM analysis with stylometric heuristics and includes confidence scores, audit logs, an appeals path, and rate limiting.",
    tech: ["Python", "REST API", "LLMs"]
  },
  {
    name: "CineLog API — Watchlist Feature",
    repo: "cinelog-api",
    pr: "https://github.com/Christian101GTZ/cinelog-api/pull/1",
    description:
      "A watchlist feature added to an existing Flask and SQLAlchemy REST API through a simulated code review. Six rounds of feedback, a rebase onto an upstream UUID migration, and a crash the tests didn't catch that I found by hitting the endpoint end-to-end. 8 tests passing.",
    tech: ["Python", "Flask", "SQLAlchemy", "Pytest"]
  },
  {
    name: "TakeMeter",
    repo: "takemeter",
    codeLabel: "View Write-up & Results",
    description:
      "An NLP experiment sorting r/Games posts into four kinds of discussion. I hand-labeled a balanced 200-post dataset, fine-tuned DistilBERT on it, and compared it to zero-shot Llama 3.3 70B. The big model won. The write-up goes through dataset size, label overlap, and the confusion matrix to work out why.",
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
// GitHub REST API: enrich the featured cards with each repo's
// primary language. Only repositories in featuredProjects are shown.
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

      if (repo.language) {
        meta.textContent = repo.language;
      }
    }
  })

  .catch(error => {
    // The cards already render without this data, so just log it.
    console.error(error);
  });


// ---------------------------------------------------------
// Leave a Message form
//
// To receive messages by email:
//   1. Create a free account at https://formspree.io
//   2. Create a new form and copy its endpoint URL
//      (it looks like https://formspree.io/f/abcdwxyz)
//   3. Paste it into MESSAGE_ENDPOINT below
// Leave it empty and the form only displays messages on the page.
// ---------------------------------------------------------

const MESSAGE_ENDPOINT = "https://formspree.io/f/mwlvvorq";

const messageForm = document.querySelector("form[name='leave_message']");
const messageList = document.querySelector("#messages ul");
const messageStatus = document.querySelector("#message-status");
const formNote = document.querySelector("#Comment .form-note");

if (!MESSAGE_ENDPOINT) {
  formNote.textContent =
    "Messages posted here appear below for this visit only. To get in touch, use the email link above.";
}

async function sendMessage(fields) {
  const response = await fetch(MESSAGE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(fields)
  });

  if (!response.ok) {
    throw new Error(`Form service responded with ${response.status}`);
  }
}

messageForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = event.target.usersName.value.trim();
  const email = event.target.usersEmail.value.trim();
  const message = event.target.usersMessage.value.trim();
  const honeypot = event.target._gotcha.value;

  if (MESSAGE_ENDPOINT) {
    const submitButton = messageForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    messageStatus.textContent = "Sending…";

    try {
      // _gotcha is Formspree's honeypot: a filled value marks the
      // submission as spam and it is silently discarded.
      await sendMessage({ name, email, message, _gotcha: honeypot });
      messageStatus.textContent = "Thanks! Your message was sent.";
    } catch (error) {
      console.error(error);
      messageStatus.textContent =
        "Sorry, the message could not be sent. Please email me directly instead.";
      submitButton.disabled = false;
      return;
    }

    submitButton.disabled = false;
  }

  const newMessage = document.createElement("li");

  // Build the message content safely with DOM methods
  const authorLink = createElement("a", { text: name });
  authorLink.href = `mailto:${email}`;

  newMessage.appendChild(authorLink);
  newMessage.appendChild(createElement("span", { text: ` — ${message}` }));

  // "Dismiss" rather than "Remove" once messages are actually sent,
  // so clearing it from the page doesn't look like unsending it.
  const removeLabel = MESSAGE_ENDPOINT ? "Dismiss" : "Remove";
  const removeButton = createElement("button", { text: removeLabel });
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", `${removeLabel} message from ${name}`);

  removeButton.addEventListener("click", function () {
    newMessage.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  event.target.reset();
});
