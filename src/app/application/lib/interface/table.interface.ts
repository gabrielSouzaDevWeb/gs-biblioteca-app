import { ColumnTypes } from '../enum/table.enum';

export interface IColumn {
  label: string;
  columnName: string;
  visible: boolean;
  seachable: boolean;
  type: ColumnTypes.NUMBER | ColumnTypes.STRING | ColumnTypes.ACTION;
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
  skip?: number;
  all?: boolean;
}
