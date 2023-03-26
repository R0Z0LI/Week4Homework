const addButton = document.getElementById("add-btn");
const weightDiv = document.getElementById("weight")! as HTMLInputElement;
const dateDiv = document.getElementById("date")! as HTMLInputElement;
const historyContainer = document.getElementById(
  "history__container"
)! as HTMLInputElement;
const weekBtn = document.getElementById("week");
const monthBtn = document.getElementById("month");
const yearBtn = document.getElementById("year");
const lifetime = document.getElementById("lifetime");

const currentWeightDiv = document.getElementById("current-weight");
const startWeightDiv = document.getElementById("start-weight");
const progressDiv = document.getElementById("progress");
const date = new Date();

const months = [
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

type weightElement = {
  date: string;
  weight: number;
};
let tmpId: string = "week";
let historyData: weightElement[] = [];
let graphData: weightElement[] = [];

dateDiv.max = new Date().toISOString().slice(0, 19);

//createDiagram(tmpId);

addButton?.addEventListener("click", addWeight);

weekBtn?.addEventListener("click", function () {
  createDiagram("week");
});

monthBtn?.addEventListener("click", function () {
  createDiagram("month");
});

yearBtn?.addEventListener("click", function () {
  createDiagram("year");
});

lifetime?.addEventListener("click", function () {
  createDiagram("lifetime");
});

function addWeight() {
  deletePreviousElements();
  const firstElem: weightElement = {
    weight: +weightDiv.value,
    date: dateDiv.value,
  };
  if (firstElem.weight === 0 || firstElem.date === "") {
    window.alert("You should set a weight and date aswell!");
  } else {
    historyData.push(firstElem);
  }
  sort(historyData);
  //console.log(historyData);
  //saveData();

  let i = 0;
  historyData.forEach((element) => {
    if (i < 10) {
      const { chosenDate, day, month, year, hour, min } = createDate(element);
      const newDivElement = document.createElement("div");
      newDivElement.setAttribute("id", "history__row_" + i);
      newDivElement.classList.add("history__rows");
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
  createDiagram(tmpId);
}

function createDateFormat(
  chosenDate: Date,
  day: string,
  month: string,
  year: string,
  hour: string,
  min: string,
  newDate: HTMLSpanElement
) {
  if (chosenDate.getFullYear() !== date.getFullYear()) {
    let monthWord: string = createMonthFormat(month);
    let string = day + " " + monthWord + " " + year + " at " + hour + ":" + min;
    newDate.innerHTML = string;
  } else if (chosenDate.getUTCDate() === date.getUTCDate()) {
    let string = "today at " + hour + ":" + min;
    newDate.innerHTML = string;
  } else if (chosenDate.getUTCDate() === date.getUTCDate() - 1) {
    let string = "yesterday at " + hour + ":" + min;
    newDate.innerHTML = string;
  } else {
    let monthWord: string = createMonthFormat(month);
    let string = day + " " + monthWord + " at " + hour + ":" + min;
    newDate.innerHTML = string;
  }
}

function createDate(element: weightElement) {
  const year = element.date.slice(0, 4);
  const month = element.date.slice(5, 7);
  const day = element.date.slice(8, 10);
  const hour = element.date.slice(11, 13);
  const min = element.date.slice(14, 16);
  const chosenDate = new Date(+year, +month, +day, +hour, +min);
  return { chosenDate, day, month, year, hour, min };
}

function sort(data: weightElement[]) {
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
    const history__container__firstDiv = document.getElementById(
      "history__row_" + i
    );
    history__container__firstDiv?.remove();
  }
}

function createDiagram(id: string) {
  tmpId = id;

  let series: string[] = [];
  let axis: number[] = [];
  graphData.length = 0;
  setDiagramAxis(id);
  graphData.forEach((element) => {
    const { chosenDate, day, month, year, hour, min } = createDate(element);
    let monthWord: string = createMonthFormat(month);
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

  createProgressDialog();
}

function createMonthFormat(month: string) {
  const slicedMonth = month.slice(1);
  let monthWord: string = "";
  for (let i = 0; i < months.length; i++) {
    if (+month === i + 1) {
      monthWord = months[i];
    }
  }
  return monthWord;
}

function createProgressDialog() {
  const deleteWeight = document
    .getElementById("current-weight__value")
    ?.remove();
  const deleteStart = document.getElementById("start-weight__value")?.remove();
  const deleteProgress = document.getElementById("progress__value")?.remove();

  const currentWeight = graphData[graphData.length - 1].weight;
  const startWeigth = graphData[0].weight;
  const progress = currentWeight - startWeigth;

  const newCurrentWeight = document.createElement("span");
  const newStartWeight = document.createElement("span");
  const newProgress = document.createElement("span");

  newCurrentWeight.classList.add("weight-difference__value");
  newStartWeight.classList.add("weight-difference__value");
  newProgress.classList.add("weight-difference__value");

  newCurrentWeight.setAttribute("id", "current-weight__value");
  newStartWeight.setAttribute("id", "start-weight__value");
  newProgress.setAttribute("id", "progress__value");

  newCurrentWeight.innerHTML = currentWeight.toString() + " Kg";
  newStartWeight.innerHTML = startWeigth.toString() + " Kg";
  newProgress.innerHTML = progress.toString() + " Kg";

  currentWeightDiv?.appendChild(newCurrentWeight);
  startWeightDiv?.appendChild(newStartWeight);
  progressDiv?.appendChild(newProgress);
}

function setDiagramAxis(id: string) {
  if (id === "week") {
    let first = date.getDate() - date.getDay();
    let last = first + 6;
    historyData.forEach((element) => {
      const { chosenDate, day, month, year, hour, min } = createDate(element);
      if (
        chosenDate.getDate() >= first &&
        chosenDate.getDate() <= last &&
        chosenDate.getUTCMonth() === date.getUTCMonth() + 1 &&
        chosenDate.getFullYear() === date.getFullYear()
      ) {
        graphData.push(element);
        sort(graphData);
        graphData.reverse();
      }
    });
  } else if (id === "month") {
    historyData.forEach((element) => {
      const { chosenDate, day, month, year, hour, min } = createDate(element);
      if (
        chosenDate.getUTCMonth() === date.getUTCMonth() + 1 &&
        chosenDate.getFullYear() === date.getFullYear()
      ) {
        graphData.push(element);
        sort(graphData);
        graphData.reverse();
      }
    });
  } else if (id === "year") {
    historyData.forEach((element) => {
      const { chosenDate, day, month, year, hour, min } = createDate(element);
      if (chosenDate.getFullYear() === date.getFullYear()) {
        graphData.push(element);
        sort(graphData);
        graphData.reverse();
      }
    });
  } else if (id === "lifetime") {
    historyData.forEach((element) => {
      graphData.push(element);
      sort(graphData);
      graphData.reverse();
    });
  }
}

//Itt is olyan problémám volt, hogy amikor a typescript-et átkonvertálja js-be, az import helyett require-t használ

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
}

const loadFile = async () {
  try{
    const data = await fs.promises.readFile("./history.json", {
      encoding: "utf-8",
    });
  } catch (error){
    console.error(error)
  }
}*/
