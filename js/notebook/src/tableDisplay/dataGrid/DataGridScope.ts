/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Widget } from '@phosphor/widgets';
import { BeakerxDataGrid } from './BeakerxDataGrid';
import { silverStripeStyle } from './style/dataGridStyle';
import IDataGridScopeOptions from "./interface/IDataGridScopeOptions";

export class DataGridScope {
  readonly dataGrid: BeakerxDataGrid;
  readonly element: HTMLElement;
  private tableDisplayModel: any;
  private tableDisplayView: any;

  constructor(options: IDataGridScopeOptions) {
    this.element = options.element;
    this.tableDisplayModel = options.widgetModel;
    this.tableDisplayView = options.widgetView;
    this.dataGrid = new BeakerxDataGrid(
      {
        style: silverStripeStyle,
      },
      options.data
    );

    this.connectToCommSignal();
  }

  render(): void {
    Widget.attach(this.dataGrid, this.element);
  }

  doDestroy() {
    this.dataGrid.destroy();
  }

  updateModelData(newData) {
    this.dataGrid.updateModelData(newData);
  }

  doResetAll() {
    this.dataGrid.highlighterManager.removeHighlighters();
    this.dataGrid.cellSelectionManager.clear();
    this.dataGrid.rowManager.resetSorting();
    this.dataGrid.columnManager.resetFilters();
    this.dataGrid.columnManager.showAllColumns();
    this.dataGrid.columnManager.resetColumnsAlignment();
    this.dataGrid.columnManager.resetColumnsOrder();
  }

  connectToCommSignal() {
    this.dataGrid.commSignal.connect((handler, args) => {
      this.tableDisplayModel.send(args, this.tableDisplayView.callbacks());
    }, this);
  }
}