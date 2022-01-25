import { BlobServiceClient } from "@azure/storage-blob";

export default async function (channelName: string, message: any) {
    const fileName = channelName + ".json";
    const seperator = String.fromCharCode(30);
    const data = seperator + JSON.stringify(message);

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

    const containerName = process.env.ARCHIVE_CONTAINER || "archive";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getAppendBlobClient(fileName);
    await blockBlobClient.createIfNotExists();

    await blockBlobClient.appendBlock(data, data.length);
};
