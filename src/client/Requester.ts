import { Request as ZmqRequest } from "zeromq";
import Socket from "./Socket";

class Requester implements Socket {
    socket: ZmqRequest;

    constructor(private protocol: string, private ip: string, private port: number) {
        this.socket = new ZmqRequest();
        this.socket.connect(`${protocol}://${ip}:${port}`);
        console.log(`Requester connected to ${protocol}://${ip}:${port}`);
    }

    disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log("Disconnecting REQ_SOCKET");
            this.socket.send("REMOVE CONNECTION");
            this.socket.receive().then((ret) => {
                const retString = ret.toString();
                if (retString === "OK") {
                    this.socket.disconnect(`${this.protocol}://${this.ip}:${this.port}`);
                    console.log("REQ_SOCKET disconnected successfully");
                    resolve();
                } else {
                    reject();
                }
            }).catch(() => reject());
        });
    }
}

export default Requester;
