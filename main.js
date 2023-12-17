const projects = [
  {
    title: "Github-Finder",
    description:
      "GitHub Finder is a web application built with React.js and Tailwind CSS that allows you to search for GitHub users by their username and display their details.",
    githubLink: "https://github.com/tapan31/github-finder",
    liveLink: "https://github-finder-lyart-gamma.vercel.app/",
    imageSrc: "assets/github-finder.png",
  },
  {
    title: "Shopping-List",
    description:
      "A simple web application for managing your Shopping-List. Add, edit, and remove items with ease. Users can also filter items from the list.",
    githubLink: "https://github.com/tapan31/Shopping-List-Project",
    liveLink: "https://shopping-list-project-one.vercel.app/",
    imageSrc: "assets/Shopping List.png",
  },
  {
    title: "Weather-App",
    description:
      "The Weather App is a simple web application that allows users to get weather information for a specific city or location.",
    githubLink: "https://github.com/tapan31/Weather-App",
    liveLink: "https://weather-app-tau-roan.vercel.app/",
    imageSrc: "assets/Weather App.png",
  },
  {
    title: "Tip-Calculator",
    description:
      "The Tip Calculator is a simple web application that helps you calculate the tip amount and split the bill among multiple people.",
    githubLink: "https://github.com/tapan31/tip-calculator-app",
    liveLink: "https://tapan31.github.io/tip-calculator-app/",
    imageSrc: "assets/Tip Calculator.png",
  },
];

const initApp = () => {
  AOS.init();

  // Scroll to Top
  const scrollTop = document.getElementById("scroll-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  });

  scrollTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Current Year
  const year = document.getElementById("current-year");
  const date = new Date();
  year.innerText = `Copyright © ${date.getFullYear()}`;

  // Show hidden projects
  const showMore = document.getElementById("see-more");
  const hiddenContent = document.getElementById("hiddenContent");
  showMore.addEventListener("click", () => {
    const content = document.getElementById("hiddenContent");
    content.classList.toggle("show");
    content.classList.toggle("hide");
    if (content.classList.contains("show")) {
      projects.slice(3).forEach((project) => {
        generateProjectCard(project, hiddenContent);
      });
      showMore.textContent = "See Less";
    } else {
      setTimeout(() => {
        removeContent(hiddenContent);
        showMore.textContent = "See More";
      }, 300);
    }
  });

  // Typing Effect
  const text = new Typed("#type-text", {
    strings: [`Frontend Developer`, `Freelancer`],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
  });

  // Generate Project
  const projectContainer = document.getElementById("project-container");
  projects.slice(0, 3).forEach((project) => {
    generateProjectCard(project, projectContainer);
  });

  // Form submission to Google Sheet
  const scriptURL = `https://script.google.com/macros/s/AKfycbxM6fB1sOq5D5_6RgXUZB6ffK5sZBM-1XnI6W-dAOKDXXQTGe2Fz8oYbXG_9GUDd2zC/exec`;
  const form = document.forms["submit-to-google-sheet"];

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const toast = document.getElementById("toast");
  const btn = document.getElementById("submitBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = "Submitting...";
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        console.log("Success!", response);
        toast.classList.remove("hide");
        toast.classList.add("show");
        toast.style.backgroundColor = "green";
        hideToast();
        btn.disabled = false;
        btn.textContent = "Submit";
      })
      .catch((error) => {
        console.error("Error!", error.message);
        toast.textContent = `Something went wrong !!`;
        toast.style.backgroundColor = "red";
        toast.classList.remove("hide");
        toast.classList.add("show");
        hideToast();
        btn.disabled = false;
        btn.textContent = "Submit";
      });
    name.value = "";
    email.value = "";
    message.value = "";
  });

  const hideToast = () => {
    setTimeout(() => {
      toast.classList.add("hide");
      toast.classList.remove("show");
    }, 1500);
  };
};

const generateProjectCard = (project, container) => {
  const card = document.createElement("div");
  card.className = "col-md-6 col-lg-4";
  card.innerHTML = `
    <div class="card">
      <div class="img-container">
        <img src="${project.imageSrc}" alt="" class="card-img-top img-fluid">
      </div>
      <div class="card-body">
        <h5 class="card-title">${project.title}</h5>
        <p class="card-text">${project.description}</p>
        <a href="${project.githubLink}" target="_blank" class="btn btn-outline-dark rounded-2 me-2">
          <i class="fa-brands fa-github fa-lg"></i>
        </a>
        <a href="${project.liveLink}" target="_blank" class="btn btn-outline-dark rounded-2">
          <i class="fa-solid fa-link"></i>
        </a>
      </div>
    </div>
  `;
  container.appendChild(card);
};

const removeContent = (container) => {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
};

document.addEventListener("DOMContentLoaded", initApp);
