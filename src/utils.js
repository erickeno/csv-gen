const XLSX = require('xlsx');

module.exports = async function excelToJson(data) {
  let workbook;

  if (Buffer.isBuffer(data)) {
    const buffer = new Uint8Array(data);
    workbook = XLSX.read(buffer, { type: 'array' });
  } else {
    workbook = XLSX.readFile(data);
  }
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  return Promise.resolve(XLSX.utils.sheet_to_json(worksheet));
};
