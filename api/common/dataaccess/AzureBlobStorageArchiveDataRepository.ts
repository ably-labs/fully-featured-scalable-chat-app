import { AppendBlobClient, BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { IArchiveDataRepository } from "./IArchiveDataRepository";

export class AzureBlobStorageArchiveDataRepository implements IArchiveDataRepository {
    private _blobServiceClient: BlobServiceClient;
    private _containerClient: ContainerClient;

    constructor() {
        const containerName = process.env.ARCHIVE_CONTAINER || "archive";
        this._blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        this._containerClient = this._blobServiceClient.getContainerClient(containerName);
    }

    public async append(fileName: string, data: string): Promise<void> {
        const blockBlobClient = await this.blobClientFor(fileName);
        await blockBlobClient.appendBlock(data, data.length);
    }

    public async get(fileName: string, offset: number, count: number): Promise<Buffer> {
        const blockBlobClient = await this.blobClientFor(fileName);
        return await blockBlobClient.downloadToBuffer(offset, count);
    }

    public async sizeof(fileName: string): Promise<number> {
        const blockBlobClient = await this.blobClientFor(fileName);
        const metadata = await blockBlobClient.getProperties();
        return metadata.contentLength;
    }

    private async blobClientFor(fileName: string): Promise<AppendBlobClient> {
        this.ensureStorageExists();
        const blockBlobClient = this._containerClient.getAppendBlobClient(fileName);
        await blockBlobClient.createIfNotExists();
        return blockBlobClient;
    }

    private async ensureStorageExists() {
        // TODO: Only run this once.
        await this._containerClient.createIfNotExists();
    }
}

