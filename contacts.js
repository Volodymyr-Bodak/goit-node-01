import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, 'contacts.json');




async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: Date.now(), name, email, phone };
  contacts.push(newContact);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}


function invokeAction({ action, id, name, email, phone }) {
  console.log('Action:', action);
  switch (action) {
    case 'list':
      console.log('Listing contacts:');
      listContacts().then((contactsList) => {
        console.log(contactsList);
      });
      break;

    case 'get':
      console.log('Getting contact by ID:', id);
      if (id) {
        getContactById(id)
          .then((contact) => {
            if (contact) {
              console.log('Contact:', contact);
            } else throw Error(`No such contact with ${id}`);
          })
          .catch((error) => console.error('Error getting contact:', error.message));
      } else {
        console.log('Please provide a contact ID using the --id option.');
      }
      break;

    case 'add':
      console.log('Adding contact:', name, email, phone);
      addContact(name, email, phone);
      break;

    case 'remove':
      console.log('Removing contact by ID:', id);
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

export { listContacts, getContactById, removeContact, addContact, invokeAction };