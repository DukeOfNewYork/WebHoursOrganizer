//the dictionary of all users.
personDictionary = {};
//How long the schedule is, for this it's a week.
lengthOfSchedule = 7;
//The minimal amount of time scheduled, so .25 is every quarter hour.
minimumTime = 0.25;

//Creates a new Person and adds them to the person dictionary with the HTML name as name and the value as the object
var addPerson = function () {
    var htmlInput = {
        name: document.getElementById("name").value,
        dailyHourLimit: document.getElementById("dailyHourLimit").value,
        totalHours: document.getElementById("totalHours").value
    };
    personDictionary[htmlInput.name] = new Person(htmlInput);
    PersonWrapper.complete(personDictionary[htmlInput.name]);
    $('#people').html(htmlDisplayPeople(personDictionary));
};