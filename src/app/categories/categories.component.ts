import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import {MatDialog} from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any = [];

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(
      response => {
        this.categories = response;
        console.log(response);
        // Traitez la réponse de l'API ici
      },
      error => {
        console.log(error);
        // Traitez les erreurs ici
      }
    );
  }

  openNewCategoryPopup() {
    let dialogRef = this.dialog.open(NewCategoryComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.componentInstance.categoryCreated.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getCategories();
      console.log('The dialog was closed', result);
    });
  }

  deleteCategory(categoryId: number) {
    this.categoriesService.deleteCategory(categoryId).subscribe(
      response => {
        this.getCategories();
        console.log(response);
        // Traitez la réponse de l'API ici
      },
      error => {
        console.log(error);
        // Traitez les erreurs ici
      }
    );
  }

  editCategory(category: any) {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      height: '400px',
      width: '600px',
      data: category
    });
    dialogRef.componentInstance.categoryEdited.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getCategories();
      console.log('The dialog was closed', result);
    });
  }
}