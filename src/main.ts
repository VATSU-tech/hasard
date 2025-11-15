import { App } from "./App";
import {
  input,
  btnUndo,
  // btnExport,
  // btnPrint,
  btnReset,
  btnHasard,
  btnAjout,
  selectGroupe,
  inputCheckbox,
  btnAfficher,
  nomContainer,
  toggleBtn,
  // nombreParticipants,
} from "./dom";

// init app (charge storage automatiquement dans constructeur)
const app = new App();

function clearInputStyle() {
  input.style.boxShadow = "";
}

// Ajout
btnAjout.addEventListener("click", () => {
  const added = app.addParticipant(input.value);
  if (!added) {
    input.style.boxShadow = "0 0 20px red";
    input.focus();
    return;
  }
  input.value = "";
  clearInputStyle();
  // btnReset.disabled = false;
  nomContainer.scrollTop = nomContainer.scrollHeight;
  btnAfficher.style.display = (nomContainer.getElementsByTagName('div').length > 3) ? 'inline-block' : 'none';
  // nombreParticipants.textContent = app.getParticipantsCount();
}); 
 
// Entrée clavier
input.addEventListener("input", () => {
  input.classList.add("inputAnimation");
  input.style.boxShadow = "";
});
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") btnAjout.click();
});

// Reset
btnReset.addEventListener("click", (e) => {
  e.preventDefault();
  app.reset();
  btnUndo.disabled = true;
  // btnReset.disabled = true;
});

// Toggle groupe select
inputCheckbox.addEventListener("change", () => {
  selectGroupe.style.display = inputCheckbox.checked ? "inline-block" : "none";
});

// Générer
btnHasard.addEventListener("click", () => {
  if (inputCheckbox.checked) {
    const size = parseInt(selectGroupe.value, 10) || 1;
    const groups = app.generateRandomGroups(size);
    app.renderGroups(groups);
  } else {
    const order = app.generateRandomOrder();
    app.renderOrder(order);
  }
});

// Undo handling
btnUndo.addEventListener("click", () => {
  app.undoDelete();
  btnUndo.disabled = true;
  btnAfficher.style.display = (nomContainer.getElementsByTagName('div').length > 3) ? 'inline-block' : 'none';
  // nombreParticipants.textContent = app.getParticipantsCount();
});

// Enable undo button when deletion occurs
document.addEventListener("participantDeleted", () => {
  btnUndo.disabled = false;
});

// Export CSV
function downloadCSV(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

// btnExport.addEventListener("click", () => {
//   // build CSV from participants in storage
//   // simple header + name lines
//   const raw = localStorage.getItem("hasard_app_participants");
//   const participants = raw ? JSON.parse(raw) as {id:number,name:string}[] : [];
//   let csv = "id,name\n";
//   participants.forEach((p) => {
//     // escape quotes
//     const safeName = (p.name || "").replace(/"/g, '""');
//     csv += `${p.id},"${safeName}"\n`;
//   });
//   downloadCSV("participants.csv", csv);
// });

// Print
// btnPrint.addEventListener("click", () => {
//   window.print();
// });

// Register service worker if available (PWA readiness)
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/src/sw.js").then((reg) => {
//       console.log("ServiceWorker registered:", reg.scope);
//     }).catch((err) => {
//       console.warn("ServiceWorker registration failed:", err);
//     });
//   });
// }
 

btnAfficher.addEventListener('click', ()=> {
  nomContainer.classList.toggle('plusMoins')
  btnAfficher.textContent = nomContainer.classList.contains('plusMoins') ? 'Afficher plus' : 'Afficher moins';})

 btnAfficher.style.display = (nomContainer.getElementsByTagName('div').length > 3) ? 'inline-block' : 'none';
  // nombreParticipants.textContent = app.getParticipantsCount();
// Thème clair/sombre


 // import {toggleBtn} from '../dom'
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

    // 🪄 Applique le thème
    document.documentElement.setAttribute("data-theme", currentTheme); 

    // 🕹️ Quand on clique, on bascule entre clair / sombre
toggleBtn.innerHTML = currentTheme === "light" ? `<i class="fa-solid fa-moon"></i> Mode sombre` :  `<i class="fa-solid fa-sun"></i> Mode clair`;

toggleBtn.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme");
  const newTheme = theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggleBtn.innerHTML = newTheme === "light" ?  `<i class="fa-solid fa-moon" ></i> Mode sombre` :  `<i class="fa-solid fa-sun"></i> Mode clair` ;
});

document.addEventListener('load', ()=>{
  // nombreParticipants.textContent = app.getParticipantsCount();
});