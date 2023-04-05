export interface IGsfabButton {
  label: string;
  icon: string;
  condition: boolean;
  color?: string;
  func: () => void;
}
