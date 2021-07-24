import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'runno-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  rowDataTracker = {} as any;
  private windowResizeSub: Subscription = new Subscription();
  public frameworkComponents = {
    defaultInputEditor: InputComponent,
  };
  instancePtr = {} as any;

  public onGridReady() {
    this.instancePtr.api.sizeColumnsToFit();
  }
  public onCellValueChanged(params: any) {
    if (params.oldValue.toString() !== params.newValue.toString()) {
      this.storeEdit(
        params.data.id,
        params.colDef.field,
        params.oldValue,
        params.newValue
      );
    }
    this.instancePtr.api.refreshCells();
  }
  public storeEdit(
    rowId: number,
    columnId: number,
    oldValue: any,
    newValue: any
  ) {
    if (!this.rowDataTracker[rowId]) {
      this.rowDataTracker[rowId] = {};
    }
    this.rowDataTracker[rowId][columnId] = [oldValue, newValue];
  }

  confirmEditState() {
    this.rowDataTracker = {};
    this.instancePtr.api.refreshCells();
  }

  cancelEdited() {
    this.instancePtr.api.forEachNode((node: any) => {
      if (Object.keys(this.rowDataTracker).indexOf(node.id) > -1) {
        const data = node.data;
        Object.keys(this.rowDataTracker[node.id]).forEach((key) => {
          data[key] = this.rowDataTracker[node.id][key][0];
        });
        node.updateData(data);
      }
    });
    this.confirmEditState();
  }
  public ngOnInit() {
    this.windowResizeSub = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.instancePtr &&
          this.instancePtr.api &&
          this.instancePtr.api.sizeColumnsToFit();
      });
  }
  public ngOnDestroy() {
    this.windowResizeSub.unsubscribe();
  }
}
