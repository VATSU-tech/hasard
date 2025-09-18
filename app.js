const nom = document.getElementById("noms");
const input = document.getElementById("input");
const result = document.getElementById("result");
const btnReset = document.getElementById("btn-reset");
const errorText = document.getElementById("errorText");
const btnHasard = document.getElementById("btn-hasard");
const btnAjout = document.getElementById("btn-ajouter");
const selectGroupe = document.getElementById("selectGroupe");
const inputCheckbox = document.getElementById("checkGroupe");

let data = [];
let state = 0;
let index = 0;
let place = 0;
let nombre = 0;
let place2 = 0;
let donnees = 0;
let hasard = null;
let nomGroupe = 0;
let dataResult = [];
let grouplength = 0; 

//----------------------------------------
//style de base
//---------------------------------------
input.classList = "inputAnimation";
btnHasard.style.opacity = "0";
btnReset.style.opacity = "0";
result.style.opacity = "0";
nom.style.opacity = "0";

//-----------------------------------------------
//fonctions
//----------------------------------------------

//ajouter un nom_______________________________________________
addName = ()=>{
  if (input.value === "") {
    input.classList = "";
    input.style.boxShadow = "0 0 20px red";
  } else {
    input.classList = "inputAnimation";
    input.style.boxShadow = "0 0 9px white";
    data.push(input.value);
    place2 += 1;
    nom.innerHTML += "<p>" + place2 + ". " + input.value + " </p> ";
    input.value = "";
    nom.style.opacity = "1";
    btnHasard.style.opacity = "1";
    console.log(data);
  }
}

//genere hasard_________________________________________________
genereHasard = ()=>{
  while (data.length > dataResult.length) {
      place += 1;
      result.style.opacity = "1";
      btnHasard.style.opacity = "1";
      btnReset.style.opacity = "1";
      hasard = data[Math.floor(Math.random() * data.length)];
      index = data.findIndex((e) => e === hasard);
      
      result.innerHTML += `<p>${place}. ${data[index]}</p>`;
      data.splice(index, 1);
      console.log(data);
      state = true;
    }
    if (data.length === 0) {
      place = 0;
      btnHasard.style.opacity = "0";
      state ? (result.innerHTML += `<h1 style='color:var(--troisieme-color)'>Fin</h1>`) : (state = false);
      state = false;
    } 
}


//genere hasard par groupe_____________________________________________
genereHasardGroupe = (Ngroupe)=>{ 
  while (data.length > dataResult.length) {
    result.innerHTML += `<h2 style=' margin:0;'> Groupe ${nomGroupe += 1} </h2>`;
    if(data.length <= Ngroupe) Ngroupe = data.length
    while(Ngroupe > grouplength){
      if(data[index] === undefined)console.log(data[index])
        place += 1;
        result.style.opacity = "1";
        btnHasard.style.opacity = "1";
        btnReset.style.opacity = "1";
        hasard = data[Math.floor(Math.random() * data.length)];
        index = data.findIndex((e) => e === hasard);
        
        result.innerHTML += `<p>${place}. ${data[index]}</p>`;
        data.splice(index, 1);
        grouplength += 1;
        state = true;
    }
    grouplength =0;
  }
    if (data.length === 0) {
      place = 0;
      btnHasard.style.opacity = "0";
      state ? (result.innerHTML += `<h1 style='color:var(--troisieme-color);'>Fin</h1>`) : (state = false);
      state = false;
    } 
}

//-----------------------------------
//execution
//-----------------------------------

//ajouter_______________________________________________
inputCheckbox.addEventListener( "click", () => (selectGroupe.style.display = inputCheckbox.checked ? "inline-block" : "none"));

btnAjout.addEventListener("click", (e) => { 
  addName();
});

input.addEventListener('input', ()=> input.classList =('inputAnimation'))

document.addEventListener("keydown", (e) => { 
  if (e.key === "Enter") {
    btnAjout.click(); // Simule un clic sur le bouton
  }
});


//hasard_______________________________________________
btnHasard.addEventListener("click", () => { 
  let valueSelected = parseInt(selectGroupe.value);
  inputCheckbox.checked ? genereHasardGroupe(valueSelected) : genereHasard();
});

btnReset.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});