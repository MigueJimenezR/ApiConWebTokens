import Product from "../models/Product";
import xml2js from 'xml2js';
import { async } from "node-stream-zip";
const streamZip = require('node-stream-zip');
const fs = require('fs');
const unrar = require('node-unrar-js');
import { readFiles } from '../middlewares'

var parser = new xml2js.Parser({
    explicitArray: false
});

export function ReadZip(file) {
    var appDir = process.cwd();
    const newRoute = appDir + `\\` + file.path;
    console.log("leyendo zip");
    console.log(newRoute);
    let nar = 0;
    const zip = new streamZip({
        file: newRoute,
        storeEntries: true,
    });
    zip.on('ready', () => {
        console.log('Entries read: ' + zip.entriesCount);
        for (const entry of Object.values(zip.entries())) {
            const archivo = entry.name;
            if (archivo.substring(archivo.length - 3).toUpperCase() === "XML") {
                nar++;
                console.log('Archivo (' + nar + ')' + archivo);
                let xml = zip.entryDataSync(archivo).toString('utf8');
                console.log(xml);
                parser.parseString(xml, async function(err, result) {
                    if (err) {
                        console.error('xml2js.parseString: Error occurred: ', err);
                    } else {
                        const contactInfo = result;
                        const dataProduct = contactInfo['Product'];
                        const newProduct = new Product({ name: dataProduct.name, category: dataProduct.category, price: dataProduct.price, imgURL: dataProduct.imgURL });
                        //const productSave = await newProduct.save();
                        console.log(newProduct);
                    }
                })
            }
        }
    })
}

export async function ReadRar(file) {
    var appDir = process.cwd();
    const newRoute = appDir + `\\` + file.path;

    const buf = Uint8Array.from(fs.readFileSync(newRoute)).buffer;
    const extractor = await unrar.createExtractorFromData({ data: buf });
    const list = extractor.getFileList();
    const listArcHeader = list.arcHeader; // archive header
    const fileHeaders = [...list.fileHeaders]; // load the file headers
    for (let i = 0; i < fileHeaders.length; i++) {
        if (fileHeaders[i].name.match(/\.(xml)$/)) {
            const extracted = extractor.extract({ files: [fileHeaders[i].name] }, (err) => {
                console.log(err);
            });
            //console.log(extracted);
            //modificable a futuro par apruebas
            const files = [...extracted.files];
            var arr1 = [];
            var text = '';
            for (var n = 0; n < files[0].extraction.length; n++) {
                const hex = String.fromCharCode(files[0].extraction[n]);
                if (files[0].extraction[n] == 13 || files[0].extraction[n] === 10) {

                } else {
                    arr1.push(hex);
                    text = text + hex;
                }

                //text = text + hex;
            }
            console.log(text);
            var arr2 = arr1.join('');
            console.log(arr2);

            parser.parseString(arr2, async function(err, result) {
                if (err) {
                    console.error('xml2js.parseString: Error occurred: ', err);
                } else {
                    const contactInfo = result;
                    const dataProduct = contactInfo['Product'];
                    const newProduct = new Product({ name: dataProduct.name, category: dataProduct.category, price: dataProduct.price, imgURL: dataProduct.imgURL });
                    //const productSave = await newProduct.save();
                    //console.log(newProduct);
                }
            })

        } else {
            console.log("archivo no compatible");
        }
    }
}


export async function ReadXml(file) {
    var appDir = process.cwd();
    const newRoute = appDir + `\\` + file.path;
    console.log("leyendo xml");
    console.log(newRoute);
    fs.readFile(newRoute, 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err);
        } else {
            parser.parseString(data, async function(err, result) {
                if (err) {
                    console.error('xml2js.parseString: Error occurred: ', err);
                } else {
                    const contactInfo = result;
                    const dataProduct = contactInfo['Product'];
                    const newProduct = new Product({ name: dataProduct.name, category: dataProduct.category, price: dataProduct.price, imgURL: dataProduct.imgURL });
                    //const productSave = await newProduct.save();
                    console.log(newProduct);
                }
            })
        }
    });
}