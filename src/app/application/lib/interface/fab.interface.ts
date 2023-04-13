export interface IGsfabButton {
  label: string;
  icon: string;
  condition: boolean;
  changeContext?: boolean;
  color?: string;
  func: () => void;
}
