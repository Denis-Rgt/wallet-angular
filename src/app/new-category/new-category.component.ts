import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {

  @Output() categoryCreated = new EventEmitter<any>();

  categoryForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,

  ) {
    this.categoryForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });
  }

  get f() {
    return this.categoryForm.controls;
  }

  createCategory() {
    this.submitted = true;
  
    if (this.categoryForm.invalid) {
      return;
    }

    this.categoryService.addCategory(this.f.nom.value).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
