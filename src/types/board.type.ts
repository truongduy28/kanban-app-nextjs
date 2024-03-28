export interface BoardItem {
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
}

export type BoardList = BoardItem[];
