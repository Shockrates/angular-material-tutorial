import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DeviceInputComponent } from '../device-input/device-input.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DeviceInputComponent, {
      width: '40%',
    }).afterClosed().subscribe(val=>{
      
      if (val==='save'){
        console.log('Save');
        this.notifyForChange();
        
      }
    });
  }

  notifyForChange() {
    this.dataService.notifyAboutChange();
  }

}
