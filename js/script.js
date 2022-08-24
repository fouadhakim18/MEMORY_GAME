let overlays = document.querySelectorAll(".overlay");
let starts = document.querySelectorAll(".start");
let name = document.querySelector(".name span");
let itemsFlipped = 0;
starts.forEach((start) => {
  start.addEventListener("click", () => {
    itemsFlipped = 0;
    document.getElementById("music").play();

    let person = "";
    // do {
    //   person = window.prompt("Please enter your name : ");
    // } while (person == "");
    name.innerHTML = person;
    overlays.forEach((overlay) => {
      overlay.style.display = "none";
    });
    document.querySelector("#music").play();
    items.forEach((item, index) => {
      item.classList.add("is-flipped");
      setTimeout(() => {
        item.classList.remove("is-flipped");
        let counter = document.querySelector(".counter p");
        let time = 42;
        let counterDown = setInterval(countDown, 1000);
        function countDown() {
          time--;
          time < 10
            ? (counter.innerHTML = `00:0${time}`)
            : (counter.innerHTML = `00:${time}`);
          if (time == 0 || itemsFlipped == 10) {
            document.getElementById("music").pause();
            clearInterval(counterDown);
            document.getElementById("game-over").style.display = "block";
            if (itemsFlipped == 10) {
              document.querySelector("#game-over h1").innerHTML = "You Won !";
              document.getElementById("end-success").play();
            } else {
              document.querySelector("#game-over h1").innerHTML = "You Losed";
              document.getElementById("fail").play();
            }
          }
        }
      }, 1500);
    });
  });
});

let itemsTapped = [];
let items = document.querySelectorAll(".box");
let tries = document.querySelector(".tries span");

let arrayOfNums = [...Array(items.length).keys()];
shuffle(arrayOfNums);

items.forEach((item, index) => {
  item.style.order = arrayOfNums[index];
  item.addEventListener("click", () => {
    item.classList.add("is-flipped");
    itemsTapped.push(item);
    if (itemsTapped.length === 2) {
      document.querySelector(".gallery").classList.add("no-clicking");
      setTimeout(() => {
        if (itemsTapped[0].dataset.lang !== itemsTapped[1].dataset.lang) {
          itemsTapped[0].classList.remove("is-flipped");
          itemsTapped[1].classList.remove("is-flipped");
          tries.innerHTML++;
        } else {
          document.getElementById("success").play();
          itemsFlipped++;
        }
        document.querySelector(".gallery").classList.remove("no-clicking");
        itemsTapped = [];
      }, 500);
    }
  });
});

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

// show all items
