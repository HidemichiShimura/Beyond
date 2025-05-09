export type Set = {
  rep: number;
  weight: number;
};

export type Exercise = {
  name: string;
  sets: Set[];
};

export type Session = {
  date: string;
  data: Exercise[];
};
