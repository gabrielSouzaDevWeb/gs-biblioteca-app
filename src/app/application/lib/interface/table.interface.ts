import { ColumnTypes } from '../enum/table.enum';

export interface IColumn {
  label: string;
  columnName: string;
  visible: boolean;
  type: ColumnTypes.NUMBER | ColumnTypes.STRING | ColumnTypes.ACTION;
  // compare: (a: any, b: any) => any;
}
