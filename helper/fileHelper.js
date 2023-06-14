const XLSX = require('xlsx');
 // function to write data to XLSX file
function writeToXlsx(data, isDifferentDocument = false) {
  try {
    // create worksheet with appropriate headers based on isDifferentDocument flag
    const worksheet = isDifferentDocument ? XLSX.utils.aoa_to_sheet([['Country', 'City', 'District','Origin']]) : XLSX.utils.aoa_to_sheet([['Country', 'City', 'District']]);
    if(isDifferentDocument){
      data.forEach((city) => {
        city.districts.forEach((district) => {
            XLSX.utils.sheet_add_json(worksheet, [{Country: 'Saudi Arabia', City: city.name, District: district.name, Origin: city.origin}], { skipHeader: true, origin: -1 });
        });
      });
    }else{
      data.forEach((city) => {
        city.districts.forEach((district) => {
            XLSX.utils.sheet_add_json(worksheet, [{Country: 'Saudi Arabia', City: city.name, District: district.name}], { skipHeader: true, origin: -1 });
        });
      });
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
     // set filename based on isDifferentDocument flag and write workbook to file
    const filename = isDifferentDocument ? 'differences.xlsx' : 'output.xlsx';
    XLSX.writeFile(workbook, filename);
     // log success message
    console.log('Data saved to XLSX file');
  } catch (err) {
    // log error message if there was an error
    console.error('Error saving data to XLSX file:', err);
  }
}
 // function to read data from XLSX file
function readFromXlsx() {
  try {
    // read workbook from file
    const workbook = XLSX.readFile('fminddata.xlsx');
     // if no sheets found, log message and return empty array
    if (workbook.SheetNames.length === 0) {
      console.log('No sheets found in input.xlsx');
      return [];
    }
     // get first worksheet and initialize empty data array and headers array
    const worksheet = workbook.Sheets['Sheet1'];
    const data = [];
    const headers = ['Country', 'City', 'District'];
     // loop through rows in worksheet and add data to data array
    XLSX.utils.sheet_to_json(worksheet, { header: headers }).forEach((row) => {
      // find index of city in data array
      const cityIndex = data.findIndex((item) => item.name === row.City);
       // if city not found, add new city object to data array with district
      if (cityIndex === -1) {
        data.push({ name: row.City, districts: [{ name: row.District }] });
      } else {
        // otherwise, add district to existing city object
        data[cityIndex].districts.push({ name: row.District });
      }
    });
     // return data array
    return data;
  } catch (err) {
    // log error message if there was an error and return -1
    console.log(err);
    return -1;
  }
}
 // export functions for use in other modules
module.exports = {
  writeToXlsx: writeToXlsx,
  readFromXlsx: readFromXlsx
}