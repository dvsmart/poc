import { Column } from "../../dataTableSource";

export interface CellComponent {
    column: Column;
    row: object;
}