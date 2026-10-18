const siteNameInput = document.getElementById("siteName");
const siteUrlInput = document.getElementById("siteUrl");
const tableBody = document.getElementById("tBody");
const formMessage = document.getElementById("formMessage");

const STORAGE_KEY = "websites";
const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

let websites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
displayWebsites();

function addWebsite() {
  const name = siteNameInput.value.trim();
  const url = siteUrlInput.value.trim();

  if (!name) {
    showMessage("Please enter a site name.");
    return;
  }

  if (!urlPattern.test(url)) {
    showMessage("Please enter a valid URL, e.g. https://example.com");
    return;
  }

  websites.push({ name, url: withProtocol(url) });
  saveWebsites();
  displayWebsites();
  clearForm();
}

function deleteWebsite(index) {
  websites.splice(index, 1);
  saveWebsites();
  displayWebsites();
}

function displayWebsites() {
  tableBody.innerHTML = websites
    .map(
      (site, i) => `<tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(site.name)}</td>
        <td><a class="btn btn-outline-info" href="${escapeHtml(site.url)}" target="_blank" rel="noopener noreferrer">Visit</a></td>
        <td><button onclick="deleteWebsite(${i})" class="btn btn-outline-danger">Delete</button></td>
      </tr>`
    )
    .join("");
}

function saveWebsites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(websites));
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  showMessage("");
}

function showMessage(text) {
  formMessage.textContent = text;
}

function withProtocol(url) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
