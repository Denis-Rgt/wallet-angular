import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepensesService } from '../depenses.service';
import { LoginService } from '../services/login.service';
import { CategoriesService } from '../categories.service';

export interface Depense {
  nom: string;
  date: string;
  montant: number;
  description: string;
  category_id: number;
  user_id: number;
} 

@Component({
  selector: 'app-new-depense',
  templateUrl: './new-depense.component.html',
  styleUrls: ['./new-depense.component.css']
})



export class NewDepenseComponent {
  
  @Output() depenseCreated = new EventEmitter<Depense>();

  depenseForm: FormGroup;
  submitted = false;
  //selectedCategoryId: number;
  categories: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private depensesService: DepensesService,
    private loginService: LoginService,
    private categoriesService: CategoriesService
  ) {
    this.getCategories();
    this.depenseForm = this.formBuilder.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      montant: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }

  get f() {
    return this.depenseForm.controls;
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe(
      response => {
        this.categories = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  createDepense() {
    this.submitted = true;


    
  
    if (this.depenseForm.invalid) {
      return;
    }
    // get the user_id from the token
    
    const user_id = this.loginService.getUserId();


  
    const depense: Depense = {
      nom: this.f.nom.value,
      date: this.f.date.value,
      montant: Number(this.f.montant.value),
      description: this.f.description.value,
      category_id: this.f.categorie.value,
      user_id: user_id
    };

    this.depensesService.addDepense(depense).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}