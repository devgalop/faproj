import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Car } from 'src/app/shared/interfaces/car/car.interface';
import { UpdateCar } from 'src/app/shared/interfaces/car/updateCar.interface';
import { CarService } from 'src/app/shared/services/car.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css'],
})
export class UpdateCarComponent implements OnInit {
  updateCarForm!: FormGroup;
  carToBeUpdated!: UpdateCar;
  @Input() carSelected!: Car;
  @Output() carUpdatedClick = new EventEmitter<Car>();

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _carSvc: CarService) {}

  ngOnInit(): void {
    this.updateCarForm = this.initForm();
  }

  updateCar(): void {
    this.carToBeUpdated = {
      Id: this.carSelected.id,
      Plaque: this.updateCarForm.controls['plaque'].value,
      Brand: this.updateCarForm.controls['brand'].value,
      Model: this.updateCarForm.controls['model'].value,
    };
    this._carSvc.updateCar(this.carToBeUpdated)
        .pipe(
          tap(() => {
            this._carSvc.getCarByPlaque(this.carSelected.plaque)
                .pipe(
                  tap((car:Car)=>{
                    this.carUpdatedClick.emit(car);
                  })
                ).subscribe();
          })
        ).subscribe();
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      plaque: [
        this.carSelected.plaque,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      model: [this.carSelected.model, []],
      brand: [this.carSelected.brand, []],
    });
  }
}
