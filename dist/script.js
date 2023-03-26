"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var fs = require("fs");
var months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
];
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
    //console.log(historyData);
    saveData();
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
        var monthWord = createMonthFormat(month);
        var string = day + " " + monthWord + " " + year + " at " + hour + ":" + min;
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
        var monthWord = createMonthFormat(month);
        var string = day + " " + monthWord + " at " + hour + ":" + min;
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
        var _a = createDate(element), chosenDate = _a.chosenDate, day = _a.day, month = _a.month, year = _a.year, hour = _a.hour, min = _a.min;
        var monthWord = createMonthFormat(month);
        series.push(day + " " + monthWord);
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
    if (graphData.length != 0) {
        createProgressDialog();
    }
}
function createMonthFormat(month) {
    var monthWord = "";
    if (month !== "10" && month !== "11" && month !== "12") {
        var slicedMonth = month.slice(1);
        for (var i = 0; i < months.length; i++) {
            if (+month === i + 1) {
                monthWord = months[i];
            }
        }
    }
    else {
        for (var i = 0; i < months.length; i++) {
            if (+month === i + 1) {
                monthWord = months[i];
            }
        }
    }
    return monthWord;
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
    newCurrentWeight.classList.add("weight-difference__value");
    newStartWeight.classList.add("weight-difference__value");
    newProgress.classList.add("weight-difference__value");
    newCurrentWeight.setAttribute("id", "current-weight__value");
    newStartWeight.setAttribute("id", "start-weight__value");
    newProgress.setAttribute("id", "progress__value");
    newCurrentWeight.innerHTML = currentWeight.toString() + " Kg";
    newStartWeight.innerHTML = startWeigth.toString() + " Kg";
    newProgress.innerHTML = progress.toString() + " Kg";
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
//Itt is olyan problémám volt, hogy amikor a typescript-et átkonvertálja js-be, az import helyett require-t használ
function saveData() {
    console.log("HEY");
    historyData.forEach(function (element) {
        var jsonData = JSON.stringify(element);
        fs.writeFile("./history.json", jsonData, function (err) {
            if (err) {
                console.log("Error writing file", err);
            }
            else {
                console.log("JSON data is written to the file successfully");
            }
        });
    });
}
var loadFile = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.promises.readFile("./history.json", {
                        encoding: "utf-8",
                    })];
            case 1:
                data = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
