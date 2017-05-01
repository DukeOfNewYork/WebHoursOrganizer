var arr = [];
var fun = [];
//var returnArray = [];



//this creates each new Person! with all their own values
function person(iname, iPreferedDay, imaxWeekHours, imaxDayHours, idaysWorking, imanualHours) {
  console.time("How long it takes to make " + iname);
  this.weekSchedule = [];

  this.name = iname;
  this.PreferedDay = iPreferedDay;
  this.maxWeekHours = imaxWeekHours;
  this.maxDayHours = imaxDayHours;
  this.daysWorking = idaysWorking;
  this.manualHours = imanualHours;

	//This goes through the array of HTML check boxes and turns it into one number, then prompty replaces itself with that number 
  this.numberDaysWorking = function() {
    for (count = 0, dayNum = 0, allDays = idaysWorking.length; dayNum < allDays; dayNum++) {
      if (this.daysWorking[dayNum] == true) {
        count++
        this.weekSchedule.push(0);
      } else {
        this.weekSchedule.push(0);
      }
    };
    this.numberDaysWorking = count;
  };
	//this does nothing! Just messing around with adding a "calculated start/end time" idea
  this.startTime = function() {
    for (count = 0, returnArray = []; count < this.numberDaysWorking; count++) {
      returnArray.push(8);
    };
    this.startTime = returnArray;
  };


	//runs a BUNCH of *fun*ctions to organize all the data
  this.numberDaysWorking();
  this.calcManualHours();
  this.personOrganizeHours();
  this.displayHours();
  this.startTime();

  console.timeEnd("How long it takes to make " + iname);
}


/*function cleanDays (person){
var tWorkWeekL = person.weekSchedule.length;
var tWorkWeek = person.weekSchedule;
	for (var count =0; count < tWorkWeekL; count++){
		if(tWorkWeek[count] == "") {
    
    }else if (tWorkWeek[count] > person.maxDayHours){
    
    }
}
*/
//};

//this does all of the HTML formatting, very diligent in its duty
function getPeople(peopleArray) {

  var returnString = '<table style="width:100%">    <th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th><tr>';
  for (count = 0; count < peopleArray.length; count++) {
    returnString += "<tr><tr>"
    returnString += "<th>" + peopleArray[count].name + "</th>";
    for (days = 0; days < 7; days++) {
      if (peopleArray[count].weekSchedule[days] >= 0) {
        returnString += "<th>" + peopleArray[count].weekSchedule[days] + "</th>";
      } else {
        returnString += "<th></th>";

      }
    };
  };
  returnString += "</tr></table>";
  return returnString;
};
	
//moves the prefered day around, sets the hoursArray to only numbers e.x. [8,7,7,7]
person.prototype.personOrganizeHours = function() {
  var hoursArray = [];
  for (var count = 0, pDays = this.numberDaysWorking, pWeek = this.maxWeekHours; count < pDays; count++) {
    hoursArray.push(((pWeek - (pWeek % pDays)) / pDays));
  };
  hoursArray[this.PreferedDay] = (((pWeek - (pWeek % pDays)) / pDays) + (pWeek % pDays));

  var holdingHours = .25 //runs on quarter hours
  var counTt = 0;
	//loops over the array and adds holdingHours to each day while taking away from PreferedDay until less then maxDayHours
  if (hoursArray.length < 2){} else {
  
 
  while (hoursArray[this.PreferedDay] > this.maxDayHours) {
      console.log(counTt);
    if(counTt >= hoursArray.length){counTt = 0;} else {
    

      hoursArray[counTt] += holdingHours;
      hoursArray[this.PreferedDay] -= holdingHours;
      counTt++;
      }
    }
 }

  /**
    if (this.numberDaysWorking > 1) {
      
      var holdingHours = ((hoursArray[this.PreferedDay] - this.maxDayHours));
      
      
      console.log(pDays);
      for (var count = 0; count < hoursArray.length; count++) {
        if (hoursArray[this.PreferedDay] == hoursArray[count]) {} else {
          hoursArray[count] += holdingHours;
          hoursArray[this.PreferedDay] -= holdingHours;
        }
      }
      
    }
    ----------------------------------------------------------------
     if (hoursArray[this.PreferedDay] > this.maxDayHours) {

      var holdingHours = (Math.floor((hoursArray[this.PreferedDay] % pDays))) / (pDays - 1);


      for (var count = 0; count < hoursArray.length; count++) {
        if (hoursArray[this.PreferedDay] == hoursArray[count]) {} else {
          hoursArray[count] += holdingHours;
        }
      }
      hoursArray[this.PreferedDay] -= holdingHours * 2;
    };
    **/
  this.hours = hoursArray;
};


person.prototype.displayHours = function() {
  var displayArray = [],
    tempArray = this.hours;
  for (var count = 0, goThrough = this.daysWorking.length; count < goThrough; count++) {

    if (this.daysWorking[count] == true && this.weekSchedule[count] == 0) {
      displayArray.push(tempArray.pop());
    } else if (this.weekSchedule[count] > 0) {
      displayArray.push(this.weekSchedule[count]);
    } else {
      displayArray.push("");
    };

  };
  this.weekSchedule = displayArray;
};

person.prototype.calcManualHours = function() {
  for (var count = 0; count < this.manualHours.length; count++) {
    if (this.manualHours[count] > 0) {
      this.maxWeekHours -= this.manualHours[count];
      this.weekSchedule[count] = this.manualHours[count];
    };
  };
};

var daysToArrays = function() {
  for (var count = 0, workArray = []; count < 7; count++) {
    if (document.getElementById(count).checked == true) {
      workArray.push(true);
    } else {
      workArray.push(false);
    }
  };
  return workArray;
};

var mDaysToArrays = function() {
  for (var count = 1, workArray = []; count <= 7; count++) {
    workArray.push(document.getElementById(count * 10).value);
  };
  return workArray;
};




document.getElementById("people").innerHTML = getPeople(arr);

var myFunction = function() {
console.log(arr);
  var inName = document.getElementById("name").value;
  var iprefDay = document.getElementById("prefDay").value;
  var imaxWeekHours = document.getElementById("maxWeekHours").value;
  var imaxDayHours = document.getElementById("maxDayHours").value;
  var idaysWorking = daysToArrays();
  var imanualHours = mDaysToArrays();
  console.log(imaxDayHours);
  if (arr.length == 0) {
    arr.push(new person(inName, iprefDay, imaxWeekHours, imaxDayHours, idaysWorking, imanualHours));
  } else {
    var doubleName = -1;
    for (var count = 0, cArrayd = arr.length; count < cArrayd; count++) {
      if (arr[count].name == inName) {
        doubleName = count;
      }
    }
    if (doubleName >= 0) {
      arr[doubleName] = new person(inName, iprefDay, imaxWeekHours, imaxDayHours, idaysWorking, imanualHours);
    } else {
      arr.push(new person(inName, iprefDay, imaxWeekHours, imaxDayHours, idaysWorking, imanualHours));


    };


  }



  document.getElementById("people").innerHTML = getPeople(arr);
};
