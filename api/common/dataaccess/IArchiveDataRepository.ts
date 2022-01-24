export interface IArchiveDataRepository {
    append(fileName: string, data: string): Promise<void>;
    get(fileName: string, offset: number, count: number): Promise<Buffer>;
    sizeof(fileName: string): Promise<number>;
}