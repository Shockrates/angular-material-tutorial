import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Device } from '../models/device.model';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-device-input',
  templateUrl: './device-input.component.html',
  styleUrls: ['./device-input.component.scss']
})
export class DeviceInputComponent implements OnInit {

 
  private subscription!: Subscription; 

  devices: DeviceType[] = [
    {value: 'Laptop', viewValue: 'Laptop'},
    {value: 'Tablet', viewValue: 'Tablet'},
    {value: 'Smartphone', viewValue: 'Smartphone'},
  ];

  deviceStatus: string = "";
  statusList: String[] = ['Brand New', "Manufacturer Refurbished", "Seller Refurbished", "Second Hand"]
  deviceForm: FormGroup | any;
  actionType: string = "Save"; 
  constructor(@Inject(MAT_DIALOG_DATA) public data: Device, private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DeviceInputComponent>) {
    
   }

  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['',Validators.required],
      datePurchased: ['', Validators.required],
    });
    
    if (this.data) {
      this.actionType = "Update";
      this.deviceForm.controls['serialNumber'].setValue(this.data.serialNumber);
      this.deviceForm.controls['description'].setValue(this.data.description);
      this.deviceForm.controls['type'].setValue(this.data.type);
      this.deviceForm.controls['status'].setValue(this.data.status);
      this.deviceForm.controls['datePurchased'].setValue(this.data.datePurchased);
      //console.log(this.data.datePurchased);
      
    }
  }

  type = new FormControl('', Validators.required);

  submit(){
    if (!this.data) {
      this.addDevice()
    }else{
      this.updateDevice()
    }
  }


  updateDevice() {
    if(this.deviceForm.valid){
      this.api.updateDevice(this.deviceForm.value, this.data.id)
      .subscribe({
        next:(res)=> {
          //alert("Device updated");
          this.deviceForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating device")
        }
      })
    }
  }

  addDevice(){
    if(this.deviceForm.valid){
      this.api.postDevice(this.deviceForm.value)
      .subscribe({
        next:(res)=> {
         // alert("New device added");
          this.deviceForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while addid new device")
        }
      })
    }
  
  }

}

interface DeviceType {
  value: string;
  viewValue: string;
}