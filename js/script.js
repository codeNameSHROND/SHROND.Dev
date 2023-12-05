const body = document.querySelector("body");
const toggleDarkLight = document.getElementById("toggleDarkLight");
const currentTheme = localStorage.getItem("theme");
const loadingPercentage = document.getElementById("loadingPercentage");
const loadingContainer = document.querySelector(".loading-container");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

if (currentTheme) {
  body.classList.add(currentTheme);
  if (currentTheme === "light-mode") {
    toggleDarkLight.innerHTML =
      '<i class="fa-regular fa-sun fa-beat-fade"></i>';
  } else {
    toggleDarkLight.innerHTML = '<i class="fa-solid fa-moon fa-beat-fade"></i>';
  }
} else {
  body.classList.add("light-mode");
  toggleDarkLight.innerHTML = '<i class="fa-regular fa-sun fa-beat-fade"></i>';
}

function toggleLoadingVisibility() {
  document.querySelector(".loading-container p").style.opacity = 0;
  loadingContainer.classList.toggle("hide");
}

function showLoadingWithTime() {
  toggleLoadingVisibility();
  toggleResponsiveNavLinks();
  setTimeout(() => {
    toggleLoadingVisibility();
  }, 1000);
}

function changeThemeWithLoading() {
  toggleLoadingVisibility();
  setTimeout(() => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      toggleDarkLight.innerHTML =
        '<i class="fa-regular fa-sun fa-beat-fade"></i>';
      localStorage.setItem("theme", "light-mode");
    } else {
      toggleDarkLight.innerHTML =
        '<i class="fa-solid fa-moon fa-beat-fade"></i>';
      localStorage.setItem("theme", "dark-mode");
    }
    setTimeout(() => {
      toggleLoadingVisibility();
    }, 1000);
  }, 1000);
}

toggleDarkLight.onclick = function () {
  changeThemeWithLoading();
};

// -------------------------------------------------------------------------------------------------------- //

function toggleResponsiveNavLinks() {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  hamburger.classList.toggle("toggle");
}

hamburger.addEventListener("click", () => {
  toggleResponsiveNavLinks();
});

// -------------------------------------------------------------------------------------------------------- //

function updateProgress(resourcesLoaded, totalResources) {
  const progress = (resourcesLoaded / totalResources) * 100;
  const formattedProgress = progress.toFixed(0).padStart(3, "0"); // Format the progress
  loadingPercentage.innerText = `${formattedProgress}%`;
}

function state() {
  const resources = [];
  const performanceEntries = performance.getEntries();
  performanceEntries.forEach((entry) => {
    const initiatorType = entry.initiatorType;
    const resourceName = entry.name;

    if (
      initiatorType === "navigation" ||
      initiatorType === "script" ||
      initiatorType === "link" ||
      initiatorType === "img" ||
      initiatorType === "css" ||
      initiatorType === "font" ||
      initiatorType === "fetch" ||
      (initiatorType === "other" && resourceName.includes(".php"))
    ) {
      resources.push(resourceName);
    }
  });

  let loadedResources = 0;
  let totalResources = resources.length;

  resources.forEach((resource) => {
    fetch(resource)
      .then((response) => {
        if (response.ok) {
          loadedResources++;
          updateProgress(loadedResources, totalResources);
        }
      })
      .catch((error) => {
        // Handle errors if needed
      });
  });
  setTimeout(() => {
    loadingContainer.classList.add("hide");
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    state();
  }, 1000);
});

// alert(
//   "This website is currently under development. Thank you for your patience."
// );
