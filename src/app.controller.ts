import { Body, Controller, Get, Post, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { AppService } from './app.service';
//import Docxtemplater from 'docxtemplater';
//import {PizZip} from "pizzip";
import { staplerParser } from './parser';
import { ReplaceOptions } from './ReplaceOptions';

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const fs = require("fs");
const path = require("path");



@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly ruleService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/replaceVariables")
  async replaceVariables(@Body() replaceOptions: ReplaceOptions): Promise<any> {
    
    let templateIds = this.ruleService.getTemplates(replaceOptions.replaceVariables);

    //1 - get template based on rules
    //2 - get from S3
    //3 - replace -> ok
    //4 - convert -> +/-
    try {
      const content = fs.readFileSync(
        path.resolve(__dirname, "../tag-example.docx"),
        "binary"
      );
    
      const zip = new PizZip(content);
      
      const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          parser: staplerParser,
          nullGetter: () => {return '';},
      });
      
      doc.render(replaceOptions.replaceVariables);
      
      const buf = doc.getZip().generate({
          type: "nodebuffer",
          // compression: DEFLATE adds a compression step.
          // For a 50MB output document, expect 500ms additional CPU time
          compression: "DEFLATE",
      });
      
      // buf is a nodejs Buffer, you can either write it to a
      // file or res.send it with express for example.
      const pdfBuf = await libre.convertAsync(buf, '.pdf', undefined);

      fs.writeFileSync(path.resolve(__dirname, "../outputConverted.pdf"), pdfBuf);

      fs.writeFileSync(path.resolve(__dirname, "../output.docx"), buf);
      return true;
      // const file = createReadStream(buf);
      // return new StreamableFile(file);
    } catch (error) {
      throw error;
    }
    
  }
/**
 * Download from S3
 * 
 *     // download the file via aws s3 here
    var fileKey = req.query['fileKey'];
 
    console.log('Trying to download file', fileKey);
     
    AWS.config.update(
      {
        accessKeyId: "....",
        secretAccessKey: "...",
        region: 'ap-southeast-1'
      }
    );
    var s3 = new AWS.S3();
    var options = {
        Bucket    : '/bucket-url',
        Key    : fileKey,
    };
 
    res.attachment(fileKey);
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
 * 
 * 
 */

}

