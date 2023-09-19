import { listContacts, getContactById, removeContact, addContact } from "./db/contacts.js";
async function testContactFunctions() {
    
    console.log('Contacts:');
    const contactsList = await listContacts();
    console.log(contactsList);
    console.log('Adding a new contact...');
    const newContact = await addContact('John Doe', 'john@example.com', '1234567890');
    console.log('New contact added:', newContact);
    console.log('Getting contact by ID...');
    const contactById = await getContactById(newContact.id);
    console.log('Contact by ID:', contactById);
    console.log('Removing the contact...');
    const removedContact = await removeContact(newContact.id);
    console.log('Removed contact:', removedContact);
    console.log('Contacts after removal:');
    const updatedContactsList = await listContacts();
    console.log(updatedContactsList);
  }
  
  testContactFunctions();