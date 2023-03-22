"use strict";
const addButton = document.getElementById("add-btn");
const weightDiv = document.getElementById("weight");
const dateDiv = document.getElementById("date");
const historyContainer = document.getElementById("history__container");
const weekBtn = document.getElementById("week");
const monthBtn = document.getElementById("month");
const yearBtn = document.getElementById("year");
const lifetime = document.getElementById("lifetime");
const currentWeightDiv = document.getElementById("current-weight");
const startWeightDiv = document.getElementById("start-weight");
const progressDiv = document.getElementById("progress");
const date = new Date();
let historyData = [];
let graphData = [];
dateDiv.max = new Date().toISOString().slice(0, 19);
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
    const firstElem = {
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
    let i = 0;
    historyData.forEach((element) => {
        if (i < 10) {
            const { chosenDate, day, month, year, hour, min } = createDate(element);
            const newDivElement = document.createElement("div");
            newDivElement.setAttribute("id", "history__row_" + i);
            historyContainer.appendChild(newDivElement);
            const newWeight = document.createElement("span");
            let roundWeight = (Math.round(element.weight * 100) / 100).toFixed(1);
            newWeight.innerHTML = roundWeight.toString() + " kg    ";
            const newDate = document.createElement("span");
            createDateFormat(chosenDate, day, month, year, hour, min, newDate);
            newDivElement.appendChild(newWeight);
            newDivElement.appendChild(newDate);
        }
        i++;
    });
}
function createDateFormat(chosenDate, day, month, year, hour, min, newDate) {
    if (chosenDate.getFullYear() !== date.getFullYear()) {
        let string = day + " " + month + " " + year + " at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
    else if (chosenDate.getUTCDate() === date.getUTCDate()) {
        let string = "today at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
    else if (chosenDate.getUTCDate() === date.getUTCDate() - 1) {
        let string = "yesterday at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
    else {
        let string = day + " " + month + " at " + hour + ":" + min;
        newDate.innerHTML = string;
    }
}
function createDate(element) {
    const year = element.date.slice(0, 4);
    const month = element.date.slice(5, 7);
    const day = element.date.slice(8, 10);
    const hour = element.date.slice(11, 13);
    const min = element.date.slice(14, 16);
    const chosenDate = new Date(+year, +month, +day, +hour, +min);
    return { chosenDate, day, month, year, hour, min };
}
function sort(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i].date > data[j].date) {
                let tmp = data[i];
                data[i] = data[j];
                data[j] = tmp;
            }
        }
    }
}
function deletePreviousElements() {
    for (let i = 0; i < historyData.length; i++) {
        const history__container__firstDiv = document.getElementById("history__row_" + i);
        history__container__firstDiv === null || history__container__firstDiv === void 0 ? void 0 : history__container__firstDiv.remove();
    }
}
function createDiagram(id) {
    var _a, _b, _c;
    let series = [];
    let axis = [];
    graphData.length = 0;
    setDiagramAxis(id);
    graphData.forEach((element) => {
        series.push(element.date);
        axis.push(element.weight);
    });
    console.log(axis);
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
    const deleteWeight = (_a = document
        .getElementById("current-weight__value")) === null || _a === void 0 ? void 0 : _a.remove();
    const deleteStart = (_b = document.getElementById("start-weight__value")) === null || _b === void 0 ? void 0 : _b.remove();
    const deleteProgress = (_c = document.getElementById("progress__value")) === null || _c === void 0 ? void 0 : _c.remove();
    const currentWeight = graphData[graphData.length - 1].weight;
    const startWeigth = graphData[0].weight;
    const progress = currentWeight - startWeigth;
    const newCurrentWeight = document.createElement("span");
    const newStartWeight = document.createElement("span");
    const newProgress = document.createElement("span");
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
        let first = date.getDate() - (date.getDay() - 1);
        let last = first + 6;
        historyData.forEach((element) => {
            const { chosenDate, day, month, year, hour, min } = createDate(element);
            console.log(chosenDate.getUTCMonth());
            console.log(date.getUTCMonth());
            if (chosenDate.getDate() >= first &&
                chosenDate.getDate() <= last &&
                chosenDate.getUTCMonth() === date.getUTCMonth() + 1 &&
                chosenDate.getFullYear() === date.getFullYear()) {
                graphData.push(element);
                sort(graphData);
                graphData.reverse();
            }
        });
    }
    else if (id === "month") {
        historyData.forEach((element) => {
            const { chosenDate, day, month, year, hour, min } = createDate(element);
            if (chosenDate.getUTCMonth() === date.getUTCMonth() + 1 &&
                chosenDate.getFullYear() === date.getFullYear()) {
                graphData.push(element);
                sort(graphData);
                graphData.reverse();
            }
        });
    }
    else if (id === "year") {
        historyData.forEach((element) => {
            const { chosenDate, day, month, year, hour, min } = createDate(element);
            if (chosenDate.getFullYear() === date.getFullYear()) {
                graphData.push(element);
                sort(graphData);
                graphData.reverse();
            }
        });
    }
    else if (id === "lifetime") {
        historyData.forEach((element) => {
            graphData.push(element);
            sort(graphData);
            graphData.reverse();
        });
    }
}
