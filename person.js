//Turns the HTML elements into properties
function Person(input) {
    this.dailyHourLimit = input.dailyHourLimit;
    this.totalHours = input.totalHours;
    this.name = input.name;
}
//Finishes the Person object with functions
var PersonWrapper = function () {
    var complete = function (person) {
        var allDaysWorking = person.allDaysWorking();
        person.manualHours = person.inputHours();
        person.numberOfDaysWorking = allDaysWorking[1];
//      dailySchedule requires dailyHourLimit
        person.dailySchedule = person.dailyHours();
        person.totalSchedule = person.organizeHours(person.dailySchedule,allDaysWorking[0]);
    };
    return {
        complete: complete
    }
}();

//Orders the HTML Days check boxes into a True False list
Person.prototype.allDaysWorking = function() {
    for (var count = 0, numberOfDays = 0, daysArray = []; count < lengthOfSchedule; count++) {
        if (document.getElementById(count).checked === true) {
            daysArray.push(true);
            numberOfDays++;
        } else {
            daysArray.push(false);
        }
    }
    return [daysArray,numberOfDays];
};
//Contains the manually input hours
Person.prototype.inputHours = function () {
    for (var count = 1, workArray =[]; count <= lengthOfSchedule; count++) {
        workArray.push(document.getElementById(count * 10).value);
//Removes the manually entered hours from the total hours counter
        this.totalHours -= workArray[count-1];
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
    this.unusedHours = totalHours;
    return hoursArray;
};
//Combines the array of Hours with the Boolean days working array to a array of numbers in the place of Boolean values.
Person.prototype.organizeHours = function (hoursArray,daysWorking) {
    var workingHoursArray = hoursArray.slice(0);
    var organizedHours = [];
    for (var count = 0; count < daysWorking.length; count++) {
        if (this.manualHours[count] > 0) {
            organizedHours.push(this.manualHours[count])
        } else if (daysWorking[count]) {
            organizedHours.push(workingHoursArray.pop())
        } else {
            organizedHours.push("")
        }
    }
    organizedHours.push(this.unusedHours);
    return organizedHours;
};