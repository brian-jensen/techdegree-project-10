/* jshint esversion: 6 */

const directoryContainer = document.querySelector('main');
const modalContainer = document.querySelector('aside');
const input = document.querySelector('input');
let employees = [];

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function (data) {
    employees = data.results;
    buildDirectory(employees);
  }
});

function buildDirectory(data) {
  for (const key in employees) {
    let image = employees[key].picture.large;
    let firstName = employees[key].name.first;
    let lastName = employees[key].name.last;
    let fullName = capitalize(`${firstName} ${lastName}`);
    let email = employees[key].email;
    let city = employees[key].location.city;

    directoryContainer.innerHTML += `
    <div class="grid__col--4 employee">
        <ul class="employee-info">
          <li class="grid__col--1 employee-image"><img class="employee-img" src="${image}" alt="Image of ${fullName}"></li>
          <li class="grid__col--11">
            <p class="employee-name">${fullName}</p>
            <p class="employee-email">${email}</p>
            <p class="employee-city">${city}</p>
           </li>
        </ul>
      </div>
    `;

    if (employees[key].gender === 'female') {
      let images = document.querySelectorAll('img');
      images[key].style.borderColor = "#ffb6c1";
    }
  }

  input.addEventListener('keyup', (e) => {
    e.preventDefault();
    let search = e.target.value.toLowerCase();
    let employeeContainer = document.querySelectorAll('div.employee');
    let employeeName = document.querySelectorAll('.employee-name');
    for (let i = 0; i < employeeName.length; i++) {
      let filteredName = employeeName[i];
      if (filteredName.innerHTML.toLowerCase().indexOf(search) > -1) {
        employeeContainer[i].style.display = '';
      } else {
        employeeContainer[i].style.display = 'none';
      }
    }
  });

  for (let i = 0; i < directoryContainer.children.length; i++) {
    directoryContainer.children[i].onclick = function () {
      buildModal(employees[i], i);
    };
  }

  function buildModal(target, index) {
    let image = target.picture.large;
    let firstName = target.name.first;
    let lastName = target.name.last;
    let fullName = capitalize(`${firstName} ${lastName}`);
    let email = target.email;
    let cell = target.phone;
    let street = target.location.street;
    let city = target.location.city;
    let state = abbrState(target.location.state, 'abbr');
    let zipcode = target.location.postcode;
    let dob = new Date(Date.parse(target.dob.date)).toLocaleDateString(navigator.location);
    modalContainer.innerHTML = `
        <div class="employee-modal">
          <ul>
            <li><img src="${image}" alt="Image of ${fullName}"></li>
            <li>
              <p class="employee-modal-name">${fullName}</p>
              <p class="employee-modal-email">${email}</p>
              <hr>
              <p class="employee-modal-cell">&phone;&nbsp;&nbsp;1&plus;${cell}</p>
              <p class="employee-modal-street">${street}</p>
              <p class="employee-modal-address">${city}, ${state} ${zipcode}</p>
              <p class="employee-modal-dob">DOB: ${dob}</p>
            </li>
          </ul>
          <span class="svg-close-icon">
            <svg class="close-icon" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="25"/>
              <polyline points="16,34 25,25 34,16"/>
              <polyline points="16,16 25,25 34,34"/>
            </svg>
          </span>
          <span class="svg-left-arrow">
            <svg class="left-arrow" viewBox="0 0 54 54">
              <path d="M27,1L27,1c14.359,0,26,11.641,26,26v0c0,14.359-11.641,26-26,26h0C12.641,53,1,41.359,1,27v0
                C1,12.641,12.641,1,27,1z"/>
              <path d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2
                C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"/>
              <path class="inner-arrow" d="M31.706,40c-0.256,0-0.512-0.098-0.707-0.293L19.501,28.209c-0.667-0.667-0.667-1.751,0-2.418
                l11.498-11.498c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L21.12,27l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414
                C32.218,39.902,31.962,40,31.706,40z"/>
            </svg>
          </span>
          <span class="svg-right-arrow">
            <svg class="right-arrow" viewBox="0 0 54 54">
              <path d="M27,53L27,53C12.641,53,1,41.359,1,27v0C1,12.641,12.641,1,27,1h0c14.359,0,26,11.641,26,26v0
                C53,41.359,41.359,53,27,53z"/>
              <path d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2
                C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"/>
              <path class="inner-arrow" d="M22.294,40c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L32.88,27
                L21.587,15.707c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l11.498,11.498c0.667,0.667,0.667,1.751,0,2.418
                L23.001,39.707C22.806,39.902,22.55,40,22.294,40z"/>
            </svg>
          </span>
        </div>
      `;
    let employeeModal = modalContainer.firstElementChild;
    const leftArrowSpan = employeeModal.querySelector('.svg-left-arrow');
    const rightArrowSpan = employeeModal.querySelector('.svg-right-arrow');

    modalContainer.style.display = 'block';
    employeeModal.style.display = 'block';

    if (target.gender === 'female') {
      let images = modalContainer.querySelector('img');
      images.style.borderColor = "#ffb6c1";
    }

    if (index >= 1 && index <= employees.length) {
      leftArrowSpan.classList.remove('disabled');
    } else {
      leftArrowSpan.classList.add('disabled');
    }

    if (index + 1 === employees.length) {
      rightArrowSpan.classList.add('disabled');
    } else {
      rightArrowSpan.classList.remove('disabled');
    }

    employeeModal.addEventListener('click', (e) => {
      let clicked = e.target.parentElement.getAttribute('class');
      let svgParent = e.target.parentElement.parentElement.getAttribute('class')
      if (clicked === 'close-icon') {
        modalContainer.style.display = 'none';
        employeeModal.style.display = 'none';
      } else if (clicked === 'left-arrow' && svgParent !== 'svg-left-arrow disabled') {
        buildModal(employees[index - 1], index - 1);
      } else if (clicked === 'right-arrow' && svgParent !== 'svg-right-arrow disabled') {
        buildModal(employees[index + 1], index + 1);
      } else {
        return;
      }
    });
  }
}

function capitalize(name) {
  return name.replace(/(\b)([a-z\WA-Z\W])/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}

// abbrState function from: https://gist.github.com/calebgrove/c285a9510948b633aa47
function abbrState(input, to) {
  let states = [
    ['Arizona', 'AZ'],
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arizona', 'AZ'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
  ];

  if (to == 'abbr') {
    input = input.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (i = 0; i < states.length; i++) {
      if (states[i][0] == input) {
        return (states[i][1]);
      }
    }
  } else if (to == 'name') {
    input = input.toUpperCase();
    for (i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return (states[i][0]);
      }
    }
  }
}


window.onload = function () {
  input.value = '';
  console.log('SVG Icons made by https://www.flaticon.com/authors/smashicons');
};