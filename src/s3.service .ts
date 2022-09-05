import { Injectable } from '@nestjs/common';
import { RuleExpression } from './RuleExpression';
import AWS from 'aws-sdk';
@Injectable()
export class S3Service {
  async getDocument(templateId: string ): Promise<any>
  {
    // download the file via aws s3 here
    // var fileKey = req.query[templateId];
 
    console.log('Trying to download file', templateId);
     
    AWS.config.update(
      {
        accessKeyId: "....",
        secretAccessKey: "...",
        region: 'eu-west-2'
      }
    );
    var s3 = new AWS.S3();
    var options = {
        Bucket    : '/bucket-url',
        Key    : templateId,
    };
 
    //res.attachment(fileKey);
    var {Body} = await s3.getObject(options).promise();
    var content = await s3.getObject(options).createReadStream();
    //.createReadStream();
    return Body;
  }

}

