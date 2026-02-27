import { ReactNode } from 'react';

export interface HystoryWorkoutProps {
  name: string;
  date: string;
  stars: ReactNode;
  ressenti: string;
  workouts: ReactNode;
  accessibilityLabel?: string;
}

declare function HystoryWorkout(props: HystoryWorkoutProps): JSX.Element;
export default HystoryWorkout;
