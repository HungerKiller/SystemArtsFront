export class Announcement {
    id: number;
    title: string;
    content: string;
    isDisplay: boolean;

    constructor(id: number, title: string, content: string, isDisplay: boolean) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.isDisplay = isDisplay;
    }
}
