import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';

@Component({
  selector: 'app-show-dogs',
  templateUrl: './show-dogs.component.html',
  styleUrls: ['./show-dogs.component.css']
})

export class ShowDogsComponent implements OnInit {
  @ViewChild('DeletePopup') DeletePopup: ElementRef;
  @ViewChild('EditPopup') EditPopup: ElementRef;
  @ViewChild('AddPopup') AddPopup: ElementRef;

  dogs: Dog[] = [];

  delete_selected_id = ""
  visible_pop_up = false

  constructor(private dogService: DogService) {
    this.DeletePopup = new ElementRef(null);
    this.EditPopup = new ElementRef(null);
    this.AddPopup = new ElementRef(null);
  }

  ngOnInit(): void {
	this.dogService.getDogs().subscribe((data: Dog[]) => {
      this.dogs = data; console.log(this.dogs);
    });
  }

  // POP-UP FOR DELETE
  toggleDeleteModal(id: string) {
    this.delete_selected_id = id === "" ? "ERR: no_id_passed" : id;

    if (this.visible_pop_up)  {
      // HIDE
      this.DeletePopup.nativeElement.classList.add('hide');
      this.visible_pop_up = false
    } else {
      // SHOW
      this.DeletePopup.nativeElement.classList.remove('hide')
      this.visible_pop_up = true
    }
  }

  // POP-UP FOR ADD
  toggleAddModal() {
    if (this.visible_pop_up)  {
      // HIDE
      this.AddPopup.nativeElement.classList.add('hide');
      this.visible_pop_up = false
    } else {
      // SHOW
      this.AddPopup.nativeElement.classList.remove('hide')
      this.visible_pop_up = true
    }
  }

  // POP-UP FOR EDIT
  toggleEditModal(id: string) {
    if (this.visible_pop_up)  {
      // HIDE
      this.EditPopup.nativeElement.classList.add('hide');
      this.visible_pop_up = false
    } else {
      // SHOW
      this.EditPopup.nativeElement.classList.remove('hide')
      this.visible_pop_up = true
    }

    console.log(this.EditPopup)
  }

  deleteDog() {
    console.log(`Dog "${this.delete_selected_id}" has been deleted`);
    this.toggleDeleteModal('');
  }

  addDog() {
    console.log("add dog");
  }

  editDog(id: string) {
    console.log(`Edited ${id}`);
  }
}
