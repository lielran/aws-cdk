import * as cdk from '@aws-cdk/core';
import * as cloudfront from '../lib';
import { TestOrigin } from './test-origin';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'integ-distribution-policies');

const originRequestPolicy = new cloudfront.OriginRequestPolicy(stack, 'CachePolicy', {
  originRequestPolicyName: 'ACustomOriginRequestPolicy',
  headerBehavior: cloudfront.OriginRequestHeaderBehavior.all('CloudFront-Forwarded-Proto'),
});

new cloudfront.Distribution(stack, 'Dist', {
  defaultBehavior: {
    origin: new TestOrigin('www.example.com'),
    originRequestPolicy,
  },
});

app.synth();
