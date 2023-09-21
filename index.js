import { Command } from 'commander';
import { listContacts, getContactById, removeContact, addContact, invokeAction } from './db/contacts.js';

const program = new Command();

program
  .command('list')
  .description('List all contacts')
  .action(() => {
    invokeAction({ action: 'list' });
  });

program
  .command('get <id>')
  .description('Get a contact by ID')
  .action((id) => {
    invokeAction({ action: 'get', id });
  });

program
  .command('add <name> <email> <phone>')
  .description('Add a new contact')
  .action((name, email, phone) => {
    invokeAction({ action: 'add', name, email, phone });
  });

program
  .command('remove <id>')
  .description('Remove a contact by ID')
  .action((id) => {
    invokeAction({ action: 'remove', id });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}