const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const calendarContainer = document.getElementById('calendar');

const colors = ['#161b22', '#0e4429', '#26a641', '#39d353', '#39FF53'];
let currentColorIndex = 0;

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function days_of_a_year(currentYear) {
  return isLeapYear(currentYear) ? 366 : 365;
}

function isLeapYear(currentYear) {
     return currentYear % 400 === 0 || (currentYear % 100 !== 0 && currentYear % 4 === 0);
}


function createSquare(id) {
    const square = document.createElement('div');
    square.className = 'square';
    square.id = id;
    square.textContent = id;

    return square;
}

let dayDay = 1
let dayCount = 0;
let weekCount = 0

for (let week = 0; week <= days_of_a_year(currentYear)/7 && dayCount >= 0; week++) {
    const col = document.createElement('div');
    col.className = 'col';
    col.id = `colID_${week}`;
    calendarContainer.appendChild(col);
    if (week == 0) {
        for (let weekName = 0; weekName <= 6; weekName++) {
            const weekWeek = document.createElement('div')
            weekWeek.className = 'weekCol'
            weekWeek.textContent = weekDays[weekName]
            col.appendChild(weekWeek)
        }
    } else {
        for (let day = 1; day <= 7; day++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `squareID_${dayDay}`;
            col.appendChild(square);
            dayCount++
            if (dayCount >= 7){
                dayCount = 0;
            }
            dayDay++
        }
    }
}
