var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");


var websites;
if (localStorage.getItem("websites") != null) {
  websites = JSON.parse(localStorage.getItem("websites"));
  displayWebsite();
} else {
  websites = [];
}

function addWebsite() {
  
if (validateUrl(siteUrlInput.value)) {
  var webSite = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  websites.push(webSite);
  displayWebsite();

  localStorage.setItem("websites", JSON.stringify(websites));
  clearForm();
}
  
  
}

function displayWebsite() {
  var webs = "";
  for (var i = 0; i < websites.length; i++) {
    webs += `<tr>
    <td>${i + 1}</td>
    <td>${websites[i].name}</td>
    <td><button class="btn btn-outline-info"><a href="${websites[i].url}" target="_blank">Visit</a></button></td>

    <td><button onclick="deleteWebsite(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`;
  }

  document.getElementById("tBody").innerHTML = webs;
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}


function deleteWebsite (index) {
  websites.splice(index, 2);
  localStorage.setItem('websites', JSON.stringify(websites));
  displayWebsite();
}


function validateUrl (urlName) {
  var urlRegEx = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,2}[a-zA-Z]{2,}(\/[^\s]*)?$/;
  return urlRegEx.test(urlName);
}




