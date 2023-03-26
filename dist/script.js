var addButton = document.getElementById("add-btn");
var weightDiv = document.getElementById("weight");
var dateDiv = document.getElementById("date");
var historyContainer = document.getElementById("history__container");
var weekBtn = document.getElementById("week");
var monthBtn = document.getElementById("month");
var yearBtn = document.getElementById("year");
var lifetime = document.getElementById("lifetime");
var currentWeightDiv = document.getElementById("current-weight");
var startWeightDiv = document.getElementById("start-weight");
var progressDiv = document.getElementById("progress");
var date = new Date();
var tmpId = "week";
var historyData = [];
var graphData = [];
dateDiv.max = new Date().toISOString().slice(0, 19);
//createDiagram(tmpId);
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addWeight);
weekBtn === null || weekBtn === void 0 ? void 0 : weekBtn.addEventListener("click", function () {
    createDiagram("week");
});
monthBtn === null || monthBtn === void 0 ? void 0 : monthBtn.addEventListener("click", function () {
    createDiagram("month");
});
yearBtn === null || yearBtn === void 0 ? void 0 : yearBtn.addEventListener("click", function () {
    createDiagram("year");
});
lifetime === null || lifetime === void 0 ? void 0 : lifetime.addEventListener("click", function () {
    createDiagram("lifetime");
});
function addWeight() {
    deletePreviousElements();
    var firstElem = {
        weight: +weightDiv.value,
        date: dateDiv.value,
    };
    if (firstElem.weight === 0 || firstElem.date === "") {
        window.alert("You should set a weight and date aswell!");
    }
    else {
        historyData.push(firstElem);
    }
    sort(historyData);
    console.log(historyData);
    //saveData();
    var i = 0;
    historyData.forEach(function (element) {
        if (i < 10) {
            var _a = createDate(element), chosenDate = _a.chosenDate, day = _a.day, month = _a.month, year = _a.year, hour = _a.hour, min = _a.min;
            var newDivElement = document.createElement("div");
            newDivElement.setAttribute("id", "history__row_" + i);
            newDivElement.classList.add("history__rows");
            historyContainer.appendChild(newDivElement);
            var newWeight = document.createElement("span");
            var roundWeight = (Math.round(element.weight * 100) / 100).toFixed(1);
            newWeight.innerHTML = roundWeight.toString() + " kg    ";
            var newDate = document.createElement("span");
            createDateFormat(chosenDate, day, month, year, hour, min, newDate);
            newDivElement.appendChild(newWeight);
            newDivElement.appendChild(newDate);
        }
        i++;
    });
    createDiagram(tmpId);
}
function createDateFormat(chosenDate, day, month, year, hour, min, newDate) {
    if (chosenDate.getFullYear() !== date.getFullYear()) {
        var string = day + " " + month + " " + year + " at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
    else if (chosenDate.getUTCDate() === date.getUTCDate()) {
        var string = "today at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
    else if (chosenDate.getUTCDate() === date.getUTCDate() - 1) {
        var string = "yesterday at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
    else {
        var string = day + " " + month + " at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
}
function createDate(element) {
    var year = element.date.slice(0, 4);
    var month = element.date.slice(5, 7);
    var day = element.date.slice(8, 10);
    var hour = element.date.slice(11, 13);
    var min = element.date.slice(14, 16);
    var chosenDate = new Date(+year, +month, +day, +hour, +min);
    return { chosenDate: chosenDate, day: day, month: month, year: year, hour: hour, min: min };
}
function sort(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (data[i].date > data[j].date) {
                var tmp = data[i];
                data[i] = data[j];
                data[j] = tmp;
            }
        }
    }
}
function deletePreviousElements() {
    for (var i = 0; i < historyData.length; i++) {
        var history__container__firstDiv = document.getElementById("history__row_" + i);
        history__container__firstDiv === null || history__container__firstDiv === void 0 ? void 0 : history__container__firstDiv.remove();
    }
}
function createDiagram(id) {
    tmpId = id;
    var series = [];
    var axis = [];
    graphData.length = 0;
    setDiagramAxis(id);
    graphData.forEach(function (element) {
        series.push(element.date);
        axis.push(element.weight);
    });
    var options = {
        chart: {
            type: "line",
        },
        series: [
            {
                name: "sales",
                data: axis,
            },
        ],
        xaxis: {
            categories: series,
        },
    };
    // @ts-ignore
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    chart.updateOptions({
        series: [
            {
                name: "sales",
                data: axis,
            },
        ],
        xaxis: {
            categories: series,
        },
    });
    createProgressDialog();
}
function createProgressDialog() {
    var _a, _b, _c;
    var deleteWeight = (_a = document
        .getElementById("current-weight__value")) === null || _a === void 0 ? void 0 : _a.remove();
    var deleteStart = (_b = document.getElementById("start-weight__value")) === null || _b === void 0 ? void 0 : _b.remove();
    var deleteProgress = (_c = document.getElementById("progress__value")) === null || _c === void 0 ? void 0 : _c.remove();
    var currentWeight = graphData[graphData.length - 1].weight;
    var startWeigth = graphData[0].weight;
    var progress = currentWeight - startWeigth;
    var newCurrentWeight = document.createElement("span");
    var newStartWeight = document.createElement("span");
    var newProgress = document.createElement("span");
    newCurrentWeight.setAttribute("id", "current-weight__value");
    newStartWeight.setAttribute("id", "start-weight__value");
    newProgress.setAttribute("id", "progress__value");
    newCurrentWeight.innerHTML = currentWeight.toString();
    newStartWeight.innerHTML = startWeigth.toString();
    newProgress.innerHTML = progress.toString();
    currentWeightDiv === null || currentWeightDiv === void 0 ? void 0 : currentWeightDiv.appendChild(newCurrentWeight);
    startWeightDiv === null || startWeightDiv === void 0 ? void 0 : startWeightDiv.appendChild(newStartWeight);
    progressDiv === null || progressDiv === void 0 ? void 0 : progressDiv.appendChild(newProgress);
}
function setDiagramAxis(id) {
    if (id === "week") {
        var first_1 = date.getDate() - date.getDay();
        var last_1 = first_1 + 6;
        historyData.forEach(function (element) {
            var _a = createDate(element), chosenDate = _a.chosenDate, day = _a.day, month = _a.month, year = _a.year, hour = _a.hour, min = _a.min;
            if (chosenDate.getDate() >= first_1 &&
                chosenDate.getDate() <= last_1 &&
                chosenDate.getUTCMonth() === date.getUTCMonth() + 1 &&
                chosenDate.getFullYear() === date.getFullYear()) {
                graphData.push(element);
                sort(graphData);
                graphData.reverse();
            }
        });
    }
    else if (id === "month") {
        historyData.forEach(function (element) {
            var _a = createDate(element), chosenDate = _a.chosenDate, day = _a.day, month = _a.month, year = _a.year, hour = _a.hour, min = _a.min;
            if (chosenDate.getUTCMonth() === date.getUTCMonth() + 1 &&
                chosenDate.getFullYear() === date.getFullYear()) {
                graphData.push(element);
                sort(graphData);
                graphData.reverse();
            }
        });
    }
    else if (id === "year") {
        historyData.forEach(function (element) {
            var _a = createDate(element), chosenDate = _a.chosenDate, day = _a.day, month = _a.month, year = _a.year, hour = _a.hour, min = _a.min;
            if (chosenDate.getFullYear() === date.getFullYear()) {
                graphData.push(element);
                sort(graphData);
                graphData.reverse();
            }
        });
    }
    else if (id === "lifetime") {
        historyData.forEach(function (element) {
            graphData.push(element);
            sort(graphData);
            graphData.reverse();
        });
    }
}
/*function saveData() {
  console.log("HEY");
  historyData.forEach((element) => {
    const jsonData = JSON.stringify(element);
    fs.writeFile("./history.json", jsonData, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("JSON data is written to the file successfully");
      }
    });
  });
}*/
