import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface FullCategory {
  nom: string;
  category_id: number;
} 

export interface Category {
  nom: string;
} 

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})

export class EditCategoryComponent {
  
  @Output() categoryEdited = new EventEmitter<any>();

  categoryForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public fullCategory: FullCategory, 

  ) {
    console.log(fullCategory);
    this.categoryForm = this.formBuilder.group({
      nom: [fullCategory.nom, Validators.required]
    });
  }

  get f() {
    return this.categoryForm.controls;
  }

  editCategory() {
    this.submitted = true;
  
    if (this.categoryForm.invalid) {
      return;
    }

    this.categoryService.editCategory(this.fullCategory.category_id, this.f.nom.value).subscribe(
      (response: any) => {
        console.log(response);
        this.categoryEdited.emit();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


}
