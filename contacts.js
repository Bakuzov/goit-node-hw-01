const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let listContacts = JSON.parse(data);
    console.table(listContacts);
  } catch (error) {
    console.error(error);
  }
}
async function getContactById(contactId) {
  if (!contactId) {
    return console.log("Please enter id");
  }
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const getContact = JSON.parse(data).find(
      (contact) => contact.id === String(contactId)
    );
    getContact.length === 0
      ? console.log(`Contact with id ${contactId} not found`)
      : console.table(getContact);
  } catch (error) {
    console.error(`Got an error trying to get the file: ${error}`);
  }
}

async function removeContact(contactId) {
  try {
    if (!contactId) {
      return console.log("Please enter id");
    }
    const data = await fs.readFile(contactsPath, "utf8");
    const prevList = JSON.parse(data);
    const newList = prevList.filter((contact) => contact.id !== contactIdn);
    if (prevList.length !== newList.length) {
      const newListStr = JSON.stringify(newList);
      fs.writeFile(contactsPath, newListStr, "utf8");
      console.table(newList);
      console.log(`The contact with ID ${contactId} has been deleted`);
    } else {
      console.log(`Contact with id ${contactId} not found`);
    }
  } catch (error) {
    console.error(`Got an error trying to remove the file: ${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    let listContacts = JSON.parse(data);
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    listContacts.push(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(listContacts, null, 2),
      "utf8"
    );
    console.table(listContacts);
  } catch (error) {
    console.error(`Got an error trying to add the file: ${error}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
