
interface _HospitalUser {
  _id: string;
  name:string;
  img?:string
}

export class Hospital {
  constructor(
    public name:string,
    public id?:string,
    public img?:string,
    public user?:_HospitalUser){}

}
