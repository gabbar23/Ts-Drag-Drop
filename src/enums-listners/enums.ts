import { Project } from "../models/Project-projectstate-model";

export enum ProjectStatus {
    Active,
    Finished,
  }
  
export type listners = (items: Project[]) => void;