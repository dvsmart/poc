import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormsService } from './forms.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { FormComponent } from '../form/form.component';
import { FormRequestModel } from '../form/FormRequestModel';
import { CategoryComponent } from '../category/category.component';
import { DashboardService } from '../dashboard.service';
import { CategoryRequestModel } from '../category/category';
import { FuseConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ResponseModel } from 'app/models/ResponseModel';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  forms: any = null;
  categoryName: string;
  categoryId: any;

  canAddForms: boolean;
  formOptions: boolean;
  canEditCategory: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  restoreOption: boolean;

  selection = new SelectionModel<any>(true, []);

  constructor(private formsService: FormsService, private route: ActivatedRoute,
    private _dialog: MatDialog,
    private toaster: MatSnackBar,
    private categoryService: DashboardService,
    private router: Router) {
    this._unsubscribeAll = new Subject();
    this.forms = null;
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.categoryId = x.id;
      this.categoryName = x.slug;
      this.selection.clear();
      if (this.categoryId === 'forms') {
        this.canEditCategory = false;
        if (this.categoryName !== 'uncategorised') {
          this.canAddForms = false;
          this.formOptions = false;
        } else {
          this.canAddForms = true;
        }
      } else {
        this.canEditCategory = true;
        this.canAddForms = true;
        this.formOptions = true;
      }
      if (this.categoryName === 'archived' || this.categoryName === 'deleted') {
        this.restoreOption = true;
      } else {
        this.restoreOption = false;
      }
      this.categoryName = this.categoryName.toUpperCase();
    })
    this.formsService.forms
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response && response.results && response.results.length > 0) {
          this.forms = response.results;
          this.formOptions = true;
        } else {
          this.forms = null;
          this.formOptions = false;
        }
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.forms.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.forms.forEach(r => this.selection.select(r));
  }

  addNewForm(): void {
    const dialogRef = this._dialog.open(FormComponent, {
      width: '400px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != "") {
        let categoryId = this.categoryId === 'forms' ? null : this.categoryId;
        let formRequest = new FormRequestModel(result, categoryId);
        this.formsService.saveForm(formRequest).then(() => {
          this.toaster.open("Form created Successfully.", null, { duration: 4000, verticalPosition: 'top', horizontalPosition: 'center' });
        });
      }
    });
  }

  DeleteForms() {
    if (this.selection.selected.length > 0) {
      let selectedForms = this.selection.selected.map(x => x.id);
      this.formsService.deleteSelectedForms(selectedForms).then(x => {
        this.toaster.open("Form deleted", null, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.selection.clear();
      });
    }
  }

  ArchiveForms() {
    if (this.selection.selected.length > 0) {
      let selectedForms = this.selection.selected.map(x => x.id);
      this.formsService.archiveSelectedForms(selectedForms).then(x => {
        this.toaster.open("Forms archived", null, { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
        this.selection.clear();
      })
    }
  }


  editCategory() {
    const dialog = this._dialog.open(CategoryComponent, {
      width: '400px',
      data: { name: this.categoryName }
    })
    dialog.afterClosed().subscribe(result => {
      if (result != undefined && result != "") {
        let formRequest = new CategoryRequestModel(result, this.categoryId);
        this.categoryService.updateCategory(formRequest).then(() => {
          this.toaster.open("Category updated.", null, { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' });
        });
      }
    });

  }

  deleteCategory(): void {
    this.confirmDialogRef = this._dialog.open(FuseConfirmDialogComponent, {
      disableClose: true
    });
    
    this.confirmDialogRef.componentInstance.confirmMessage = 'Do you sure want to delete this category?';
    
    this.confirmDialogRef.componentInstance.confirmTitle = this.categoryName;
    
    this.confirmDialogRef.componentInstance.extraConditionText = 'If no, the forms will be moved to uncategorised';


    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(result.confirm){
          debugger;
          this.categoryService.deleteCategoryWithForms(this.categoryId, result.extra).then((res: ResponseModel) => {
            debugger;
            if (res.statusCode === 400) {
              this.toaster.open(res.message, 'Retry',
                { duration: 4000, verticalPosition: 'top', horizontalPosition: 'center' });
            } else {
              this.toaster.open("Category deleted.", 'Done',
                { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
              this.categoryService.getCategories();
            }
            this.router.navigate(['/admin/form/dashboard/folder/uncategorised']);
          });
        }
      }
      this.confirmDialogRef = null;
    });

  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
