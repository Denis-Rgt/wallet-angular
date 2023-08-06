import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(depenses: any[], searchTerm: string, selectedCategories: any): any[] {
    console.log(selectedCategories);
    console.log(searchTerm);
    if (!searchTerm && selectedCategories === "") {
        return depenses; // Retourne tous les items si le terme de recherche est vide et qu'auncune catégorie n'est sélectionnée
    } else {
        let filteredDepenses = depenses;
        if (selectedCategories !== "") {
            filteredDepenses = filteredDepenses.filter((depense: { category_id: number; }) =>
                selectedCategories.includes(depense.category_id)
            );
        }
        if (searchTerm) {
            filteredDepenses = filteredDepenses.filter((depense: { nom: string; }) =>
                depense.nom.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filteredDepenses;
    }
  }
}