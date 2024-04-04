export interface ICreateTaskBody {
  sectionId: string;
}

export interface ITask {
  _id: string;
  section: {
    _id: string;
    board: string;
    title: string;
    __v: number;
    id: string;
  };
  title: string;
  content: string;
  position: number;
  __v: number;
  id: string;
}
