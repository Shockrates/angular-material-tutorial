import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from '../models/device.model';
import { ApiService } from '../services/api.service';
import { DeviceInputComponent } from '../device-input/device-input.component';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {


  dataSource!: MatTableDataSource<Device>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  columns = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (device: Device) => `${device.id}`,
    },
    {
      columnDef: 'serialnumber',
      header: 'Serial Number',
      cell: (device: Device) => `${device.serialNumber}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (device: Device) => `${device.description}`,
    },
    {
      columnDef: 'type',
      header: 'Type',
      cell: (device: Device) => `${device.type}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (device: Device) => `${device.status}`,
    },
    {
      columnDef: 'datePurcahsed',
      header: 'Purcahsed at',
      cell: (device: Device) => `${new Date(device.datePurchased).toLocaleString("el-GR")}`,
    },
    {
      columnDef: 'employeeId',
      header: 'Assign to',
      cell: (device: Device) => `${device.employeeId}`,
    },


  ];

  displayedColumns: string[] = this.columns.map(c => c.columnDef).concat(['actions']);

  subscriptions: Subscription[] = []


  constructor(private api: ApiService, private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllDevices();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  notifierSubscription: Subscription = this.dataService.subjectNotifier.subscribe(notified => {
    // originator has notified me. refresh my data here.
    this.getAllDevices();

  });

  getAllDevices() {
    var sub = this.api.getAllDevices()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error: (err) => {
          alert("Error while fetching");
        }
      })
      this.subscriptions.push(sub);   
  }

  editDevice(e: MouseEvent, row: any){
    e.stopImmediatePropagation();
    var sub = this.dialog.open(DeviceInputComponent, {
      width: '40%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val==='update'){
        this.getAllDevices();
        
      }
    });
    this.subscriptions.push(sub); 
  }

  openConfirmDelete(e: MouseEvent, row: any){
    e.stopImmediatePropagation();
    var sub = this.dialog.open(ConfirmDeleteComponent, {
      width: '40%',
      data:`Device Serial Number: ${row.serialNumber}. Are you sure you want to delete?`
    }).afterClosed().subscribe(val=>{
      if (val==='delete'){
        this.deleteDevice(row.id)
      }
    });
    this.subscriptions.push(sub); 
  }

  deleteDevice(id: number){
   
    var sub = this.api.deleteDevice(id)
    .subscribe({
      next:(res) => {
        alert("Device Deleted Successfully");
        this.getAllDevices();
      },
      error: (err) => {
        alert("Error while Deleting");
      }
    });
  this.subscriptions.push(sub); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
