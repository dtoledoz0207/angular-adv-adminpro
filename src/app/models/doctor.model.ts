import { Hospital } from './hospital.model';

interface _DoctorUser {
  _id: string;
  name:string;
  img?:string
}

export class Doctor {
  constructor(
    public name:string,
    public id?:string,
    public img?:string,
    public user?:_DoctorUser,
    public hospital?: Hospital){}

}
