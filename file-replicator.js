/** @format */

"use strict";
const S3 = require("aws-sdk/clients/s3");

const getS3Configuration = (bucket) => {
  return {
    accessKeyId: process.env[`KOYEB_STORE_${bucket}_ACCESS_KEY`],
    secretAccessKey: process.env[`KOYEB_STORE_${bucket}_SECRET_KEY`],
    region: process.env[`KOYEB_STORE_${bucket}_REGION`],
    endpoint: process.env[`KOYEB_STORE_${bucket}_ENDPOINT`],
  };
};

const validateEnvironment = (bucket) => {
  if (!bucket) {
    throw new Error("Bucket name not present in event payload.");
  }

  if (
    !process.env?.[`KOYEB_STORE_${bucket}_ACCESS_KEY`] ||
    !process.env?.[`KOYEB_STORE_${bucket}_SECRET_KEY`] ||
    !process.env[`KOYEB_STORE_${bucket}_REGION`] ||
    !process.env[`KOYEB_STORE_${bucket}_ENDPOINT`]
  ) {
    throw new Error(
      `One of the following environment variables are missing: KOYEB_STORE_${bucket}_ACCESS_KEY, KOYEB_STORE_${bucket}_SECRET_KEY, KOYEB_STORE_${bucket}_ENDPOINT, KOYEB_STORE_${bucket}_REGION.`
    );
  }
};

const handler = async (event) => {
  const sourceBucket = event?.bucket?.name;
  const destinatonBucket = process.env.DESTINATION_STORE;
  const key = event?.object?.key;

  validateEnvironment(sourceBucket);
  validateEnvironment(destinatonBucket);

  const s3InstanceSrc = new S3(getS3Configuration(sourceBucket));
  const s3InstanceDst = new S3(getS3Configuration(destinatonBucket));

  try {
    const response = await s3InstanceSrc
      .getObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();

    await s3InstanceDst
      .upload({
        Bucket: destinatonBucket,
        Key: key,
        Body: response.Body,
        ContentType: response.ContentType,
        Metadata: response.Metadata,
      })
      .promise();
  } catch (error) {
    throw error;
  }
};

module.exports.handler = handler;
