import { ComponentType } from "react";

export interface ExerciseBtnProps {
  exerciseID: string;
  textButton: string;
  image: any;
  openModal: (textButton: string, id: string, image: any) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  isWorkoutAlreadyCreated?: boolean;
  workoutID?: string | null;
}

declare const ExerciseBtn: ComponentType<ExerciseBtnProps>;
export default ExerciseBtn;
