const nom = document.getElementById("noms") as HTMLElement;
const input = document.getElementById("input") as HTMLInputElement;
const result = document.getElementById("result") as HTMLElement;
const btnReset = document.getElementById("btn-reset") as HTMLButtonElement;
const errorText = document.getElementById("errorText") as HTMLElement;
const btnHasard = document.getElementById("btn-hasard") as HTMLButtonElement;
const btnAjout = document.getElementById("btn-ajouter") as HTMLButtonElement;
const selectGroupe = document.getElementById("selectGroupe") as HTMLSelectElement;
const inputCheckbox = document.getElementById("checkGroupe") as HTMLInputElement;
const annimationContainer = document.querySelector('.annimation') as HTMLElement;

let data: string[] = [];
let state: boolean;
let index = 0;
let place = 0;
let nombre = 0;
let place2 = 0;
let donnees = 0;
let hasard = '';
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

//------------------------------------------
//annimations
//------------------------------------------

annimationContainer.innerHTML = `<div class="pcb" aria-hidden="true">
            <svg viewBox="0 0 1200 800">
                <!-- Traces -->
                <path class="trace dim" d="M40 120 C 240 60, 380 240, 560 140 S 840 40, 1140 120" />
                <path class="trace pulse" d="M60 280 C 240 200, 420 360, 600 260 S 900 200, 1140 260" />
                <path class="trace pulse reverse"
                    d="M100 420 C 180 380, 260 520, 360 460 S 540 360, 760 440 S 980 560, 1120 520" />
                <path class="trace pulse" d="M80 600 C 220 540, 380 700, 560 620 S 820 520, 1100 620" />

                <!-- Nodes -->
                <circle class="node blink" cx="120" cy="110" r="3" />
                <circle class="node" cx="360" cy="170" r="3" />
                <circle class="node blink" cx="560" cy="140" r="4" />
                <circle class="node" cx="920" cy="90" r="3" />
                <circle class="node blink" cx="180" cy="420" r="4" />
                <circle class="node" cx="360" cy="460" r="3" />
                <circle class="node blink" cx="760" cy="440" r="4" />
                <circle class="node" cx="980" cy="560" r="3" />
                <circle class="node blink" cx="220" cy="600" r="4" />
                <circle class="node" cx="560" cy="620" r="3" />
                <circle class="node blink" cx="980" cy="620" r="4" />
            </svg>
        </div>
        <!-- ====== WAVES ====== -->
        <div class="waves" aria-hidden="true">
            <div class="wave">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#0c1a35" fill-opacity="0.8"
                        d="M0,160L60,144C120,128,240,96,360,117.3C480,139,600,213,720,229.3C840,245,960,203,1080,170.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                    </path>
                </svg>
            </div>
            <div class="wave">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#0a1530" fill-opacity="0.7"
                        d="M0,64L80,69.3C160,75,320,85,480,117.3C640,149,800,203,960,208C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                    </path>
                </svg>
            </div>
            <div class="wave">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#071026" fill-opacity="0.65"
                        d="M0,32L48,69.3C96,107,192,181,288,202.7C384,224,480,192,576,165.3C672,139,768,117,864,112C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path>
                </svg>
            </div>
        </div>`;
let i:number = 1;
// while(i < 10){ 
//   selectGroupe.innerHTML=`<option value=${i}>${i}</option>`;
//   i++;
//   console.log(i)
// }

//-----------------------------------------------
//fonctions
//----------------------------------------------

//ajouter un nom_______________________________________________
const addName = ()=>{
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
const genereHasard = ()=>{
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
const genereHasardGroupe = (Ngroupe:number)=>{ 
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
// ________________________________________________________________________________________________________________________________________________________
