import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  dog: Dog = new Dog();
  toUpdateDog : Dog = new Dog();

  delete_selected_id = ""
  visible_pop_up = false

  dogId !: number;

  constructor(private dogService: DogService,
    private router : Router,
    private route : ActivatedRoute) {
    this.DeletePopup = new ElementRef(null);
    this.EditPopup = new ElementRef(null);
    this.AddPopup = new ElementRef(null);
  }
 
  ngOnInit(): void {
	this.dogService.getDogs().subscribe((data: Dog[]) => {
      this.dogs = data; console.log(this.dogs);
    });


    this.dogId = this.route.snapshot.params['dogId'];
    console.log('Dog ID:', this.dogId);
    
    this.dogService.getDog(this.dogId).subscribe(data => {
      this.toUpdateDog = data;
      console.log('Data received:', data);
    }, error => {
      console.log('Error:', error);
    });
    
  }

// POP-UP FOR DELETE
toggleDeleteModal(id: number | string) {
  this.delete_selected_id = id == null ? "ERR: no_id_passed" : id.toString();

  if (this.visible_pop_up)  {
    // HIDE
    this.DeletePopup.nativeElement.classList.add('hide');
    this.visible_pop_up = false;
  } else {
    // SHOW
    this.DeletePopup.nativeElement.classList.remove('hide');
    this.visible_pop_up = true;
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
  toggleEditModal(dogId: number) {


    this.dogService.getDog(dogId).subscribe(data => {
      this.toUpdateDog = data
    })

    const selectedDog = this.dogs.find(dog => dog.dogId === dogId)
    
    if (selectedDog){
      this.toUpdateDog = {...selectedDog}
    }
    
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

  deleteDog(id: number) {
    console.log(`Dog "${this.delete_selected_id}" has been deleted`);
    this.dogService.deleteDog(+id).subscribe(data => {
      console.log(data);
    })
    this.toggleDeleteModal(id);
  }

  onFileChange(event: any) {
    const file = event.target.files[0]; // Get the selected file from the input element
    if (file) {
      this.convertToBase64(file);
    }
  }
  
  convertToBase64(file: File) {
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64ImageData = base64String.split(',')[1];
      this.dog.dogImage = base64ImageData;
    };
  
    reader.readAsDataURL(file);
  }
  
  onSubmit() {
    console.log(this.dog.dogImage);
    this.addDog();
    this.toggleAddModal();
  }  

  addDog() {
    console.log("add dog");
    this.dogService.addDog(this.dog).subscribe( data => {
      console.log(data);
    },
    error => console.log(error));
  }

  editDog(id: number) {
    console.log(`Edited ${id}`);
    this.dogService.updateDog(id, this.toUpdateDog).subscribe( data => {
      this.updateDog();
    })
    this.toggleEditModal(id);
  }

  getDog(id: number){
    this.dogService.getDog(id).subscribe(data => {
      this.dog = data;
    });
  }

  updateDog(){
   this.router.navigate(['update/']); 
  }
}
