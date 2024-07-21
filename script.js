//toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

//about section
function toggleReadMore() {
  var aboutContent = document.querySelector(".about-content");
  var aboutText = document.getElementById("about-text");
  var readMoreBtn = document.getElementById("read-more-btn");
  aboutContent.classList.toggle("expanded");
  if (aboutContent.classList.contains("expanded")) {
    readMoreBtn.innerText = "Read Less";
    aboutText.style.maxHeight = aboutText.scrollHeight + "px"; // Set max-height to the scroll height to expand
  } else {
    readMoreBtn.innerText = "Read More";
    aboutText.style.maxHeight = "9em"; // Set back to initial height to collapse
  }
}

// Set initial max-height for text truncation
document.addEventListener("DOMContentLoaded", function () {
  var aboutText = document.getElementById("about-text");
  aboutText.style.maxHeight = "9em";
});

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      // active sections for animation on scroll
      sec.classList.add("show-animate");
    }
    // if want to use animation that repeats on scroll use this
    else {
      sec.classList.remove("show-animate");
    }
  });

  //sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  //remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animation footer on scroll
  let footer = document.querySelector("footer");

  footer.classList.toggle(
    "show-animate",
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
  );
};

// contact form
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("jSFJc7hCnpPB_QvDY"); // EmailJS publick key ID

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Check if event.target and its elements are defined
      const form = event.target;
      if (
        !form ||
        !form.fullName ||
        !form.emailAddress ||
        !form.mobileNumber ||
        !form.emailSubject ||
        !form.message
      ) {
        console.error("Form fields are missing.");
        alert("Form fields are missing. Please ensure all fields are present.");
        return;
      }

      // Get form data
      let formData = {
        fullName: form.fullName.value,
        emailAddress: form.emailAddress.value,
        mobileNumber: form.mobileNumber.value,
        emailSubject: form.emailSubject.value,
        message: form.message.value,
        toEmail: "kesireddynandhini99@gmail.com", //email address
      };

      // Send email
      emailjs.send("service_wuoqopf", "template_nq2p4ra", formData).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Failed to send email. Please try again.");
        }
      );

      // Clear the form
      form.reset();
    });
});
