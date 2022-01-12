//Grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 8;

//link text
playerLivesCount.textContent = playerLives;

//generate the data
const getData = () => [
  { imgSrc: "./images/aavikko.jpg", name: "aavikko" },
  { imgSrc: "./images/boney.jpg", name: "boney" },
  { imgSrc: "./images/dft.jpg", name: "dft" },
  { imgSrc: "./images/edgar.jpg", name: "edgar" },
  { imgSrc: "./images/herra.jpg", name: "herra" },
  { imgSrc: "./images/jk.jpg", name: "jk" },
  { imgSrc: "./images/milky.jpg", name: "milky" },
  { imgSrc: "./images/tracy.jpg", name: "tracy" },
  { imgSrc: "./images/aavikko.jpg", name: "aavikko" },
  { imgSrc: "./images/boney.jpg", name: "boney" },
  { imgSrc: "./images/dft.jpg", name: "dft" },
  { imgSrc: "./images/edgar.jpg", name: "edgar" },
  { imgSrc: "./images/herra.jpg", name: "herra" },
  { imgSrc: "./images/jk.jpg", name: "jk" },
  { imgSrc: "./images/milky.jpg", name: "milky" },
  { imgSrc: "./images/tracy.jpg", name: "tracy" },
];

//randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Card generator function

const cardGenerator = () => {
  const cardData = randomize();
  //generate the html

  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    // attach info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //attach the card to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
// check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("You lost! Try again");
      }
    }
  }
  //check if you won
  if (toggleCard.length === 16) {
    restart("Congratulations! You won");
  }
};

//restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    //randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 8;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};
cardGenerator();
