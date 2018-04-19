//Adds on change listeners to the tbody, then checks if it's the upper row or lower row.
//If manual hours or auto hours are changed it disables the other so that each aren't active at the same time.
var organizeInput = function () {
    $("#inputs tbody input").change(function (day) {
        if (day.target.id <= lengthOfSchedule) {
            $("#" + (day.target.id * 10)).val(0);
        }
        else {
            $('#' + (day.target.id / 10)).prop('checked', false)
        }
    })
};

//Finalizes the organize hours array into a HTML table.
var htmlDisplayPeople = function (peopleDictionary) {
    var totalCoverage = [];
    var returnString = '<table style="width:100%">    <th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th><th>UnusedHours</th><tr>';
    for (var key in peopleDictionary) if (peopleDictionary[key].hasOwnProperty('name') && peopleDictionary[key].hasOwnProperty('totalSchedule')) {
        returnString += "<tr>";
        returnString += "<th>" + peopleDictionary[key].name + "</th>";
        for (var days = 0, totalSchedule = peopleDictionary[key].totalSchedule; days < totalSchedule.length; days++) {
            if (peopleDictionary[key].totalSchedule[days] > 0) {
                returnString += "<th>" + peopleDictionary[key].totalSchedule[days] + "</th>";
//If TotalCoverage has a blank value it is assigned the value from the Person, however if the array already has a value it adds them together
                totalCoverage[days] = ((totalCoverage[days] += totalSchedule[days]) || totalSchedule[days]);
            } else {
                if (typeof totalCoverage[days] === 'number') {
                    totalCoverage[days] += 0;
                } else {
                    totalCoverage[days] = 0;
                }
                returnString += "<th></th>";
            }
        }
        returnString += "</tr>";
    }
    returnString += "<tr>";
    returnString += "<th>Total Coverage</th>";
    for (var days = 0; days < totalCoverage.length; days++) {
        returnString += "<th>" + totalCoverage[days] + "</th>";
    }
    returnString += "</tr></table>";
    return returnString;
};

var htmlDisplayArray = function (input) {
    var returnString = '<table style="width:100%">    <th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th><th>UnusedHours</th><tr>';

};