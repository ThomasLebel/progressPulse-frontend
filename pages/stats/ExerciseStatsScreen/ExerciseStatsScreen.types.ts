import { PerformanceSet } from '../../../shared/types';

export interface ChartDataPoint {
  value: number;
  label: string;
  date: string;
  sets: PerformanceSet[];
}

export interface BestPerformance {
  date: string;
  sets: PerformanceSet[];
  volume: number;
}

export interface LastPerformance {
  date: string;
  sets: PerformanceSet[];
}

export interface VolumeChartData {
  labels: string[];
  data: number[];
}
