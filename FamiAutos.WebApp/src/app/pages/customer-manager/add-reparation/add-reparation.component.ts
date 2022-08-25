import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Car } from 'src/app/shared/interfaces/car/car.interface';
import { AddReparation } from 'src/app/shared/interfaces/reparation/addReparation.interface';
import { CarService } from 'src/app/shared/services/car.service';
import { ReparationService } from 'src/app/shared/services/reparation.service';

@Component({
  selector: 'app-add-reparation',
  templateUrl: './add-reparation.component.html',
  styleUrls: ['./add-reparation.component.css']
})
export class AddReparationComponent implements OnInit {
  addReparationForm!: FormGroup;
  addReparationModel!:AddReparation;
  @Input() carSelected!:Car;
  @Output() reparationAddedToCarClick = new EventEmitter<Car>();


  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _reparationSvc : ReparationService,
              private readonly _carSvc : CarService) { }

  ngOnInit(): void {
    this.addReparationForm = this.initForm();
  }

  addReparation():void{
    this.addReparationModel = {
      Description: this.addReparationForm.controls['description'].value, 
      CreatedAt: this.addReparationForm.controls['datePicked'].value,
      GuaranteeMonths: this.addReparationForm.controls['guarantee'].value,
      CarPlaque: this.carSelected.plaque
    }
    this._reparationSvc.addReparation(this.addReparationModel)
        .pipe(
          tap(()=>{
              this._carSvc.getCarByPlaque(this.carSelected.plaque)
                  .pipe(
                    tap((car:Car)=>{
                      this.reparationAddedToCarClick.emit(car);
                    })
                  ).subscribe();
          })
        ).subscribe();
  }

  initForm():FormGroup {
    return this._formBuilder.group({
      datePicked: ['', Validators.required],
      description: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      guarantee: [0, [Validators.required, Validators.min(0)]],
    })
  }

}
