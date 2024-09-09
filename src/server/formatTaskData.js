// THIS: Get next date from data (15th July at 3pm or 2nd June at 1pm)

function formatDueDate(task) {
  const { dueDate } = task;
  let setDate = new Date(dueDate);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = setDate.toLocaleString("en-US", options);

  return formattedDate;
}

export default formatDueDate;
