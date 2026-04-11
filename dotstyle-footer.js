// Load the custom CSS dynamically
let head = document.querySelector("head");
let surveyStyle = surveyStyleSheet(
  "https://codes.ghlsaaskits.com/dot-survey-main.css"
);
head.append(surveyStyle);

// Select all questions and the main form container
let questions = [...document.querySelectorAll(".ghl-question")];
let form = document.querySelector(".hl_form-builder--main");

// Create the progress dots container and append it to the form
let ul = document.createElement("ul");
form.append(ul);
ul.className = "dot-progress-container";

// Create dots for each question
ul.innerHTML = questions
  .map((_, index) => {
    return `<li class="dot ${index === 0 ? "active" : ""}"></li>`;
  })
  .join("");

// Function to update the active class on dots
function updateActiveDot() {
  let dots = ul.querySelectorAll(".dot");
  let index = activeSlideIndex(questions); // Get the current active slide index

  // Remove 'active' class from all dots
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add 'active' class to the current dot
  if (index >= 0 && index < dots.length) {
    dots[index].classList.add("active");
  }
}

// Select the Next button
let nextButton = document.querySelector(".ghl-btn.ghl-footer-next");

// Add listener for Next button to update dots
if (nextButton) {
  nextButton.addEventListener("click", () => {
    setTimeout(() => {
      updateActiveDot();
      checkAndAttachBackButtonListener(); // Check for the Back button when moving to the next slide
    }, 300); // Add a slight delay to account for animations
  });
}

// Function to dynamically attach the Back button listener
function checkAndAttachBackButtonListener() {
  let backButton = document.querySelector(".ghl-btn.ghl-footer-back");

  if (backButton && !backButton.dataset.listenerAttached) {
    backButton.addEventListener("click", () => {
      setTimeout(() => {
        updateActiveDot();
      }, 300); // Add a slight delay to account for animations
    });
    backButton.dataset.listenerAttached = true; // Mark the listener as attached
  }
}

// Helper function to get the index of the currently active slide
function activeSlideIndex(questions = []) {
  let activeSlide = questions.find((slide) =>
    slide.classList.contains("ghl-page-current")
  );
  return questions.indexOf(activeSlide); // Returns 0-based index
}

// Function to dynamically load the CSS
function surveyStyleSheet(url) {
  let style = document.createElement("link");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("surveyStyle", "true");
  style.href = url;
  return style;
}

// Initial setup to ensure the correct dot is active when the page loads
updateActiveDot();
checkAndAttachBackButtonListener(); // Check for the Back button at the start