const calendarContainer = document.getElementById('calendar');
const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function days_in_month(year, month) {
  console.log('days_in_month')
  return new Date(year, month + 1, 0).getDate();
}

function is_leap_year(year) {
  console.log('is_leap_year')
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function formatDate(date) {
  console.log('formatDate')
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}.${month}.${year}`;
}

function createSquare(id) {
  console.log('createSquare')
  const square = document.createElement('div');
  square.className = 'noActivity';
  square.id = formatDate(id);
  return square;
}

function getFirstMondayDate(year) {
  console.log('getFirstMondayDate')
  const date = new Date(year, 0, 1);
  const dayOfWeek = date.getDay();

  // Calculate the number of days to add to reach the first Monday
  const daysUntilMonday = 1 - dayOfWeek; // Adjust to Monday (1)
  if (daysUntilMonday > 0) {
    date.setDate(1 + daysUntilMonday); // Set the date to the first Monday
  } else {
    date.setDate(1 + daysUntilMonday + 7); // Go forward to the first Monday
  }

  return date;
}


const currentYear = new Date().getFullYear();
const initialDate = getFirstMondayDate(currentYear);

let date = new Date(initialDate);

for (let week = 0; week < 54; week++) {
  const col = document.createElement('div');
  col.className = 'col';
  col.id = `colID_${week}`;
  calendarContainer.appendChild(col);

  if (week === 0) {
    for (let weekName = 0; weekName <= 6; weekName++) {
      const weekWeek = document.createElement('div');
      weekWeek.className = 'weekCol';
      weekWeek.textContent = weekDays[weekName];
      col.appendChild(weekWeek);
    }
  } else if (week < 53) {
    for (let day = 1; day <= 7; day++) {
      if (date.getFullYear() === currentYear) {
        const square = createSquare(new Date(date));
        col.appendChild(square);
        date.setDate(date.getDate() + 1);
      } else {
        const square = createSquare('');
        col.appendChild(square);
      }
    }
  } else if (week === 53) {
    const daysIn53rdWeek = is_leap_year(currentYear) ? 2 : 1;
    for (let day = 0; day < daysIn53rdWeek; day++) {
      if (date.getFullYear() === currentYear) {
        const square = createSquare(new Date(date));
        col.appendChild(square);
        date.setDate(date.getDate() + 1);
      }
    }
  }
}


const nextButton = document.querySelector('#nextButton');

nextButton.onclick = function () {
  console.log('nextButton');
  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentDay = currentDate.getDate();
  const formattedDate = `${currentDay}.${currentMonth}.${currentYear}`;

  // Find the square with the current date's ID and pass the ID to addClassToElement
  addClassToElement(formattedDate);
};

function addClassToElement(formattedDate) {
  var element = document.getElementById(formattedDate);

  if (element) {
    console.log('addClassToElement');
    var classes = ['activityLevel-1', 'activityLevel-2', 'activityLevel-3', 'activityLevel-4', 'noActivity'];

    // Get the current class name of the element
    var currentClass = element.className;

    // Remove any existing classes from the element
    element.className = '';

    // Find the index of the current class in the array
    var currentIndex = classes.indexOf(currentClass);

    // Calculate the index of the next class
    var nextIndex = (currentIndex + 1) % classes.length;

    // Add the next class to the element
    element.classList.add(classes[nextIndex]);
  }
}