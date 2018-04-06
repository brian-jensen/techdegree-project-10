/* jshint esversion: 6 */

const directoryContainer = document.querySelector('main');
let employees = [];

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    employees = data.results;
    buildDirectory(data);
  }
});

function buildDirectory(data) {
  for (const key in employees) {
    let image = employees[key].picture.large;
    let firstName = employees[key].name.first;
    let lastName = employees[key].name.last;
    let fullName = capitalize(`${firstName} ${lastName}`);
    let email = employees[key].email;
    let cell = employees[key].phone;
    let street = employees[key].location.street;
    let city = employees[key].location.city;
    let state = employees[key].location.state;
    let zipcode = employees[key].location.postcode;
    let dob = new Date(Date.parse(employees[key].dob.replace(/-/g, "/"))).toLocaleDateString(navigator.language);

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
  }
}

function capitalize(name) {
  return name.replace(/(\b)([a-z\WA-Z\W])/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}

