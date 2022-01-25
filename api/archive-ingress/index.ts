import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { ok } from "../common/http/CommonResults";
import { ArchiveService } from "../common/services/ArchiveService";

export default async function (context: Context, req: HttpRequest): Promise<void> {

  // Validate that this archive request comes from reactor / a trusted firehose here.

  const archive = new ArchiveService();
  archive.append(req.body.channel, req.body);

  context.res = ok("received");
}
