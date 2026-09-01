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


// Fetch GitHub repositories
fetch("https://api.github.com/users/Christian101GTZ/repos")
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to load GitHub repositories.");
    }

    return response.json();
  })

  .then(data => {
    const repositories = data;

    console.log(repositories);

    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.innerText = repositories[i].name;
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