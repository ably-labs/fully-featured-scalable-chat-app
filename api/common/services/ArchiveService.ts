import { IArchiveDataRepository } from "../dataaccess/IArchiveDataRepository";
import { AzureBlobStorageArchiveDataRepository } from "../dataaccess/AzureBlobStorageArchiveDataRepository";

const _512kb = 512 * 1024;

export class ArchiveService {
    private _repository: IArchiveDataRepository;

    constructor() {
        this._repository = new AzureBlobStorageArchiveDataRepository();
    }

    public async append(channelName: string, message: any) {
        const blobName = this.blobNameFor(channelName);
        const seperator = String.fromCharCode(30);
        const data = seperator + JSON.stringify(message);
        await this._repository.append(blobName, data);
    }

    public async get(channelName: string, skip: number = 0, limit: number = 200) {
        const blobName = this.blobNameFor(channelName);
        const blobSize = await this._repository.sizeof(blobName);
        const buffer = await this._repository.get(blobName, 0, blobSize);

        const messages = this.bufferToMessageArray(buffer);
        return { messages: messages, position: 0 };
    }

    /// <summary>
    /// Reads the archive in reverse, returning an array of messages and a seek `position` to continue reading from.
    /// </summary>
    public async getTail(channelName: string, offset: number = 0, maxReadChunk: number = _512kb) {
        const blobName = this.blobNameFor(channelName);
        const blobSize = await this._repository.sizeof(blobName);

        if (blobSize < maxReadChunk) {
            const buffer = await this._repository.get(blobName, 0, blobSize);
            const messages = this.bufferToMessageArray(buffer);
            return { messages, position: 0, done: true };
        }

        let position = blobSize - offset - maxReadChunk;
        let reduceReadBy = 0;
        if (position < 0) {
            reduceReadBy = position;
            position = 0;
        }

        const amountToRead = maxReadChunk + reduceReadBy;
        const buffer = await this._repository.get(blobName, position, amountToRead);

        const firstRecordSeparator = buffer.indexOf(String.fromCharCode(30)) + 1;
        const wholeRecords = buffer.slice(firstRecordSeparator);
        const nextReadPosition = position + firstRecordSeparator;

        const messages = this.bufferToMessageArray(wholeRecords);
        return { messages: messages, position: nextReadPosition, done: position <= 0 };
    }

    public async *readHistory(channelName: string, startOffset: number = 0, maxReadChunk: number = _512kb) {
        let finished = false;
        let positionFromEnd = startOffset;

        while (!finished) {
            const { messages, position, done } = await this.getTail(channelName, positionFromEnd, maxReadChunk);
            positionFromEnd = position;
            finished = done;

            yield { messages, position };
        }
    }

    private bufferToMessageArray(buffer: Buffer) {
        const messages = buffer.toString("utf8");
        return messages.split(String.fromCharCode(30))
            .filter(data => data.length > 0)
            .map(m => JSON.parse(m));
    }

    private blobNameFor(channelName: string) {
        return channelName + ".json";
    }
}
