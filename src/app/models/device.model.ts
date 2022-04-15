export class Device {

    serialNumber:string;
    description:string;
    type:any;
    status:string;
    datePurchased:Date
    id:any;
    employeeId:any
   
    constructor(serialNumber:string,description:string,type:number, status:string, datePurchased:Date, _id?:any, employeeId=null){
      
        this.id=_id;
        this.serialNumber=serialNumber;
        this.description=description;
        //this.type=DeviceType[type];
        this.type=type;
        this.status=status;
        this.datePurchased = datePurchased;
        this.employeeId=employeeId
    }
    
    getJson(){
        return{
            "serialnumber":this.serialNumber,
            "description":this.description,
            "type":DeviceType[this.type],
            "employeeId":this.employeeId  
        }
    }

    getTypeCode(){
        return DeviceType[this.type]
    }
}

export enum DeviceType {
    'Smartphone'=1,
    'Tablet'=2,
    'Laptop'=3,
    
  }
