/* This function converts a JSON object to an array of objects
 * @param {String} JSON that comes from citiesAndDistrics.json
 * @returns {Array} returns array of objects
 */
function jsonToArray(data) {
  const cityArray = []; // Initialize an empty array to store the objects
  for (const city in data) { // Loop through each city in the JSON object
    const cityObj = { // Create a new object for each city
      name: city, // Set the name property to the current city
      districts: [] // Initialize an empty array to store the districts
    };
    for (const district in data[city].districts) { // Loop through each district in the current city
      if (data[city].districts.hasOwnProperty(district)) { // Check if the district property exists
        cityObj.districts.push({ // Add a new object to the districts array
          name: district // Set the name property to the current district
        });
      }
    }
    cityArray.push(cityObj); // Add the city object to the city array
  }
  return cityArray; // Return the array of city objects
}


/* Compares two arrays of objects and returns the differences between them.
 * @param {Array} array1 - First array of objects to compare.
 * @param {String} filename1 - Name of the file where array1 is located.
 * @param {Array} array2 - Second array of objects to compare.
 * @param {String} filename2 - Name of the file where array2 is located.
 * @param {Boolean} caseMatch - Indicates whether the comparison should be case-sensitive.
 * @returns {Array} - Array of objects containing the differences between the two arrays.
 */
function compareArrays(array1, filename1, array2, filename2, caseMatch = false) {
  const result = [];
   // Loop through array1 and compare each object to array2
  array1.forEach(obj1 => {
    const obj2 = caseMatch ? array2.find(obj2 => obj2.name.toLowerCase() === obj1.name.toLowerCase()) : array2.find(obj2 => obj2.name === obj1.name);
     // If obj1 is not found in array2, add it to the result array with origin filename1
    if (!obj2) {
      result.push({ ...obj1, origin: filename1 });
    } else {
      // Compare the districts of obj1 and obj2
      const diff = compareDistricts(obj1.districts, obj2.districts, caseMatch);
       // If there are differences, add obj1 to the result array with origin filename1 and the differences in districts
      if (diff.length > 0) {
        result.push({ ...obj1, origin: filename1, districts: diff });
      }
    }
  });
   // Loop through array2 and compare each object to array1
  array2.forEach(obj2 => {
    const obj1 = caseMatch ? array1.find(obj1 => obj1.name.toLowerCase() === obj2.name.toLowerCase()) : array1.find(obj1 => obj1.name === obj2.name);
     // If obj2 is not found in array1, add it to the result array with origin filename2
    if (!obj1) {
      result.push({ ...obj2, origin: filename2 });
    } else {
      // Compare the districts of obj2 and obj1
      const diff = compareDistricts(obj2.districts, obj1.districts, caseMatch);
       // If there are differences, add obj2 to the result array with origin filename2 and the differences in districts
      if (diff.length > 0) {
        result.push({ ...obj2, origin: filename2, districts: diff });
      }
    }
  });
   return result;
}
 /**
 * Compares two arrays of districts and returns the differences between them.
 * @param {Array} districts1 - First array of districts to compare.
 * @param {Array} districts2 - Second array of districts to compare.
 * @param {Boolean} caseMatch - Indicates whether the comparison should be case-sensitive.
 * @returns {Array} - Array of districts containing the differences between the two arrays.
 */
function compareDistricts(districts1, districts2, caseMatch) {
  const result = [];
   // Loop through districts1 and compare each district to districts2
  districts1.forEach(dist1 => {
    const dist2 = caseMatch ? districts2.find(dist2 => dist2.name.toLowerCase() === dist1.name.toLowerCase()) :  districts2.find(dist2 => dist2.name === dist1.name);
     // If dist1 is not found in districts2, add it to the result array
    if (!dist2) {
      result.push(dist1);
    }
  });
   return result;
}


module.exports = {
  jsonToArray: jsonToArray,
  compareArrays: compareArrays
};
