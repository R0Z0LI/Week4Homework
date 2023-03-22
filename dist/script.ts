const addButton = document.getElementById("add-btn");
const weightDiv = document.getElementById("weight")! as HTMLInputElement;
const dateDiv = document.getElementById("date")! as HTMLInputElement;
const historyContainer = document.getElementById(
  "history__container"
)! as HTMLInputElement;

const date = new Date();
const thisYear = date.getFullYear().toString();
const thisMonth = date.getUTCMonth().toString();
const thisDay = date.getUTCDate().toString();
const thisHour = date.getUTCHours().toString();
const thisMinutes = date.getUTCMinutes().toString();

type weightElement = {
  date: string;
  weight: number;
};

let historyData: weightElement[] = [];

dateDiv.max = new Date().toISOString().slice(0, 19);

addButton?.addEventListener("click", addWeight);

function addWeight() {
  deletePreviousElements();
  const firstElem: weightElement = {
    weight: +weightDiv.value,
    date: dateDiv.value,
  };
  console.log(firstElem.date);
  if (firstElem.weight === 0 || firstElem.date === "") {
    window.alert("You should set a weight and date aswell!");
  } else {
    historyData.push(firstElem);
  }

  sort();

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
    let string = day + " " + month + " " + year + " at " + hour + ":" + min;
    newDate.innerHTML = string;
  } else if (chosenDate.getUTCDate() === date.getUTCDate()) {
    let string = "today at " + hour + ":" + min;
    newDate.innerHTML = string;
  } else if (chosenDate.getUTCDate() === date.getUTCDate() - 1) {
    let string = "yesterday at " + hour + ":" + min;
    newDate.innerHTML = string;
  } else {
    let string = day + " " + month + " at " + hour + ":" + min;
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

function sort() {
  for (let i = 0; i < historyData.length; i++) {
    for (let j = 0; j < historyData.length; j++) {
      if (historyData[i].date > historyData[j].date) {
        let tmp = historyData[i];
        historyData[i] = historyData[j];
        historyData[j] = tmp;
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
