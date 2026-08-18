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
