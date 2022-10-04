import "reflect-metadata";
import {IsNotEmpty,IsNumber, validate} from 'class-validator';
import { plainToClass } from "../node_modules/class-transformer/index";
import { ProjectInput } from "./models/projectinput";
import { Projectlist } from "./models/projectlist";


import _ from "lodash";

new ProjectInput();
new Projectlist("active");
new Projectlist("finished");

const jsonData = [
  { id: "44", title: "" },
  {
    id: 14,
    title: "daman",
  },
];

class ProjectSample {

@IsNumber()
  id: number;
  @IsNotEmpty()
  title: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.title = name;
  }
  getNameandId() {
    return `${this.id} --> ${this.title}`;
  }
}

const newData = plainToClass(ProjectSample, jsonData);
newData.forEach((projsampleObj) => (
validate(projsampleObj).then(errors=>{if(errors.length>0) console.log(errors);
}
)));
newData.forEach((projsampleObj) => console.log(projsampleObj.getNameandId()));
