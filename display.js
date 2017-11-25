//Finalizes the organize hours array into a HTML table.
function htmlDisplayPeople(peopleDictionary) {
    var returnString = '<table style="width:100%">    <th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th><th>Sunday</th><th>ExtraHours</th><tr>';
    for (var key in peopleDictionary) if (peopleDictionary[key].hasOwnProperty('name') && peopleDictionary[key].hasOwnProperty('totalSchedule')) {
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
    returnString += "</tr></table>";
    return returnString;
}