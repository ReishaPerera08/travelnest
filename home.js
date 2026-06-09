// Hero rotating quotes 

// list of travel quotes as an array of OBJECTS, each with text + author)
const quotes = [
  { text: "Travel is the only thing you buy that makes you richer.", author: "Anonymous" },
  { text: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
  { text: "Adventure is worthwhile.", author: "Aesop" },
  { text: "To travel is to live.", author: "Hans Christian Andersen" },
  { text: "Travel far enough, you meet yourself.", author: "David Mitchell" },
  { text: "The journey not the arrival matters.", author: "T.S. Eliot" },
  { text: "Traveling leaves you speechless, then turns you into a storyteller.", author: "Ibn Battuta" },
  { text: "Life is short and the world is wide.", author: "Simon Raven" },
  { text: "Travel is the best education.", author: "Anonymous" },
  { text: "The world is full of wonderful things you haven't seen yet. Don't ever give up on the chance of seeing them.", author: "J.K. Rowling" }
];

//get reference to the quote paragraph
const txtQuote = document.getElementById("hero-quote");
let quoteIndex = 0;

// helper: format one quote object as: "text" — Author
function showQuote(i) {
  const q = quotes[i];
  txtQuote.innerText = `"${q.text}"\n\n— ${q.author}`;
}

// show the first quote straight away
showQuote(quoteIndex);

// every 5 seconds, move to the next quote (loop back at the end)
setInterval(function () {
  quoteIndex = quoteIndex + 1;
  if (quoteIndex >= quotes.length) {
    quoteIndex = 0;
  }
  showQuote(quoteIndex);
}, 5000);

//=====destination of the day=====//

//get reference to the dotd box
const dotd = document.getElementById("dotd");

// workout today's 'day number' of the year
const today = new Date();     //todays date & time
const startOfYear = new Date(today.getFullYear(), 0, 0);  //midnight before jan1
const millisIntoYear = today - startOfYear;    //how many ms into the yr
const oneDayInMillis = 1000 * 60 * 60 * 24;   //ms in a single day
const dayOfYear = Math.floor(millisIntoYear / oneDayInMillis);

//use the tht num to pick 1 destination from list
const todayIndex = dayOfYear % destinations.length; //wrap around if we go past the end
const pick = destinations[todayIndex];

//build a card and show it in the dotd box
dotd.innerHTML = `
    <img src="${pick.image}" alt="${pick.name}">
    <div class="dotd-info">
        <h3>${pick.name}, ${pick.country}</h3>
        <p>${pick.description}</p>
        <a href="explore.html" class="btn-primary">See more destinations</a>
    </div>
`;

// ===== NEWSLETTER SIGN-UP =====
const txtEmail = document.getElementById("newsletter-email");
const btnSubscribe = document.getElementById("newsletter-btn");
const newsletterMsg = document.getElementById("newsletter-msg");

btnSubscribe.addEventListener("click", function () {
  const email = txtEmail.value.trim();   // read what the user types and remove spaces

  if (email === "") {
    newsletterMsg.innerText = "Please enter your email.";
    return;
  }

  localStorage.setItem("newsletterEmail", email);
  newsletterMsg.innerText = "Thanks for subscribing! 🎉";
  txtEmail.value = "";                   // clears the input box
});
