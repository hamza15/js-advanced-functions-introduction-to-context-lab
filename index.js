// Your code here
function createEmployeeRecord(arr) {
    return {
        "firstName": arr[0],
        "familyName": arr[1],
        "title": arr[2],
        "payPerHour": arr[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(arr));
}

function createTimeInEvent(record, stamp) {
    record.timeInEvents.push({
        type: "TimeIn",
        date: stamp.split(" ")[0],
        hour: parseInt(stamp.split(" ")[1])
    })

    return record
}

function createTimeOutEvent(record, stamp) {
    record.timeOutEvents.push({
        type: "TimeOut",
        date: stamp.split(" ")[0],
        hour: parseInt(stamp.split(" ")[1])
    })

    return record
}

function hoursWorkedOnDate(employee, date) {
    let timeInStamp = employee.timeInEvents.find(stamp => stamp.date == date)
    let timeOutStamp = employee.timeOutEvents.find(stamp => stamp.date == date)
    return (timeOutStamp.hour - timeInStamp.hour)/100
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(stamp => stamp.date)
    let wages = datesWorked.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName == name)
}



function calculatePayroll(employees) {
    let allEmployeesWages = employees.map(employee => allWagesFor(employee)) //array of all employee wages
    let totalWages = allEmployeesWages.reduce((a, b) => a + b, 0) 

    return totalWages
}