---
display_name: File replicator
status: ACTIVE
version: 1.0.0
---

## Summary

The file replicator function provides a simple way to copy files in one Store to another. For each file uploaded to the source Store, a copy is performed into the destination Store.

## Advantages of using Koyeb's file replicator Function

With Koyeb, you can run the file replicator integration to replicate assets easily and:

- Automatically trigger the processing from any cloud: AWS S3, DigitalOcean Spaces, Google Cloud Storage, etc.
- Perform a copy to the cloud service provider of your choice
- Ready to use, no code or complex configuration required to get started
- Combine additional processing actions that immediately use the results of the file replicator function

## Popular Use Cases with the file replicator Function

- Create backups in a different cloud service provider or bucket
- Live migration of your assets to another cloud service provider or bucket
- Archive your data into a specific bucket or cloud service provider

## How the file replicator Function Works with Koyeb

To get started with the file replicator function, you have to copy the configuration snippet below and replace the required values with yours.
This function is triggered each time an object is created in the Store you use.

Below is what you need to use this function:

* A Koyeb valid account
* A source Store your upload your data
* A destination Store your data are replicated