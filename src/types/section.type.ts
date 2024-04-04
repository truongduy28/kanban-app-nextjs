import { ITask } from "./task.type";

export interface ISection {
  _id: string;
  board: string;
  title: string;
  __v: number;
  tasks: ITask[];
  id: string;
}

export interface ISectionUpdateBody {
  title: string;
}
