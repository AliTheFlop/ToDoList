// TODO: Create a function that formats data for the front end

/*

item -> occurs (monthly, weekly, daily) -> interval (every 2 months, every 5 days, every 3 weeks), -> day of month (if monthly) -> day of week (if weekly)

endDate is when it finishes -> change start + end when that one's done & add it to a 'pastOccurences' thing

For All:
    Calculate the next date when the due date comes

For Weekly:
    Keep the current start and due dates always ready
    Take day of week + interval + Time (so Every 2 (interval) weeks on Sunday (day of week))

For Monthly:
    Calculate if the next month has that day
    Take the day of month + interval + Time (ex Every month on the 15th , every 2nd month, every 3rd month, every 16th month, every 22nd month)

For Daily:
    Keep track of time needed
    Take the time + interval + Time (daily at 4pm, daily all day)

*/

//THIS: Get the DESCRIPTION (Not '15th july at 10pm', just 'Every Week on Sunday at 10pm' so it isn't to be put under the task but in the task's page itself)

function monthly(task) {
  const newTask = task;
  const { interval, dayOfMonth } = newTask.frequency;
  const taskTime = newTask.time;
  let monthStatement;

  switch (interval) {
    case 1:
      monthStatement = `Every Month on the ${dayOfMonth} at ${taskTime}`;
      break;
    case interval > 1:
      monthStatement = `Every ${interval} Month on the ${dayOfMonth} at ${taskTime}`;
      break;
  }

  return monthStatement;
}

function weekly(task) {
  const newTask = task;
  const { interval, dayOfWeek } = newTask.frequency;
  const taskTime = newTask.time;

  let weekStatement;

  console.log(newTask.startDate.getUTCDate());

  switch (interval) {
    case 1:
      weekStatement = `Every Week on ${dayOfWeek} at ${taskTime}`;
      break;
    case interval > 1:
      weekStatement = `Every ${interval} Weeks on ${dayOfWeek} at ${taskTime}`;
  }

  return weekStatement;
}

function daily(task) {
  const newTask = task;
  const { interval } = newTask.frequency;
  const taskTime = newTask.time;

  let dayStatement;

  switch (interval) {
    case 1:
      dayStatement = `Daily at ${taskTime}`;
      break;
    case interval > 1:
      dayStatement = `Every ${interval} Days at ${taskTime}`;
  }

  return dayStatement;
}

function getDescription(task) {
  switch (task.frequency.type.toLowerCase()) {
    case "monthly":
      return monthly(task);

    case "weekly":
      return weekly(task);

    case "daily":
      return daily(task);

    default:
      console.log(task);
      break;
  }

  return task.frequency.type;
}

// THIS: Get next date from data (15th July at 3pm or 2nd June at 1pm)

function getNextDate(task) {
  const { startDate, frequency } = task;
  let nextDate = new Date(startDate);

  if (frequency.type === "Weekly") {
    nextDate.setDate(nextDate.getDate() + frequency.interval * 7);
  } else if (frequency.type === "Monthly") {
    nextDate.setMonth(nextDate.getMonth() + frequency.interval);
  }

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = nextDate.toLocaleString("en-US", options);

  return formattedDate;
}

export default (getDescription, getNextDate);
