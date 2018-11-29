export interface CountdownProps {
  time: number;
  onTimeChange?: () => number;
}

export interface CountdownState {
  currentTime: number;
}
