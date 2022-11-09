declare module 'xpath-html' {
    export function fromPageSource(html: string): XPathParsed;
}

declare class XPathParsed {
    findElements(xpath: string): XPathNode[];
    findElement(xpath: string): XPathNode;
}

declare class XPathNode {
    getTagName(): string;
    getText(): string;
}
