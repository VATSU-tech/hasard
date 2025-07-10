const input = document.getElementById("input");
const result = document.getElementById("result");
const nom = document.getElementById("noms");
const btnHasard = document.getElementById("btn-hasard");
const btnReset = document.getElementById("btn-reset");
const btnAjout = document.getElementById("btn-ajouter");
let donnees = 0;
let nombre = 0;
let state = 0;
let hasard = null;
let index = 0;
let place = 0;
let place2= 0;
let data = [];
let dataResult = [];


btnHasard.style.opacity = "0"
btnReset.style.opacity = "0"
result.style.opacity = "0"
nom.style.opacity = "0"

btnAjout.addEventListener("click", (e) => {
    e.preventDefault();
    if(input.value === ""){
        input.style.boxShadow = "0 0 20px red"  
    }else{ 
        input.style.boxShadow = "0 0 9px white"
        data.push(input.value); 
        place2 += 1;
        nom.innerHTML += "<p>" +place2+". " +input.value + "</p> ";
        input.value = ""; 
        nom.style.opacity = "1"
        btnHasard.style.opacity = "1"
        console.log(data);
    }
});

  document.addEventListener("keydown",(e)=> {
    if (e.key === "Enter") {
        console.log(e)
      btnAjout.click(); // Simule un clic sur le bouton
    }
  });

btnHasard.addEventListener("click", () => {
    if (data.length === 0){ place = 0;
        btnHasard.style.opacity = "0"
        state ? result.innerHTML += `<h1>Fin</h1>` : state = false;
        state = false;
    } else {
        place += 1;
        result.style.opacity = "1" 
        btnHasard.style.opacity = "1"
        btnReset.style.opacity = "1"
        hasard = data[Math.floor(Math.random() * data.length)];
        index = data.findIndex((e) => e === hasard);

        result.innerHTML += `<p>${place}. ${data[index]} </p>`;
        data.splice(index, 1);
        console.log(data);
        state = true;
    }
    console.log(state)
});

btnReset.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload()});    

    /* faire en sotye que le nom puisse s'effacer lorsqu'il est choisie qu hasard*/