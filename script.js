document.addEventListener("DOMContentLoaded", start);
let actors;
const fil = "actors.json";
let filter = "all";

//første function kaldes efter DOM er loaded
function start() {
  console.log("loaded");
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filterActors));
  // hentData();
}
//eventlistener knyttet til knapperne der vælger hvad for et filter er aktivt
function filterActors() {
  filter = this.dataset.movie; //sæt variabel "filter" til værdien af data-movie på den knap der er klikket på
  document.querySelector(".valgt").classList.toggle("valgt"); //fjern klassen valgt fra den knap
  this.classList.toggle("valgt"); //marker den knap der er klikket på
  vis(actors); // kald funktionen vis(actors) efter nye filter er sat
}

// fetch json
async function hentdata(fil) {
  const resultat = await fetch(fil);
  actors = await resultat.json();
  console.log("actors", actors);
  vis(actors);
}

function vis(actors) {
  const beholder = document.querySelector("main");
  const skabelon = document.querySelector("template").content;
  beholder.textContent = ""; //ryd container inden ny loop
  actors.forEach((actor) => {
    if (filter == actor.movie || filter == "all") {
      const klon = skabelon.cloneNode(true);
      klon.querySelector("h2").textContent = actor.fullname;
      klon.querySelector("article").addEventListener("click", () => visDetaljer(actor));
      beholder.appendChild(klon);
    }
  });
}

// function for popup
function visDetaljer(actor) {
  console.log(actor);
  modal.querySelector("h2").textContent = actor.fullname;
  modal.querySelector("p").textContent = "Starred in the movie " + actor.movie;
  modal.style.display = "block";
  document.querySelector("#close").addEventListener("click", lukDetaljer);
}

function lukDetaljer() {
  modal.style.display = "none";
}

hentdata(fil);
