import { Componenet } from "../Component/component";
import { autobind } from "../decorators/decorators";
import { Draggable } from "./ddmodels";
import { Project } from "./Project-projectstate-model";


export class ProjectItem
  extends Componenet<HTMLLIElement, HTMLUListElement>
  implements Draggable
{
  private project: Project;

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    console.log(this.hostElement);

    this.project = project;

    this.configureForm();
    this.renderContent();
  }
 @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer?.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
    

  }
  @autobind
  dragEndHandler(event: DragEvent): void {
    console.log(`this is end${event}`);
  }

  configureForm() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      this.project.people.toString();
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
