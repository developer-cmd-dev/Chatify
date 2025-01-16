class Message {
    constructor(user,message,type,timestamp = new Date()){
        this.message = message
        this.user = user
        this.timestamp = timestamp
        this.time = timestamp.toLocaleTimeString();
        this.type = type
    }
    formatForDisplay() {
        return `[${this.timestamp.toLocaleTimeString()}] ${this.user}: ${this.text}`;
      }
}

export default Message