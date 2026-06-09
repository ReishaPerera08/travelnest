//====== mobile hamburger menu ======//
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
});

// ===== REGISTER SERVICE WORKER (PWA offline support) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js")
      .then(function () { console.log("Service worker registered ✅"); })
      .catch(function (err) { console.log("Service worker failed:", err); });
  });
}