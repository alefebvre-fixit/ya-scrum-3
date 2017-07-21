export class Conversation {
    id: number;
    messages: Array<Message>;
}

export class Message {    
    message: string;
    username: string;
}