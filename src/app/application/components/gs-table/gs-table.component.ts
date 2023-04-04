import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import {
  NzTableLayout,
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  sizeChanger: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  noResult: boolean;
  ellipsis: boolean;
  simple: boolean;
  size: NzTableSize;
  tableScroll: string;
  tableLayout: NzTableLayout;
  position: NzTablePaginationPosition;
  paginationType: NzTablePaginationType;
}

interface IColumn {
  label: string;
  columnName: string;
  visible: boolean;
  type: ColumnTypes.NUMBER | ColumnTypes.STRING | ColumnTypes.ACTION;
  // compare: (a: any, b: any) => any;
}
const enum ColumnTypes {
  'ACTION' = 0,
  'STRING' = 1,
  'NUMBER' = 2,
}

@Component({
  selector: 'gs-table',
  templateUrl: './gs-table.component.html',
  styleUrls: ['./gs-table.component.css'],
})
export class GsTableComponent implements OnInit {
  settingForm?: UntypedFormGroup;
  listOfData: readonly ItemData[] = [];
  @Input() displayData: readonly ItemData[] = [];
  @Input() columns: any[] = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue!: Setting;
  currentPageDataChange($event: readonly ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  setOrdenator() {
    this.columns = this.columns.map((column) => {
      const ordenatorTypes: {
        [key: number]: ((a: any, b: any) => any) | null;
      } = {
        [ColumnTypes.STRING]: (a: any, b: any) =>
          a[column.columnName].localeCompare(b[column.columnName]),
        [ColumnTypes.NUMBER]: (a: any, b: any) =>
          a[column.columnName] - b[column.columnName],
        [ColumnTypes.ACTION]: null,
      };
      console.log({
        ...column,
        ordenator: ordenatorTypes[column.type],
      });
      return {
        ...column,
        ordenator:
          column.type === ColumnTypes.STRING
            ? (a: any, b: any) =>
                a[column.columnName].localeCompare(b[column.columnName])
            : (a: any, b: any) => a[column.columnName] - b[column.columnName],
      };
    });
    console.log(this.columns);
  }

  refreshStatus(): void {
    const validData = this.displayData.filter((value) => !value.disabled);
    const allChecked =
      validData.length > 0 &&
      validData.every((value) => value.checked === true);
    const allUnChecked = validData.every((value) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach((data) => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  constructor(private formBuilder: UntypedFormBuilder) {
    this.setOrdenator();
  }

  getCell(column: any, data: any) {
    return data[column.columnName];
  }

  ngOnInit(): void {
    this.setOrdenator();
    console.log(this.columns);
  }
}
