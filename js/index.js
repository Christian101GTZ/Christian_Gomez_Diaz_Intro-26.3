// Footer
const body = document.body;
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerText = `© Christian Alejandro Gomez Diaz ${thisYear}`;

footer.appendChild(copyright);


// Skills
const skills = [
  "Python",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Git",
  "GitHub",
  "SQL",
  "Supabase",
  "Flask"
];

const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}


// Message form
const messageForm = document.querySelector("form[name='leave_message']");
const messageSection = document.querySelector("#messages");
const messageList = messageSection.querySelector("ul");

messageForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;

  console.log(name, email, message);

  const newMessage = document.createElement("li");

  newMessage.innerHTML = `
    <a href="mailto:${email}">${name}</a>
    <span> - ${message}</span>
  `;

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function() {
    newMessage.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  event.target.reset();
});


// Best projects to show
const featuredProjects = [
  "Vibe_Check",
  "ps5-game-discovery-rag",
  "provenance-guard",
  "The_Archive",
  "elden-ring-boss-dashboard",
  "pathreview"
];


// Fetch GitHub repositories
fetch("https://api.github.com/users/Christian101GTZ/repos?per_page=100")
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to load GitHub repositories.");
    }

    return response.json();
  })

  .then(data => {
    // Store the GitHub data
    const repositories = data;

    // Show all repositories in the console
    console.log(repositories);

    // Select the Projects section
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");

    // Only show the six featured projects you wanted
    const projectNames = [
      "Vibe_Check",
      "ps5-game-discovery-rag",
      "provenance-guard",
      "The_Archive",
      "elden-ring-boss-dashboard",
      "pathreview"
    ];

    const featuredRepos = repositories.filter((repo) =>
      projectNames.includes(repo.name)
    );

    for (let i = 0; i < featuredRepos.length; i++) {
      const project = document.createElement("li");

      const projectLink = document.createElement("a");
      projectLink.href = featuredRepos[i].html_url;
      projectLink.target = "_blank";
      projectLink.rel = "noreferrer";
      projectLink.textContent = featuredRepos[i].name;

      project.appendChild(projectLink);
      projectList.appendChild(project);
    }
  })

  // Handle errors
  .catch(error => {
    console.log(error);

    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");

    const errorMessage = document.createElement("li");

    errorMessage.innerText =
      "Sorry, GitHub projects could not be loaded.";

    projectList.appendChild(errorMessage);
  });