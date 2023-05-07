import { ColumnTypes } from '../enum/table.enum';

export interface IColumn {
  label: string;
  columnName: string;
  visible: boolean;
  seachable?: boolean;
  width?: string;
  float?: 'LEFT' | 'RIGHT';
  type: ColumnTypes;
  // compare: (a: any, b: any) => any;
}

export interface IFilter extends IColumn {
  value: string | number;
  text: string;
}

export interface IQueryParams {
  entity?: string;
  title: string;
  filters?: IFilter[];
  take?: number;
  page?: number;
  all?: boolean;
}

export interface IDisplayDataState<Type = any> {
  displayData: Array<Type>;
  checkeds: Array<Type>;
  checked: Type;
}
