import { ISection } from "./section.type";

export interface IBoardItem {
  _id: string;
  user: string;
  icon: string;
  title: string;
  description: string;
  position: number;
  favourite: boolean;
  favouritePosition: number;
  __v: number;
  id: string;
  sections?: ISection[];
}

export type IBoardList = IBoardItem[];

export interface IUpdateBoardBody {
  title?: string;
  description?: string;
  favourite?: boolean;
}
