dateTimeAgoPageLoadFn = function () {
  const relativeTimeSpanish = new RelativeTime({ locale: "hi" }); // set locale to Spanish

  let dateArray = [
    "10-Apr-2024",
    "01-May-2024",
    "10-May-2024",
    "10-May-2025",
    "18-May-2025",
    "15-May-2024",
    "19-May-2024",
    "19-June-2024",
    "19-November-2023",
  ];

  let textAreaElement = document.getElementById("dates-input-textarea");
  textAreaElement.value = dateArray.join("\n");

  createTable(dateArray);
};

function getTimeAgo(dateStr) {
  const relativeTime = new RelativeTime(); // defaults to OS locale
  let dateObj = new Date(dateStr);
  return relativeTime.from(dateObj);
}

function getFormattedDate(dateStr) {
  if (!isValidDate(dateStr)) return "Invalid Date";

  let dateObj = new Date(dateStr);

  let formatter = Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeZone: "Asia/Kolkata",
  });

  return formatter.format(dateObj);
}

function textAreaChangeFn(element) {
  console.log(element);
  let value = element.value;
  console.log(value);

  let input = value.split(/\r?\n|\r|\n/g);
  console.log(input);

  createTable(input);
}

function createTable(dateArray) {
  let tableHTML = "";

  tableHTML += `
      <tr>
          <td>Date String</td>
          <td>Date Readable</td>
          <td>Time Before / After </td>
      </tr>`;
  for (let i = 0; i < dateArray.length; i++) {
    tableHTML += `
          <tr>
          <td>${dateArray[i]}</td>
          <td>${getFormattedDate(dateArray[i])}</td>
          <td>${getTimeAgo(dateArray[i])}</td>
          </tr>`;
  }

  let tableElement = document.getElementById("dates-table");
  tableElement.innerHTML = tableHTML;
  return tableHTML;
}

function isValidDate(dateStr) {
  let date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.valueOf());
}
