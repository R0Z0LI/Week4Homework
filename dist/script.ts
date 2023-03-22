const addButton = document.getElementById("add-btn");
const weightDiv = document.getElementById("weight")! as HTMLInputElement;
const dateDiv = document.getElementById("date")! as HTMLInputElement;
const historyContainer = document.getElementById(
  "history__container"
)! as HTMLInputElement;

const date = new Date();
const thisYear = date.getFullYear.toString;
const thisMonth = date.getMonth.toString;
const today = date.getDay.toString;

type weightElement = {
  date: string;
  weight: number;
};

let historyData: weightElement[] = [];

addButton?.addEventListener("click", addWeight);

function addWeight() {
  deletePreviousElements();
  const firstElem: weightElement = {
    weight: +weightDiv.value,
    date: dateDiv.value,
  };
  historyData.push(firstElem);

  sort();

  let i = 0;
  historyData.forEach((element) => {
    if (i < 10) {
      const year = element.date.slice(0, 4);
      const month = element.date.slice(5, 7);
      const day = element.date.slice(8, 10);
      const hour = element.date.slice(11, 13);
      const min = element.date.slice(14, 16);
      const chosenDate = new Date(+year, +month, +day, +hour, +min);
      const newDivElement = document.createElement("div");
      newDivElement.setAttribute("id", "history__row_" + i);
      historyContainer.appendChild(newDivElement);
      const newWeight = document.createElement("span");
      newWeight.innerHTML = element.weight.toString() + " kg    ";
      const newDate = document.createElement("span");
      console.log(chosenDate.getUTCDate());
      console.log(date.getUTCDate());
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

      newDivElement.appendChild(newWeight);
      newDivElement.appendChild(newDate);
    }

    i++;
  });
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
