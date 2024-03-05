import database from './database.json';
import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';
import Person from './person.js';

DraftLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.blue("Km Traveled") },
    { field: "from", name: chalk.green("From") },
    { field: "to", name: chalk.red("To") },
  ]
};

const table = chalkTable(options, database.map(item => new Person(item).formatted('pt-BR')));
const print = console.draft(table);

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.question('Please, insert your data: ', (msg)=>{
  console.log('DATA',msg);
})