import { Component, OnInit } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dog.service';

@Component({
  selector: 'app-show-dogs',
  templateUrl: './show-dogs.component.html',
  styleUrls: ['./show-dogs.component.css']
})
export class ShowDogsComponent implements OnInit {
  dogs: Dog[] = [];

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
	this.dogService.getDogs().subscribe((data: Dog[]) => {
      this.dogs = data; console.log(this.dogs);
    });
  }
}
