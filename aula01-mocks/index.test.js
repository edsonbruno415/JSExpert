const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

  (async () => {
    {
      const filePath = './mocks/emptyFile-invalid.csv';
      const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
      const result = File.csvToJson(filePath);
      await rejects(result, rejection);
    }
    {
      const filePath = './mocks/fourItems-invalid.csv';
      const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
      const result = File.csvToJson(filePath);
      await rejects(result, rejection);
    }
    {
      const filePath = './mocks/fileWithoutHeaders-invalid.csv';
      const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
      const result = File.csvToJson(filePath);
      await rejects(result, rejection);
    }
    {
      const filePath = './mocks/threeItems-valid.csv';
      const result = await File.csvToJson(filePath);
      const expected = [
        {
          "id": 123,
          "name": "Erick Wendel",
          "profession": "JavaScript Instructor",
          "birthDay":1995
        },
        {
          "id": 321,
          "name": "Xuxa da Silva",
          "profession": "JavaScript Specialist",
          "birthDay":1940
        },
        {
          "id": 231,
          "name": "Joãozinho Meneses",
          "profession": "Java Developer",
          "birthDay":1990
        }
      ]

      deepStrictEqual(JSON.stringify(result),JSON.stringify(expected));
    }
  })();