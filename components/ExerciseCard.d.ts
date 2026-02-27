import { FC } from 'react';

export interface ExerciseCardProps {
  exerciseName: string;
  muscleGroup: string;
  numberOfSets: number;
  numberOfReps: number;
  weight: number;
  restMinutes: number;
  restSeconds: number;
  isEditable?: boolean;
  exerciseID: string;
  openModalCustomSets?: (
    exerciseName: string,
    exerciseID: string,
    weight: number,
    numberOfReps: number,
    numberOfSets: number,
    restMinutes: number,
    restSeconds: number,
    muscleGroup: string,
  ) => void;
  handleDelete?: (exerciseID: string) => void;
  startExercise?: (exerciseID: string) => void;
  accessibilityLabel?: string;
  image?: string;
  exerciseAddedImg?: string;
}

declare const ExerciseCard: FC<ExerciseCardProps>;
export default ExerciseCard;
