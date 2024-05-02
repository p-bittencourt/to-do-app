import displayCard from '../util/displayCard';
import { deleteProject, editProject } from '../util/projectStorage';

export default function displayProjects(projects) {
  const projectDisplay = document.createElement('div');
  projectDisplay.classList.add('project-display');
  const h3 = document.createElement('h3');
  h3.textContent = 'Projects';
  projectDisplay.appendChild(h3);

  if (projects.length == 0) {
    const p = document.createElement('p');
    p.textContent = 'No projects to display';
    projectDisplay.appendChild(p);
  } else {
    projects.forEach((project) => {
      projectDisplay.appendChild(projectCard(project));
    });
  }

  return projectDisplay;
}

const projectCard = (project) => {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('card');
  projectDiv.id = project.id;

  projectDiv.appendChild(displayCard(project, deleteProject, editProject));
  return projectDiv;
};
