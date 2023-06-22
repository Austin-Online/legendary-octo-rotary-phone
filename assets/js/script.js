// Global Const
const timeDisplayEl = $('#currentDay');

// Time Block Elements
const timeBlocks = {
  nine: { element: $('#9'), button: $('#button9'), input: $('#input9') },
  ten: { element: $('#10'), button: $('#button10'), input: $('#input10') },
  eleven: { element: $('#11'), button: $('#button11'), input: $('#input11') },
  twelve: { element: $('#12'), button: $('#button12'), input: $('#input12') },
  one: { element: $('#13'), button: $('#button1'), input: $('#input1') },
  two: { element: $('#14'), button: $('#button2'), input: $('#input2') },
  three: { element: $('#15'), button: $('#button3'), input: $('#input3') },
  four: { element: $('#16'), button: $('#button4'), input: $('#input4') },
  five: { element: $('#17'), button: $('#button5'), input: $('#input5') }
};

// Day JS Time
const now = dayjs().format('HH');

// Displays the time
function displayTime() {
  const rightNow = dayjs().format('MMM DD, YYYY [at] HH:mm:ss a');
  timeDisplayEl.text(rightNow);
}

setInterval(displayTime, 1000);

displayTime();

// Event listeners
Object.keys(timeBlocks).forEach(blockKey => {
  const { button, input } = timeBlocks[blockKey];
  const storageKey = `${blockKey.replace('Am', ' am').replace('Pm', ' pm')}`;

  button.on('click', function(event) {
    event.preventDefault();
    const appt = input.val();
    localStorage.setItem(storageKey, JSON.stringify(appt));
  });

  function apptData() {
    const apptDisplay = JSON.parse(localStorage.getItem(storageKey));
    if (apptDisplay !== null) {
      input.text(apptDisplay);
    }
  }
  apptData();
});

// Data persistence in local storage
function localData() {
  Object.values(timeBlocks).forEach(block => block.apptData());
}

// Past, Present, and Future 
function workDay() {
  Object.values(timeBlocks).forEach(({ element }) => {
    const timeHour = element.attr('id');
    if (now === timeHour) {
      element.addClass('present');
    } else if (now < timeHour) {
      element.addClass('future');
    } else if (now > timeHour) {
      element.addClass('past');
    }
  });
}

// Calls the function that controls the color of the time blocks
workDay();

localData();
