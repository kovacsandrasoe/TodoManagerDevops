export class Todo {
    id: string = '';
    text: string = '';
    createdAt: Date = new Date();

    copyFrom(t: ITodo){
        this.id = t.id;
        this.text = t.text;
        this.createdAt = new Date(t.createdAt);
    }
}

export interface ITodo{
    id: string;
    text: string;
    createdAt: string;
}
