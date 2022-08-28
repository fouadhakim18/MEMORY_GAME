let overlays = document.querySelectorAll(".overlay");
let starts = document.querySelectorAll(".start");
let itemsFlipped;
let itemsTapped = [];
let items = document.querySelectorAll(".box");
let tries = document.querySelector(".tries span");
let counter = document.querySelector(".counter p");
let arrayOfNums = [...Array(items.length).keys()];
let level;
let hiddenCards = document.querySelectorAll(".hide");
let time;
let counterDown;

starts.forEach((start) => {
  start.addEventListener("click", () => {
    itemsTapped = [];
    itemsFlipped = 0;
    tries.innerHTML = 0;
    document.getElementById("music").play();
    shuffle(arrayOfNums);
    if (start.id == "begin") {
      userPrompt(); // ask for name only when he starts first time
      level = 1;
    }
    overlays.forEach((overlay) => {
      overlay.style.display = "none";
    });

    items.forEach((item, index) => {
      item.style.order = arrayOfNums[index];
      item.classList.add("is-flipped");   // show all cards
      setTimeout(() => {
        item.classList.remove("is-flipped"); // hide cards after 1.5s
      }, 1500);
    });
    setTimeout(() => {
      setTime();   // counter according to level
      counterDown = setInterval(countDown, 1000);
      function countDown() {
        time--;
        time < 10
          ? (counter.innerHTML = `00:0${time}`)
          : (counter.innerHTML = `00:${time}`);
        if (time == 0 || checkWinning()) {
          items.forEach((item) => {
            item.classList.remove("is-flipped");
          });
          document.getElementById("music").pause();
          clearInterval(counterDown);
          document.getElementById("game-over").style.display = "block";
          if (checkWinning()) {
            document.getElementById("end-success").play();
            if (level == 3) {
              document.querySelector("#game-over h1").innerHTML = "You WON !";
              document.querySelector("#next").innerHTML = "Play Again ?";
              startAgain();   // back to level one
            } else {
              document.querySelector("#game-over h1").innerHTML = "Continue ?";
            }
            level++;
            document.querySelector(".level span").innerHTML = level;
            nextLevel(level, hiddenCards);
          } else {
            document.getElementById("fail").play();
            document.querySelector("#game-over h1").innerHTML = "Play Again ?";
            startAgain();
            level++;
            document.querySelector(".level span").innerHTML = level;
          }
        }
      }
    }, 1500);
  });
});
items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("is-flipped");
    itemsTapped.push(item);
    if (itemsTapped.length === 2) {
      document.querySelector(".gallery").classList.add("no-clicking");
      setTimeout(() => {
        checkMatchingCards(itemsTapped);
        document.querySelector(".gallery").classList.remove("no-clicking");
        itemsTapped = [];
      }, 500);
    }
  });
});

//Functions
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
function checkMatchingCards(cards) {
  if (cards[0].dataset.lang !== cards[1].dataset.lang) {
    cards[0].classList.remove("is-flipped");
    cards[1].classList.remove("is-flipped");
    tries.innerHTML++;
  } else {
    document.getElementById("success").play();
    itemsFlipped++;
  }
}
function userPrompt() {
  let person = window.prompt("Please enter your name : ");
  document.querySelector(".name span").innerHTML =
    person == "" ? "Unknown" : person;
}
function checkWinning() {
  return (
    (level == 1 && itemsFlipped == 6) ||
    (level == 2 && itemsFlipped == 8) ||
    (level == 3 && itemsFlipped == 10)
  );
}
function nextLevel(level, hidden) {
  if (level >= 2) {
    hidden[0].classList.remove("hide");
    hidden[5].classList.remove("hide");
    hidden[2].classList.remove("hide");
    hidden[7].classList.remove("hide");
    if (level == 3) {
      hidden[4].classList.remove("hide");
      hidden[1].classList.remove("hide");
      hidden[3].classList.remove("hide");
      hidden[6].classList.remove("hide");
      document.querySelector(".gallery").classList.add("level-3");
    }
  }
}
function startAgain() {
  level = 0;
  document.querySelector(".gallery").classList.remove("level-3");
  hiddenCards.forEach((card) => {
    card.classList.add("hide");
  });
}
function setTime() {
  if (level == 1) {
    time = 20;
  } else if (level == 2) {
    time = 35;
  } else {
    time = 42;
  }
  counter.innerHTML = `00:${time}`;
}
