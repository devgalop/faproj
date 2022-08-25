import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs'
import { Car } from 'src/app/shared/interfaces/car/car.interface';
import { Reparation } from 'src/app/shared/interfaces/reparation/reparation.interface';
import { UpdateReparation } from 'src/app/shared/interfaces/reparation/updateReparation.interface';
import { CarService } from 'src/app/shared/services/car.service';
import { ReparationService } from 'src/app/shared/services/reparation.service';

@Component({
  selector: 'app-update-reparation',
  templateUrl: './update-reparation.component.html',
  styleUrls: ['./update-reparation.component.css']
})
export class UpdateReparationComponent implements OnInit {
  updateReparationForm!: FormGroup;
  updateReparationModel!: UpdateReparation;
  @Input() carSelected!: Car;
  @Input() reparationSelected!: Reparation;
  @Output() reparationUpdatedClick = new EventEmitter<Car>();

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _reparationSvc : ReparationService,
              private readonly _carSvc : CarService) { }

  ngOnInit(): void {
    this.updateReparationForm = this.initForm();
  }

  updateReparation():void{
    this.updateReparationModel = {
      Id:this.reparationSelected.id,
      Description:this.updateReparationForm.controls["description"].value,
      CreatedAt:this.updateReparationForm.controls["datePicked"].value,
      GuaranteeMonths:this.updateReparationForm.controls["guarantee"].value,
    }
    this._reparationSvc.updateReparation(this.updateReparationModel)
        .pipe(
          tap((reparation:Reparation) =>{
              this._carSvc.getCarByPlaque(this.carSelected.plaque)
                  .pipe(
                    tap((car : Car) => {
                      this.reparationUpdatedClick.emit(car);
                    })
                  ).subscribe();
          })
        ).subscribe();
  }

  initForm():FormGroup {
    return this._formBuilder.group({
      datePicked: [this.reparationSelected.createdAt, Validators.required],
      description: [ this.reparationSelected.description, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      guarantee: [this.reparationSelected.guaranteeMonths, [Validators.required, Validators.min(0)]],
    })
  }

}
