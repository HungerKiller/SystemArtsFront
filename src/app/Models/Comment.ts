export class Comment {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, content: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
