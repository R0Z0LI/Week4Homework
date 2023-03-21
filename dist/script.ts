const addButton = document.getElementById("add-btn");
const weightDiv = document.getElementById("weight")! as HTMLInputElement;
const dateDiv = document.getElementById("date")! as HTMLInputElement;

type weightElement = {
  weight: number;
  date: string;
};

let historyData: weightElement[] = [];

//today's date

addButton?.addEventListener("click", addWeight);

function addWeight() {
  const firstElem: weightElement = {
    weight: +weightDiv.value,
    date: dateDiv.value,
  };
  historyData.push(firstElem);
  for (let i = 0; i < historyData.length; i++) {
    console.log(historyData[i].date);
  }
}
