/* jshint esversion: 6 */

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    buildDirectory(data);
  }
});

function buildDirectory(data) {
  const directoryContainer = document.querySelector('main');

  for (const key in data.results) {
    let image = data.results[key].picture.large;
    let firstName = data.results[key].name.first;
    let lastName = data.results[key].name.last;
    let fullName = capitalize(`${firstName} ${lastName}`);
    let email = data.results[key].email;
    let cell = data.results[key].phone;
    let street = data.results[key].location.street;
    let city = data.results[key].location.city;
    let state = data.results[key].location.state;
    let zipcode = data.results[key].location.postcode;
    let dob = new Date(Date.parse(data.results[key].dob.replace(/-/g, "/"))).toLocaleDateString(navigator.language);

    directoryContainer.innerHTML += `
      <div class="grid__col--4 employee">
        <ul class="employee-info">
          <li><img class="employee-img" src="${image}" alt="Image of ${fullName}"></li>
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
