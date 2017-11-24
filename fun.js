//the dictionary of all users.
personDictionary = {};
//How long the schedule is, for this it's a week.
lengthOfSchedule = 7;
//The minimal amount of time scheduled, so .25 is every quarter hour.
minimumTime = 0.25;

function Person(name, dailyHourLimit, totalHours) {
    this.dailyHourLimit = dailyHourLimit;
    this.numberOfDaysWorking = allDaysWorking()[1];//
//    manual Hours requires numberOfDays
    this.manualHours = this.inputHours();
    this.totalHours = totalHours;
//    dailySchedule requires dailyHourLimit
    this.dailySchedule = this.dailyHours();
    this.totalSchedule = this.organizeHours(this.dailySchedule,allDaysWorking()[0]);
    this.name = name;


}
//Orders the HTML Days check boxes into a True False list
function allDaysWorking() {
    for (var count = 0, numberOfDays = 0, daysArray = []; count < lengthOfSchedule; count++) {
        if (document.getElementById(count).checked === true) {
            daysArray.push(true);
            numberOfDays++;
        } else {
            daysArray.push(false);
        }
    }
    console.log(daysArray);
    return [daysArray,numberOfDays];
}
//Contains the manually input hours, along with remaining time for the ExtraHours field
Person.prototype.inputHours = function () {
    for (var count = 1, workArray =[]; count <= lengthOfSchedule; count++) {
        workArray.push(document.getElementById(count * 10).value);
    }
    return workArray;
};
//divides the time by minimum time between all of the days and adds any remainder to the end of manual hours.
Person.prototype.dailyHours = function() {
    var totalHours = this.totalHours;
    var hoursArray = [];
    for (var count = 0, pDays = this.numberOfDaysWorking; count < pDays; count++) hoursArray.push(0);
    //Evenly distributes the minimum time until it can no longer be distributed evenly, then adds the remainder to manualHours.
    while (totalHours >= this.numberOfDaysWorking * minimumTime) {
        for (count = 0; count < pDays; count++) {
            hoursArray[count] += minimumTime;
            totalHours -= minimumTime;
        }
        if (this.dailyHourLimit <= hoursArray[0]) break;
    }

    this.manualHours.push(totalHours);
    return hoursArray;
};
//Combines the array of Hours with the Boolean days working array to a array of numbers in the place of Boolean values.
Person.prototype.organizeHours = function (hoursArray,daysWorking) {
    var workingHoursArray = hoursArray;
    var organizedHours = [];
    for (var count = 0; count < daysWorking.length; count++) {
        if (daysWorking[count]){
            organizedHours.push(workingHoursArray.pop())
        } else {
            organizedHours.push("")
        }
    }
    return organizedHours;
};
//Finalizes the organize hours array into a HTML table.
function htmlDisplayPeople(peopleDictionary) {
    var returnString = '<table style="width:100%">    <th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th><th>ExtraHours</th><tr>';
    for (var key in peopleDictionary) {
        if (peopleDictionary[key].hasOwnProperty('name') && peopleDictionary[key].hasOwnProperty('totalSchedule')) {
            returnString += "<tr><tr>";
            returnString += "<th>" + peopleDictionary[key].name + "</th>";
            for (var days = 0; days < lengthOfSchedule; days++) {
                if (peopleDictionary[key].totalSchedule[days] >= 0) {
                    returnString += "<th>" + peopleDictionary[key].totalSchedule[days] + "</th>";
                } else {
                    returnString += "<th></th>";
                }
            }
        }
    }
    returnString += "</tr></table>";
    return returnString;
}
//Creates a new Person
var addPerson = function() {
    personDictionary[document.getElementById("name").value] = new Person(document.getElementById("name").value, document.getElementById("dailyHourLimit").value, document.getElementById("totalHours").value );
    document.getElementById("people").innerHTML = htmlDisplayPeople(personDictionary);
};