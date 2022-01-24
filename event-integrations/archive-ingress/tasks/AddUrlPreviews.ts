import fetch from "node-fetch";
import cheerio from "cheerio";
import * as Ably from "ably/promises";

export type Preview = { title: string, url: string, body: string };
export type PreviewMessage = { name: string, data: Preview };

export default async function (channelName: string, message: any): Promise<void> {
    const firstUrlInText = extractUrl(message?.data?.text || "");
    if (message.name !== "message" || !firstUrlInText) {
        return;
    }

    const preview = await getPreview(firstUrlInText);
    const { name, data } = { name: "UrlPreview", data: preview };

    var rest = new Ably.Rest(process.env.ABLY_API_KEY);
    var channel = rest.channels.get(channelName);
    channel.publish(name, { extends: message.id, ...data });
};

function extractUrl(inputText) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = inputText.match(urlRegex);
    return matches[0] || null;
}

async function getPreview(url: string): Promise<Preview> {
    const result = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
        },
        timeout: 5000
    });

    const body = await result.text();

    const dom = cheerio.load(body);
    const title = dom("title").text();
    const bodyContent = dom("body").text();
    const trimmedBody = bodyContent.substring(0, 200).trim() + "...";

    return { title, url, body: trimmedBody };
}