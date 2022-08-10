const { readFile } = require('fs/promises');
const { error } = require('./constants');
const User = require('./user');

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = await File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);

    const json = await File.parseCsvToJson(content);
    return json;
  }

  static async getFileContent(filePath) {
    const file = await readFile(filePath, 'utf8');
    return file;
  }

  static async isValid(content, options = DEFAULT_OPTION) {
    const [header, ...fileContent] = content.split('\n');
    const isHeaderValid = header === options.fields.join(',');
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    const isContentLengthAccepted = fileContent.length > 0 && fileContent.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static async parseCsvToJson(content){
    const [headers, ...lines] = content.split('\n');
    const header = headers.split(',');

    const people = lines.map((line)=>{
      const data = line.split(',');
      const people = {};
      for(const index in header){
        people[header[index]] = data[index];
      }
      
      return new User(people);
    });

    return people;
  }
}

module.exports = File;