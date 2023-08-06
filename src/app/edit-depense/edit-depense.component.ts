import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepensesService } from '../depenses.service';
import { LoginService } from '../services/login.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CategoriesService } from '../categories.service';

export interface Depense {
  nom: string;
  date: string;
  montant: number;
  description: string;
  category_id: number;
  user_id: number;
} 
export interface FullDepense {
  nom: string;
  date: string;
  montant: number;
  description: string;
  category_id: number;
  user_id: number;
  depense_id: number;
} 

@Component({
  selector: 'app-edit-depense',
  templateUrl: './edit-depense.component.html',
  styleUrls: ['./edit-depense.component.css']
})
export class EditDepenseComponent {
  depenseForm: FormGroup;
  submitted = false;
  categories: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private depensesService: DepensesService,
    private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public fullDepense: FullDepense, 
    private categoriesService: CategoriesService
  ) {
    console.log(fullDepense);
    this.getCategories();
    this.fullDepense.date = this.formatDate(fullDepense.date);
    this.depenseForm = this.formBuilder.group({
      nom: [fullDepense.nom, Validators.required],
      date: [fullDepense.date, Validators.required],
      montant: [fullDepense.montant, Validators.required],
      description: [fullDepense.description, Validators.required],
      categorie: [fullDepense.category_id, Validators.required]
    });
  }

  get f() {
    return this.depenseForm.controls;
  }
  formatDate(date: string): string {
    date = date.substr(0, 10);
    return date;
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

  editDepense(depense_id: number) {
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
      category_id: Number(this.f.categorie.value),
      user_id: user_id
    };

    this.depensesService.editDepense(depense_id, depense).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  


}
