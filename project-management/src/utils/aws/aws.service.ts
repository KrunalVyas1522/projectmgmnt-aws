import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private lambda: AWS.Lambda;
  private sns: AWS.SNS;
  private sqs: AWS.SQS;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this.lambda = new AWS.Lambda();
    this.sns = new AWS.SNS();
    this.sqs = new AWS.SQS();
  }

  async invokeLambda(functionName: string, payload: any) {
    return this.lambda.invoke({ FunctionName: functionName, Payload: JSON.stringify(payload) }).promise();
  }

  async sendSnsMessage(topicArn: string, message: string) {
    return this.sns.publish({ TopicArn: topicArn, Message: message }).promise();
  }

  async sendSqsMessage(queueUrl: string, messageBody: string) {
    return this.sqs.sendMessage({ QueueUrl: queueUrl, MessageBody: messageBody }).promise();
  }
}
