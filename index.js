const dataHelper = require('./helper/dataHelper');
const jsonData = require('./data/data.json');
const fileHelper = require('./helper/fileHelper');


 // Convert JSON data to array and write to XLSX file
const dataArray = dataHelper.jsonToArray(jsonData);
fileHelper.writeToXlsx(dataArray);
 // Read data from XLSX file and compare with array converted array data
const readArray = fileHelper.readFromXlsx();
const differentiatedRows = dataHelper.compareArrays(dataArray, 'sfcc', readArray, 'ajex', true);
 // Write differentiated rows to XLSX file
fileHelper.writeToXlsx(differentiatedRows, true);