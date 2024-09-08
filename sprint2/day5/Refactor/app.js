import {
  createContact,
  deleteContact,
  findOneContact,
  getAllContacts,
  updateContact,
} from "./contact.js";
import { sanitizeInput } from "./utils/sanitize.js";

const contactList = document.getElementById("contactList");
const filterInput = document.getElementById("filter");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const addContactBtn = document.getElementById("addContactBtn");
const updateContactBtn = document.getElementById("updateContactBtn");
const contactForm = document.getElementById("contacts");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const termsCheckBox = document.getElementById("terms");

function showError(element, message) {
  const spanError = document.createElement("span");
  spanError.classList.add("error");
  spanError.textContent = message;
  element.insertAdjacentElement("afterend", spanError);
  setTimeout(function () {
    spanError.remove();
  }, 1500);
  return;
}

function renderContacts(contacts) {
  contactList.innerHTML = "";
  contacts.forEach(function (contact) {
    let li = document.createElement("li");
    li.classList.add("contact-item");
    li.setAttribute("data-id", contact.id);
    li.innerHTML = `<strong>${contact.name}</strong> - ${contact.phone} <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
    contactList.appendChild(li);
  });
}

addContactBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const name = sanitizeInput(nameInput.value);
  const phone = sanitizeInput(phoneInput.value);
  const terms = termsCheckBox.checked;

  if (!/^[A-Za-z\s]+$/.test(name)) {
    showError(nameInput, "Name should contain only letters");
    return;
  }

  if (!/^[0-9]+$/.test(phone)) {
    showError(phoneInput, "Phone should contain only numbers");
    return;
  }

  if (!name || !phone || !terms) {
    showError(addContactBtn, "Please fill in all fields and accept the terms");
    return;
  }

  createContact(name, phone);
  renderContacts(getAllContacts());
  contactForm.reset();
});

contactList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const contactId = e.target.parentElement.getAttribute("data-id");
    deleteContact(contactId);
    renderContacts(getAllContacts());
  } else if (e.target.classList.contains("edit-btn")) {
    const contacts = getAllContacts();
    const contactId = e.target.parentElement.getAttribute("data-id");
    const contactToEdit = findOneContact(contactId, contacts);
    nameInput.value = contactToEdit.name;
    phoneInput.value = contactToEdit.phone;

    addContactBtn.style.display = "none";
    updateContactBtn.style.display = "block";

    updateContactBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const updatedName = nameInput.value.trim();
      const updatedPhone = phoneInput.value.trim();

      if (!/^[A-Za-z\s]+$/.test(updatedName)) {
        showError(nameInput, "Name should contain only letters.");
        return;
      }

      if (!/^[0-9]+$/.test(updatedPhone)) {
        showError(phoneInput, "Phone should contain only numbers.");
        return;
      }

      updateContact(
        { id: contactId, name: updatedName, phone: updatedPhone },
        contacts
      );
      renderContacts(getAllContacts());
      contactForm.reset();
      addContactBtn.style.display = "block";
      updateContactBtn.style.display = "none";
    });
  }
});

filterInput.addEventListener("input", function () {
  const filterValue = filterInput.value.toLowerCase();
  const contacts = getAllContacts();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filterValue) ||
      contact.phone.includes(filterValue)
  );
  renderContacts(filteredContacts);
});

clearFilterBtn.addEventListener("click", function () {
  filterInput.value = "";
  contactList.innerHTML = "";
  renderContacts(getAllContacts());
});

renderContacts(getAllContacts());
