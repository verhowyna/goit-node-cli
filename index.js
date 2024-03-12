import { program } from "commander";

import * as contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.getAllContacts();
      return console.table(allContacts);
      break;

    case "get":
      const contactById = await contactsService.getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const newContact = await contactsService.addContact(data);
      return console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contactsService.deleteContactById(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
