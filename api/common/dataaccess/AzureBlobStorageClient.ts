import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

const randomProfileImagePicker = () => {
  const min = 1,
    max = 9;
  const profileImageNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return `pattern${profileImageNumber}.jpg`;
};

export const getAzureProfileImgBlobByUrl = async () => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(randomProfileImagePicker());
  return blockBlobClient.url;
};
