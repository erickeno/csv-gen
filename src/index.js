#!/usr/bin/env node
const fs = require('fs-extra');
const Papa = require('papaparse');
const prompts = require('prompts');
const excelToJson = require('./utils');
const trimEnd = require('lodash.trimend');

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
      const inputFile = trimEnd(answer.inputFile);
      const outputFile = inputFile.replace(/xlsx$/gi, 'csv');
      const data = await excelToJson(inputFile);

      // @ts-ignore
      const csv = Papa.unparse(data, opts);
      await fs.outputFile(outputFile, csv);
    }
  } catch (err) {
    console.error(err);
  }
}

changeToCsv();
