import { Component, OnInit } from '@angular/core';
import { DepensesService } from '../depenses.service';
import { CategoriesService } from '../categories.service';
import { NewDepenseComponent } from '../new-depense/new-depense.component';
import {MatDialog} from '@angular/material/dialog';
import { EditDepenseComponent } from '../edit-depense/edit-depense.component';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})

export class DepensesComponent implements OnInit {
  depenses: any = [];
  categories: any = [];
  searchTerm: string = '';
  selectedCategories = "";

  constructor(private depensesService: DepensesService, private categoriesService: CategoriesService,  private dialog: MatDialog) { }

  ngOnInit() {
    this.getDepenses();
    this.getCategories();
  }
  getCategories() {
    this.categoriesService.getCategories().subscribe(
      response => {
        this.categories = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find((category: { category_id: number; }) => category.category_id === categoryId);
    return category ? category.nom : '';
  }

  getDepenses() {
    this.depensesService.getDepenses().subscribe(
      response => {
        this.depenses = response;
        this.sortDepensesByDate();
      },
      error => {
        console.log(error);
      }
    );
  }
  sortDepensesByDate() {
    this.depenses.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  formatDate(date: string): string {
    date = date.substr(0, 10);
    return date;
  }

  filterDepenses() {
    if (this.searchTerm) {
      this.depenses = this.depenses.filter((depense: { nom: string; }) =>
        depense.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  resetSearch() {
    this.searchTerm = '';
  }

  openNewDepensePopup() {
    let dialogRef = this.dialog.open(NewDepenseComponent, {
      height: '450px',
      width: '600px'
    });
    dialogRef.componentInstance.depenseCreated.subscribe(() => {
      dialogRef.close(); // Fermer la boîte de dialogue lorsque l'événement est émis
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDepenses();
    });
  }
  deleteDepense(depenseId: number) {
    this.depensesService.deleteDepense(depenseId).subscribe(
      response => {
        // Gérer la réponse de suppression
        console.log('Dépense supprimée avec succès');
        this.getDepenses();
        // Effectuer les actions supplémentaires nécessaires, comme mettre à jour la liste de dépenses
      },
      error => {
        // Gérer les erreurs de suppression
        console.error('Erreur lors de la suppression de la dépense', error);
      }
    );
  }

  

  editDepense(depense: any) {
    let dialogRef = this.dialog.open(EditDepenseComponent, {
      height: '450px',
      width: '600px',
      data: depense
    });
    dialogRef.componentInstance.depenseEdited.subscribe(() => {
      dialogRef.close(); // Fermer la boîte de dialogue lorsque l'événement est émis
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDepenses();
    });
  }

}