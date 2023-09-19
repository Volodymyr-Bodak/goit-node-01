import { listContacts, getContactById, removeContact, addContact } from "./db/contacts.js";
async function testContactFunctions() {
    // List contacts
    console.log('Contacts:');
    const contactsList = await listContacts();
    console.log(contactsList);
  
    // Add a new contact
    console.log('Adding a new contact...');
    const newContact = await addContact('John Doe', 'john@example.com', '1234567890');
    console.log('New contact added:', newContact);
  
    // Get a contact by ID
    console.log('Getting contact by ID...');
    const contactById = await getContactById(newContact.id);
    console.log('Contact by ID:', contactById);
  
    // Remove a contact
    console.log('Removing the contact...');
    const removedContact = await removeContact(newContact.id);
    console.log('Removed contact:', removedContact);
  
    // List contacts after removal
    console.log('Contacts after removal:');
    const updatedContactsList = await listContacts();
    console.log(updatedContactsList);
  }
  
  testContactFunctions();