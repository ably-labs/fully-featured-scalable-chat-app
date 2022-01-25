import ArchiveMessage from "./ArchiveMessage";
import AddUrlPreviews from "./AddUrlPreviews";
import { AblyReactorMessage } from "../types";

export type ProcessingTask = (channel: string, message: AblyReactorMessage) => Promise<void>;

export const Tasks: ProcessingTask[] = [
    ArchiveMessage,
    AddUrlPreviews,
]