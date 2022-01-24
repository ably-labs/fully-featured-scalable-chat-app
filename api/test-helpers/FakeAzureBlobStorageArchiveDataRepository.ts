import { IArchiveDataRepository } from "../common/dataaccess/IArchiveDataRepository";

export const saveOrUpdateCalls = [];
export const blobStorage = new Map<string, Buffer>();

export function setBlobContents(fileName: string, data: string) {
  var buffer = Buffer.from(data, 'utf8');
  blobStorage.set(fileName, buffer);
}

export function clearStorageBlobs() {
  blobStorage.clear();
}

class FakeAzureBlobStorageArchiveDataRepository implements IArchiveDataRepository {

  append(fileName: string, data: string): Promise<void> {
    const existing = blobStorage.get(fileName) || Buffer.from('');
    const updatedBuffer = Buffer.concat([existing, Buffer.from(data, 'utf8')]);
    blobStorage.set(fileName, updatedBuffer);
    return;
  }

  get(fileName: string, offset: number, count: number): Promise<Buffer> {
    const contents = blobStorage.get(fileName);
    const targetBuffer = Buffer.from(contents.slice(offset, offset + count));
    return Promise.resolve(targetBuffer);
  }

  sizeof(fileName: string): Promise<number> {
    const existing = blobStorage.get(fileName) || Buffer.from('');
    return Promise.resolve(existing.length);
  }

}

const mock = { AzureBlobStorageArchiveDataRepository: FakeAzureBlobStorageArchiveDataRepository };
jest.doMock("../common/dataaccess/AzureBlobStorageArchiveDataRepository", () => mock);
