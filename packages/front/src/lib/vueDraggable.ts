export type ChangeEvent<T> = {
  moved?: {
    element: T;
    newIndex: number;
    oldIndex: number;
  };
  added?: {
    element: T;
    newIndex: number;
  };
  removed?: {
    element: T;
    oldIndex: number;
  };
};
