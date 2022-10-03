import { Componenet } from "../Component/component";
import { autobind } from "../decorators/decorators";
import { Validatable, validate } from "../util/validators";
import { projectState } from "./Project-projectstate-model";

export class ProjectInput extends Componenet<HTMLFormElement, HTMLDivElement> {
    titleElement: HTMLInputElement;
    descriptionElement: HTMLTextAreaElement;
    peopleElement: HTMLInputElement;
  
    constructor() {
      super("project-input", "app", true, "user-input");
      this.titleElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionElement = this.element.querySelector(
        "#description"
      ) as HTMLTextAreaElement;
      this.peopleElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
  
      this.configureForm();
    }
  
    private gatherUserInputs(): [string, string, number] | void {
      const title = this.titleElement.value;
      const description = this.descriptionElement.value;
      const people = this.peopleElement.value;
      const titleValidatable: Validatable = {
        minLength: 2,
        value: title,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: description,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validatable = {
        value: +people,
        required: true,
        min: 1,
        max: 5,
      };
  
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("Invalid Input");
        return;
      }
      return [title, description, +people];
    }
    private clearInputs() {
      this.titleElement.value =
        this.descriptionElement.value =
        this.peopleElement.value =
          "";
    }
  
    @autobind
    private submitHandler(event: Event): void {
      event.preventDefault();
      const inputs = this.gatherUserInputs();
      if (Array.isArray(inputs)) {
        const [title, desc, people] = inputs;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }
  
    configureForm(): void {
      this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent(): void {
      throw new Error("Method not implemented.");
    }
  }