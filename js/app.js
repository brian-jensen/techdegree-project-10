/* jshint esversion: 6 */

const directoryContainer = document.querySelector('main');
const modalContainer = document.querySelector('aside');
const input = document.querySelector('input');
let employees = [];

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
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
    directoryContainer.children[i].onclick = function() {
     buildModal(employees[i]);
    };
  }

  function buildModal(target) {
    for (const key in target) {
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
      let dob = new Date(Date.parse(target.dob.replace(/-/g, "/"))).toLocaleDateString(navigator.language);
      modalContainer.innerHTML += `
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
        </div>
      `;
    }
    let employeeModal = modalContainer.firstElementChild;
    modalContainer.style.display = 'block';
    employeeModal.style.display = 'block';
    if (target.gender === 'female') {
      let images = modalContainer.querySelector('img');
      images.style.borderColor = "#ffb6c1";
    }
  }

}

function capitalize(name) {
  return name.replace(/(\b)([a-z\WA-Z\W])/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}

// https://gist.github.com/calebgrove/c285a9510948b633aa47
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

  if (to == 'abbr'){
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      for(i = 0; i < states.length; i++){
          if(states[i][0] == input){
              return(states[i][1]);
          }
      }    
  } else if (to == 'name'){
      input = input.toUpperCase();
      for(i = 0; i < states.length; i++){
          if(states[i][1] == input){
              return(states[i][0]);
          }
      }    
  }
}

window.onload = function () {
  input.value = '';
};
