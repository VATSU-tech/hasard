import { Participant } from "./types";
import { nomContainer, result, btnHasard, btnAfficher, nombreParticipants } from "./dom";
import { StorageService } from "./services/storage";
import { getRandomItem } from "./utils/random";

export class App {
  private participants: Participant[] = [];
  private nextId = 1;
  private deletedStack: Participant[] = []; // historique des suppressions

  constructor(initialData?: Participant[]) {
    this.participants =
      initialData && initialData.length
        ? initialData
        : StorageService.load<Participant>();
    if (this.participants.length) {
      this.nextId = Math.max(...this.participants.map((p) => p.id)) + 1;
    }
    this.renderParticipantList();
    this.updateButtons();
  }

  addParticipant(name: string): Participant | null {
    const trimmed = name.trim();
    if (!trimmed) return null;

    const p: Participant = { id: this.nextId++, name: trimmed };
    this.participants.push (p)
    StorageService.save(this.participants);
    this.appendParticipantNode(p);
    this.updateButtons();
    return p;
  }

  deleteParticipant(id: number): void {
    const index = this.participants.findIndex((p) => p.id === id);
    if (index === -1) return;

    // Enregistrer la suppression pour un éventuel "Undo"
    const [removed] = this.participants.splice(index, 1);
    this.deletedStack.push(removed);

    // Sauvegarde et rafraîchissement DOM
    StorageService.save(this.participants);
    this.renderParticipantList();
    this.updateButtons();

    // Dispatch custom event so UI can react (enable undo button)
    const event = new CustomEvent("participantDeleted", { detail: removed });
    document.dispatchEvent(event);
      nombreParticipants.textContent = this.getParticipantsCount();
  btnAfficher.style.display = (nomContainer.getElementsByTagName('div').length > 3) ? 'inline-block' : 'none';
  }

  undoDelete(): void {
    const lastDeleted = this.deletedStack.pop();
    if (!lastDeleted) return;

    this.participants.push(lastDeleted);
    this.participants.sort((a, b) => a.id - b.id);
    StorageService.save(this.participants);
    this.renderParticipantList();
    this.updateButtons();

    // Dispatch event for undo performed
    const event = new CustomEvent("participantUndo", { detail: lastDeleted });
    document.dispatchEvent(event);
  }

  reset(): void {
    this.participants = [];
    this.deletedStack = [];
    this.nextId = 1;
    StorageService.clear();
    this.clearDom();
    this.updateButtons();  
    btnAfficher.style.display = (nomContainer.getElementsByTagName('div').length > 3) ? 'inline-block' : 'none';
  }

  generateRandomOrder(): Participant[] {
    const copy = [...this.participants];
    const order: Participant[] = [];
    while (copy.length) {
      const { item, index } = getRandomItem(copy);
      order.push(item);
      copy.splice(index, 1);
    }
    return order;
  }

  generateRandomGroups(size: number): Participant[][] {
    const order = this.generateRandomOrder();
    const groups: Participant[][] = [];
    while (order.length) {
      groups.push(order.splice(0, size));
    }
    return groups;
  }

  // ---------- DOM ----------
  private clearDom(): void {
    nomContainer.innerHTML = "";
    result.innerHTML = "";
  }

  private renderParticipantList(): void {
    nomContainer.innerHTML = "";
    this.participants.forEach((p) => this.appendParticipantNode(p));
  }

  private appendParticipantNode(p: Participant): void {
    const row = document.createElement("div");
    row.className = "participant-row";

    const name = document.createElement("span");
    name.textContent = `${p.id}. ${p.name}`;

    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    delBtn.title = "Supprimer ce participant";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => this.deleteParticipant(p.id));

    row.appendChild(name);
    row.appendChild(delBtn);
    nomContainer.appendChild(row);
  }

  renderOrder(order: Participant[]): void {
    result.innerHTML = "";
    order.forEach((p, i) => {
      const node = document.createElement("p");
      node.textContent = `${i + 1}. ${p.name}`;
      result.appendChild(node);
    });
    const end = document.createElement("h3");
    end.textContent = "Fin";
    end.style.color = "var(--troisieme-color)";
    result.appendChild(end);
  }

  renderGroups(groups: Participant[][]): void {
    result.innerHTML = "";
    groups.forEach((g, gi) => {
      const title = document.createElement("h2");
      title.textContent = `Groupe ${gi + 1}`;
      result.appendChild(title);
      g.forEach((p, i) => {
        const node = document.createElement("p");
        node.textContent = `${i + 1}. ${p.name}`;
        result.appendChild(node);
      });
    });
    const end = document.createElement("h3");
    end.textContent = "Fin";
    end.style.color = "var(--troisieme-color)";
    result.appendChild(end);
  }

  // ---------- helpers ----------
  count(): number {
    return this.participants.length;
  }

  private updateButtons(): void {
    btnHasard.disabled = this.participants.length === 0;
  }

  Afficher(element: string):void{
    btnAfficher.addEventListener('click', ()=>{
      btnAfficher.classList.toggle('plusMoins');
    })
  }

  getParticipantsCount(): string {
    let participant = this.participants.length ? this.participants.length : '';
    return participant.toString();
  }
}
