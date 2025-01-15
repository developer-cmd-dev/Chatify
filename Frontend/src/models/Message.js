class Message {

    constructor(user,message,timestamp = new Date()){
        this.message = message
        this.user = user
        this.timestamp = timestamp
    }
    formatForDisplay() {
        return `[${this.timestamp.toLocaleTimeString()}] ${this.user}: ${this.text}`;
      }
}

export default Message