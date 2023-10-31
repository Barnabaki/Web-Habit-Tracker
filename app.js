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

logButton.onclick = function () {
  console.log('logButton');
  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentDay = currentDate.getDate();
  const formattedDate = `${currentDay}.${currentMonth}.${currentYear}`;

  // Find the square with the current date's ID and pass the ID to addClassToElement
  addClassToElement(formattedDate);
};


// Function to save the class assignments to localStorage
function saveDataToStorage(savedDays) {
  localStorage.setItem('savedDays', JSON.stringify(savedDays));
}

// Function to load the class assignments from localStorage
function loadDataFromStorage() {
  const savedDaysData = localStorage.getItem('savedDays');
  return savedDaysData ? JSON.parse(savedDaysData) : {};
}

// Function to update the page with the saved data
function updatePageWithSavedData(savedDays) {
  for (const day in savedDays) {
    const element = document.getElementById(day);
    if (element) {
      const assignedClass = savedDays[day];
      element.className = '';
      if (classes.includes(assignedClass)) {
        element.classList.add(assignedClass);
      }
    }
  }
}

// Save the data to storage when the save button is clicked
saveButton.onclick = function () {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentDay = currentDate.getDate();
  const formattedDate = `${currentDay}.${currentMonth}.${currentYear}`;
  var element = document.getElementById(formattedDate);

  if (element) {
    savedDays[formattedDate] = element.className;
    // Save the updated data to localStorage
    saveDataToStorage(savedDays);
  }
};

// Load the saved data from storage and update the page when it loads
window.addEventListener('load', function () {
  const savedDaysData = loadDataFromStorage();
  updatePageWithSavedData(savedDaysData);
});




const savedDays = {"20.11.2023": 'activityLevel-1', "21.10.2023": 'activityLevel-4'};
const classes = ['activityLevel-1', 'activityLevel-2', 'activityLevel-3', 'activityLevel-4', 'noActivity'];

function loadData(savedDays) {
  for (const day in savedDays) {
    const element = document.getElementById(day);
    if (element) {

      element.className = '';
      const assignedClass = savedDays[day];

      if (classes.includes(assignedClass)) {
        element.classList.add(assignedClass);
      }
    }
  }
}

function addClassToElement(formattedDate) {
  var element = document.getElementById(formattedDate);

  if (element) {
    console.log('addClassToElement');

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


loadData(savedDays);



/*
1. get rid of the repeteation (current date, element?s)
2. comment all the key features
3. add a user sign up and log in 
4. find a way to backup the info when clicking save
5. load the backup


Extra:
- add different colours
- make it nicer (border around the calendar, light-mode)
- ability to create different calendars with different colours and titles
*/