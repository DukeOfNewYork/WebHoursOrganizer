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
function htmlDisplayPeople(peopleDictionary) {
    var returnString = '<table style="width:100%">    <th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th><th>UnusedHours</th><tr>';
    for (var key in peopleDictionary) if (peopleDictionary[key].hasOwnProperty('name') && peopleDictionary[key].hasOwnProperty('totalSchedule')) {
        returnString += "<tr><tr>";
        returnString += "<th>" + peopleDictionary[key].name + "</th>";
        for (var days = 0, totalSchedule = peopleDictionary[key].totalSchedule.length; days < totalSchedule; days++) {
            if (peopleDictionary[key].totalSchedule[days] >= 0) {
                returnString += "<th>" + peopleDictionary[key].totalSchedule[days] + "</th>";
            } else {
                returnString += "<th></th>";
            }
        }
    }
    returnString += "</tr></table>";
    return returnString;
}