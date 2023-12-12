export enum Status {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  OPEN = 'OPEN',
}

export interface Task {
  id: string;
  title: string;
  status: Status;
  description: string;
  category: string;
}
