export function getAllContacts() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}

export function createContact(name, phone) {
  const contacts = getAllContacts();
  const newContact = { id: Date.now(), name, phone };
  contacts.push(newContact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

export function deleteContact(id, contacts = getAllContacts()) {
  const newContacts = contacts.filter(function (contact) {
    return contact.id !== Number(id);
  });
  localStorage.setItem("contacts", JSON.stringify(newContacts));
}

export function findOneContact(id, contacts = getAllContacts()) {
  const contact = contacts.find(function (contact) {
    return contact.id === Number(id);
  });
  return contact;
}

export function updateContact(data, contacts = getAllContacts()) {
  const result = contacts.map(function (contact) {
    return contact.id === Number(data.id)
      ? { ...contact, name: data.name, phone: data.phone }
      : contact;
  });
  localStorage.setItem("contacts", JSON.stringify(result));
}
