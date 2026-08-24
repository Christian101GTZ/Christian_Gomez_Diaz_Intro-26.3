const body = document.body;
const footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");

copyright.innerText = `© Christian Alejandro Gomez Diaz ${thisYear}`;

footer.appendChild(copyright);

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
