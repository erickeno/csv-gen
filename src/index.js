#!/usr/bin/env node

const fs = require('fs-extra');
const Papa = require('papaparse');
const prompts = require('prompts');
const { Convert } = require('aged-leads');

const convert = new Convert();
const question = {
  type: 'text',
  name: 'inputFile',
  message: "What's the file path ?",
};
const opts = { delimiter: '\t' };

async function changeToCsv() {
  try {
    const answer = await prompts(question);
    if (answer && answer.inputFile) {
      const inputFile = answer.inputFile.replace(/\s/g, '');
      const outputFile = inputFile.replace(/xlsx$/gi, 'csv');
      const data = await convert.excelToJson(inputFile);

      // @ts-ignore
      const csv = Papa.unparse(data, opts);
      await fs.outputFile(outputFile, csv);
    }
  } catch (err) {
    console.error(err);
  }
}

changeToCsv();
