export abstract class Componenet<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    element: T;
    hostElement: U;
  
    constructor(
      templateId: string,
      hostElementId: string,
      insertAtBegin: boolean,
      newElementId?: string
    ) {
      this.templateElement = document.getElementById(
        templateId
      ) as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId) as U;
  
      const nodeElement = document.importNode(this.templateElement.content, true);
      this.element = nodeElement.firstElementChild as T;
      if (newElementId) {
        this.element.id = `${newElementId}`;
      }
      this.attachForm(insertAtBegin);
    }
    private attachForm(insertAtBegin: boolean): void {
      this.hostElement.insertAdjacentElement(
        insertAtBegin == true ? "afterbegin" : "beforeend",
        this.element
      );
    }
    abstract configureForm(): void;
    abstract renderContent(): void;
  }