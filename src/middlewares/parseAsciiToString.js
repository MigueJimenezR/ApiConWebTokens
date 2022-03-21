import { text } from "express";
import fs from "fs";
import { parseString } from "xml2js";
let parser = require('fast-xml-parser');

export function ParseStrings(ascii) {
    var text = "";
    for (let i = 0; i < ascii.length; i++) {

        const characters = String.fromCharCode(ascii[i]);

        if (ascii[i] == 32 || ascii[i] == 13) {} else {
            text += characters;
            // console.log(characters);
            // console.log(ascii[i]);
        }
    }

    return text;
}