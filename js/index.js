// =========================================================
// Christian Gomez Diaz — Portfolio scripts
// Sections rendered here: footer, skills, featured projects,
// GitHub repositories, and the contact form.
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

// Every entry is backed by a project card or an Experience card on
// this page. Anything only used in private or unfinished work is
// labeled as such.
const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "HTML", "CSS"]
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "Sentence Transformers",
      "ChromaDB",
      "Hugging Face Transformers",
      "LLM pipelines & tool orchestration",
      "Gemini API",
      "Groq API"
    ]
  },
  {
    title: "Tools & Frameworks",
    skills: [
      "React",
      "Vite",
      "Flask",
      "SQLAlchemy",
      "Supabase",
      "Streamlit",
      "Gradio",
      "Pytest",
      "Docker Compose",
      "Playwright (research prototype)",
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
      "A live site where people post media worth preserving, vote on it, and argue about it in the comments. Supabase Auth gates posting and editing behind sign-in, image uploads go to Supabase Storage, and votes live in a per-user table so a user can switch or remove a vote. Row Level Security policies, configured in Supabase, keep anyone from editing posts that aren't theirs.",
    tech: ["React", "Vite", "Supabase"]
  },
  {
    name: "PathReview — Open-Source Pull Request",
    repo: "pathreview",
    pr: "https://github.com/ascherj/pathreview/pull/546",
    description:
      "A pull request to PathReview, an open-source portfolio review tool. It was detecting JavaScript and TypeScript by filename alone, which missed real cases, so I replaced that with syntax-based regex patterns. Opened against issue #148 and awaiting maintainer review. No new tests: the existing 18 skill-extractor tests show the same 15 passing and 3 pre-existing failures before and after the change.",
    tech: ["Python", "Pytest", "Open Source"]
  },
  {
    name: "PS5 Game Discovery RAG",
    repo: "ps5-game-discovery-rag",
    description:
      "A chatbot that recommends PS5 games and cites where its answers came from. Built from a CodePath starter; the pipeline is mine: 10 gaming sources, MiniLM embeddings, ChromaDB retrieval, query-specific reranking, then Llama 3.3 70B answering from the top 5 chunks, with a system prompt that tells it to say it lacks information rather than fill in from memory. Early versions stored several games per chunk and retrieval got noticeably worse, so I switched to one game per chunk.",
    tech: ["Python", "Sentence Transformers", "ChromaDB", "Groq", "Gradio"]
  },
  {
    name: "VibeCheck",
    repo: "Vibe_Check",
    description:
      "A music recommender you talk to in plain English. Gemini turns the request into structured preferences, asking one follow-up question when the request is too vague to parse, and a deterministic scoring engine ranks a 300-song, 78-genre catalog I labeled by hand. If Gemini rates the results low-confidence, the engine drops the energy constraint and rescores. Checked against 7 user profiles, with a model card.",
    tech: ["Python", "Streamlit", "Gemini 2.5 Flash"]
  },
  {
    name: "FitFindr",
    repo: "FitFindr",
    description:
      "A thrift-shopping assistant built as a three-tool workflow, from a CodePath starter; the tools and planning loop are mine. The loop is hand-written: a keyword search over a 40-listing mock marketplace, then an outfit suggestion from Llama 3.3 70B that works from the user's saved wardrobe, then a short fit-card caption. State passes between steps, and the loop stops after the search when nothing matches, so the model never styles an item that doesn't exist. 5 tests cover the tools.",
    tech: ["Python", "Groq", "Llama 3.3 70B", "Gradio", "Pytest"]
  },
  {
    name: "CineLog API — Watchlist Feature",
    repo: "cinelog-api",
    pr: "https://github.com/Christian101GTZ/cinelog-api/pull/1",
    description:
      "A starter watchlist feature in a Flask and SQLAlchemy REST API that I finished and hardened through a simulated code review with six scripted review comments. I added duplicate prevention, ordering and visibility rules, and tests, rebased onto an upstream UUID migration, and fixed a crash the tests didn't catch by hitting the endpoint end-to-end. 8 tests passing.",
    tech: ["Python", "Flask", "SQLAlchemy", "Pytest"]
  },
  {
    name: "TakeMeter",
    repo: "takemeter",
    codeLabel: "View Write-up & Results",
    description:
      "An NLP experiment sorting r/Games posts into four kinds of discussion. I hand-labeled a balanced 200-post dataset, each post with a written reason for its label, fine-tuned DistilBERT on it in Colab (the notebook isn't in the repo), and compared it to zero-shot Llama 3.3 70B. DistilBERT reached 53.3% and the big model won. The write-up goes through dataset size, label overlap, and the confusion matrix to work out why.",
    tech: ["Python", "Hugging Face Transformers", "DistilBERT", "Groq"]
  }
];

const featuredList = document.querySelector("#featured-projects");

// Keep a handle on each card and its metadata line so the GitHub data
// fetched below can fill it in.
const projectCardsByRepo = new Map();

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
  projectCardsByRepo.set(project.repo, { project, meta });

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
// primary language. Only repositories in featuredProjects are shown,
// and the language is skipped when it already appears in the tag row
// so a card doesn't show "Python" twice.
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
      const entry = projectCardsByRepo.get(repo.name);
      if (!entry || !repo.language) continue;

      const alreadyTagged = entry.project.tech.some(
        tag => tag.toLowerCase() === repo.language.toLowerCase()
      );

      if (!alreadyTagged) {
        entry.meta.textContent = repo.language;
      }
    }
  })

  .catch(error => {
    // The cards already render without this data, so just log it.
    console.error(error);
  });


// ---------------------------------------------------------
// Contact form
//
// Messages go to my inbox through Formspree. To point it at a
// different form, create one at https://formspree.io and paste its
// endpoint URL (https://formspree.io/f/abcdwxyz) into MESSAGE_ENDPOINT.
// ---------------------------------------------------------

const MESSAGE_ENDPOINT = "https://formspree.io/f/mwlvvorq";

const messageForm = document.querySelector("form[name='leave_message']");
const messageStatus = document.querySelector("#message-status");

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

  const submitButton = messageForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  messageStatus.textContent = "Sending…";

  try {
    // _gotcha is Formspree's honeypot: a filled value marks the
    // submission as spam and it is silently discarded.
    await sendMessage({ name, email, message, _gotcha: honeypot });
    messageStatus.textContent = "Thanks! Your message was sent.";
    event.target.reset();
  } catch (error) {
    console.error(error);
    messageStatus.textContent =
      "Sorry, the message could not be sent. Please email me directly instead.";
  }

  submitButton.disabled = false;
});
