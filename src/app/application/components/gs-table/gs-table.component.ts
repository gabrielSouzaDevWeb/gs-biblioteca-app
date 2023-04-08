import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
// import { EventEmitter } from 'stream';
import { ColumnTypes } from '../../lib/enum/table.enum';
import { IGsfabButton } from '../../lib/interface/fab.interface';
import { GsTableService } from './gs-table.service';

interface IColumnProp {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

@Component({
  selector: 'gs-table',
  templateUrl: './gs-table.component.html',
  styleUrls: ['./gs-table.component.css'],
})
export class GsTableComponent implements OnInit {
  settingForm?: UntypedFormGroup;
  listOfData: readonly IColumnProp[] = [];
  actions: IGsfabButton[] = [];
  @Input() displayData: any[] = [];
  @Input() columns: any[] = [];
  @Input() detalheColumns: any[] = [];
  @Input() hasDetalhe: boolean = false;
  @Input() pesquisar: () => any[] | void = () => {};
  @Input() title!: string;

  @Output() check = new EventEmitter();
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  private pageSize: number = 10;
  private pageIndex: number = 1;
  selectFilter!: any;
  selectFilterValue!: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: GsTableService
  ) {
    this.setOrdenator();
  }

  // settingValue!: Setting;
  // currentPageDataChange($event: readonly IColumnProp[]): void {
  //   this.displayData = $event;
  //   this.refreshStatus();
  // }

  // getSelecionados() {
  //   console.log(this.displayData);
  //   return this.displayData.filter((data) => data.checked).length;
  // }

  showFilter() {
    console.log(this.selectFilter);
    console.log(this.selectFilterValue);
  }

  onClose(data: any) {
    console.log(data);
  }

  getChecked(): any[] | void {
    const registry = this.getCheckeds();
    if (registry.length === 0) {
      this.service.notification.warning(
        this.title,
        'Nenhum registro selecionado!'
      );
      return;
    }
    if (registry.length > 1) {
      this.service.notification.warning(
        this.title,
        'Muitos registro selecionado!'
      );
      return;
    }
    return registry[0];
  }

  getCheckeds(): any[] {
    return this.displayData?.filter((data) => data.checked) ?? [];
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
      return {
        ...column,
        ordenator:
          column.type === ColumnTypes.STRING
            ? (a: any, b: any) =>
                a[column.columnName].localeCompare(b[column.columnName])
            : (a: any, b: any) => a[column.columnName] - b[column.columnName],
      };
    });
  }

  setPageSize(event: number) {
    this.pageSize = event;
  }
  getPageSize(): number {
    return this.pageSize;
  }
  setPageIndex(event: number) {
    this.pageIndex = event;
  }
  getPageIndex(): number {
    return this.pageIndex;
  }

  getPageTotal(): number {
    const table: Array<any> = this.displayData;
    return table?.length;
  }

  expandTableRow(data: any) {
    // this.displayDataEvent.emit('Olá, mundo!');

    data.expanded = !data.expanded;
  }

  refreshStatus(registry?: any): void {
    this.check.emit({
      checked: registry,
      displayData: this.displayData,
      checkeds: this.getCheckeds(),
    });
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

  getCell(column: any, data: any) {
    return column.visible ? data[column.columnName] : null;
  }

  ngOnInit(): void {
    this.setOrdenator();
    console.log(this.columns);
  }
}
