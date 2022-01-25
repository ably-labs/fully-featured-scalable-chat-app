import UrlPreview from "./UrlPreview";
import SwearFilter from "./SwearFilter";

const renderingFilters = [
    SwearFilter
];

const renderingPlugins = {
    "UrlPreview": UrlPreview,
};

export default function processMessageExtensions(renderingItem, messageHistory) {
    renderingFilters.forEach(filter => filter(renderingItem));

    const extendedContent = messageHistory.filter(other => other?.data.extends === renderingItem.id);
    const extendedContentElements = extendedContent.map((message) => {
        const plugin = renderingPlugins[message.name];
        return plugin({ message, renderingItem });
    });

    return extendedContentElements.filter(element => element !== null);
}