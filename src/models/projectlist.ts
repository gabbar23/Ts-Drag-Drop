import { Componenet } from "../Component/component";
import { autobind } from "../decorators/decorators";
import { ProjectStatus } from "../enums-listners/enums";
import { DragTarget } from "./ddmodels";
import { Project, projectState } from "./Project-projectstate-model";
import { ProjectItem } from "./projectitem";

export class Projectlist
  extends Componenet<HTMLElement, HTMLDivElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];
    // const nodeElement = document.importNode(this.templateElement.content, true);
    // this.element = nodeElement.firstElementChild as HTMLElement;
    this.configureForm();
    this.renderContent();
  }
  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] == "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }
  @autobind
  dropHandler(event: DragEvent): void {
    const prjID = event.dataTransfer?.getData("text/plain")!;
    projectState.updateProject(
      prjID,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";

    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
  configureForm(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      const revelanetProjects = projects.filter((prj) => {
        if (this.type == "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = revelanetProjects;
      this.renderProjects();
    });
  }
  renderContent() {
    const listid = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listid;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "PROJECTS";
  }
}
