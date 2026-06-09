// =====contact form=====
const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const messageInput = document.getElementById("contact-message");
const submitBtn = document.getElementById("contact-submit");
const feedback = document.getElementById("contact-feedback");

submitBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  //validation: all fields must be filled
  if (name === "" || email === "" || message === "") {
    feedback.innerHTML = "<span class='error'>Please fill in all fields.</span>";
    return;
  }

  // email must look like this:
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    feedback.innerHTML = "<span class='error'>Please enter a valid email address.</span>";
    return;
  }

  //save message to localStorage
    const messageObj = {
    name: name,
    email: email,
    message: message,
    date: new Date().toLocaleString()
  };

  // messages are a growing list
  const stored = localStorage.getItem("contactMessages");
  const messages = stored === null ? [] : JSON.parse(stored);
  messages.push(messageObj);
  localStorage.setItem("contactMessages", JSON.stringify(messages));

  //success feedback and clear form
  feedback.innerHTML = "<span class='success'>✅ Thanks " + name + "! Your message has been sent.</span>";
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
});

// =====faq=====
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
  question.addEventListener("click", function () {
    const item = question.parentElement;
    const alreadyOpen = item.classList.contains("open");

    // close all items first
    document.querySelectorAll(".faq-item").forEach(function (i) {
      i.classList.remove("open");
    });

    
    if (!alreadyOpen) {
      item.classList.add("open");
    }
  });
});