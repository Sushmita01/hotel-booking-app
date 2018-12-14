import { Component, OnInit,ChangeDetectorRef } from '@angular/core';

import * as config from '../../../environments/config.all';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public people_icon=config.IMAGES.PEOPLE_ICON;
  public room_icon=config.IMAGES.BED_ICON;
  public adult_icon=config.IMAGES.ADULT_ICON;
  public child_icon=config.IMAGES.CHILDREN_ICON;
  public minus_icon=config.IMAGES.MINUS_ICON;
  public plus_icon=config.IMAGES.PLUS_ICON;
  public disabled_minus_icon=config.IMAGES.DISABLED_MINUS_ICON;
  public disabled_plus_icon=config.IMAGES.DISABLED_PLUS_ICON;
  public room_count: number=1;
  public adult_count: number=1;
  public child_count: number=0;
  public roomDecreaseDisabled: boolean;
  public roomIncreaseDisabled: boolean;
  public adultDecreaseDisabled: boolean;
  public adultIncreaseDisabled: boolean;
  public childDecreaseDisabled: boolean;
  public childIncreaseDisabled: boolean;



  
  public tabs=[{label:"ROOMS",key:"room",icon:this.room_icon,count: this.room_count },{label:"ADULTS",key:"adult",icon:this.adult_icon,count: this.adult_count},{label:"CHILDREN",key:"children",icon:this.child_icon,count: this.child_count}]



  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { 
    this.roomDecreaseDisabled=this.adultDecreaseDisabled=this.childDecreaseDisabled=true;
    this.roomIncreaseDisabled=this.adultIncreaseDisabled=this.childIncreaseDisabled=false;
   }

  getMinusIcon(idx) {
    let decidingFactor: boolean;
    decidingFactor= (idx==0) ? this.roomDecreaseDisabled : ((idx==1) ? this.adultDecreaseDisabled : this.childDecreaseDisabled)
    return decidingFactor ? this.disabled_minus_icon :this.minus_icon;
   }

  getPlusIcon(idx) {
    let decidingFactor: boolean;
    decidingFactor= (idx==0) ? this.roomIncreaseDisabled : ((idx==1) ? this.adultIncreaseDisabled : this.childIncreaseDisabled)
    return decidingFactor ? this.disabled_plus_icon :this.plus_icon;
   }

  decreaseCount(idx) {
    if (idx==0) this.changeRoomCount("minus");
    else if (idx==1) this.changeAdultCount("minus");
    else this.changeChildCount("minus");
  }

  increaseCount(idx) {
    if (idx==0) this.changeRoomCount("plus");
    else if (idx==1) this.changeAdultCount("plus");
    else this.changeChildCount("plus");
  }


  changeRoomCount(type){
    if (type=="minus") {
      if (this.tabs[0].count==1) {  //minium 1 room needs to be booked
        this.roomDecreaseDisabled=true;
        alert("Room Count cannot be less than 1");
        return;
      }
      else this.tabs[0].count-=1; 
    }
    else {
      if (this.tabs[0].count==5) {   //cannot book more than 5 rooms
        alert("Room Count cannot be more than 5");
        this.roomIncreaseDisabled=true; 
        console.log(2);
        return;
      }
      else {
        this.tabs[0].count+=1;
        this.roomDecreaseDisabled=false;
        console.log(1)
      }
    }
    this.room_count=this.tabs[0].count;
    console.log("room",this.room_count);
    this.validateRoomData();

  } 

  changeAdultCount(type) {
    if (type=="minus") {
      if (this.tabs[1].count==1) {   //minimum 1 adult required in booking
        this.adultDecreaseDisabled=true;
        alert("Adult Count cannot be less than 1");
        return;
      }
      this.tabs[1].count-=1;
      this.adultIncreaseDisabled=false;
    }
    else {
      if (this.checkUpperLimit()==true) return;
      this.tabs[1].count+=1;
      this.adultDecreaseDisabled=false;
    }
    this.adult_count=this.tabs[1].count;
    console.log("adult",this.adult_count);
    this.validatePersonData();

  }

  changeChildCount(type){
    if (type=="minus")  {
      if (this.tabs[2].count==0) {   //minimum 1 adult required in booking
        this.childDecreaseDisabled=true;
        alert("Child Count cannot be less than 0");
        return;
      }
      this.tabs[2].count-=1;
      this.childIncreaseDisabled=false;
    }
    else {
      if (this.checkUpperLimit()==true) return;
      this.tabs[2].count+=1;
      this.childDecreaseDisabled=false;
    }
    this.child_count=this.tabs[2].count;
    console.log("child",this.child_count);
    this.validatePersonData();

  }

  validateRoomData() {
    if (this.room_count>this.adult_count+this.child_count) {                //too less people,increasing adult count
      this.tabs[1].count=this.adult_count+=this.room_count-this.adult_count;
    }
    else if (this.room_count*4<this.adult_count+this.child_count) {         //too many people
        let excessPeople=(this.adult_count+this.child_count)-this.room_count*4;     
        // console.log("too many!",excessPeople);                                                                            
        let i=0;
        let childrenDecreased=0;                                          //reduce children first
        while(i<excessPeople) {
          if (this.child_count==0) {
            this.childDecreaseDisabled=true;
            break;
          }
          else {
            this.child_count=this.tabs[2].count-=1;
            childrenDecreased+=1
          }
          i++;
        }
        if (childrenDecreased<excessPeople) {                               //then reduce adults if neccesary          
          let excessAdults=excessPeople-childrenDecreased;
          this.adult_count=this.tabs[1].count-=excessAdults;
          if (this.adult_count==1) this.adultDecreaseDisabled=true;
      
        }
    }
  }

  validatePersonData() {
    if (this.adult_count+this.child_count>this.room_count*4) {              //too many people,increasing room count
        this.room_count=this.tabs[0].count+=1;
    }
    else if (this.room_count>this.adult_count+this.child_count) {           //too less people,decreasing room count
      this.room_count=this.tabs[0].count+=1;        

    }
  }

  checkUpperLimit() {
    if (this.adult_count+this.child_count==20) {
      console.log("reached upper limit!");
      this.adultIncreaseDisabled=this.childIncreaseDisabled=this.roomIncreaseDisabled=true;
      return true;
    }
    return false;
  }
  
}
