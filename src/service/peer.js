class PeerSerbice {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478",
                        ]
                    }
                ]
            }
            )
            
        }
    }
    async getoffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer()
            const localdescription=new RTCSessionDescription(offer)
            console.log(offer)
            console.log(localdescription)
            await this.peer.setLocalDescription(localdescription)
            return offer
        }
    }

    async getAnswer(offer){
        if(this.peer){
            await this.peer.setRemoteDescription(offer)
            const ans=await this.peer.createAnswer()
            await this.peer.setLocalDescription(new RTCSessionDescription(ans))
            return ans
        }
    }

    async setLocalDescription(ans){
        console.log(ans)
       if(this.peer)
       {
          const remotedescription=new RTCSessionDescription(ans)
          console.log(remotedescription)
          await this.peer.setRemoteDescription(remotedescription)
       }
    }
}

export default (new PeerSerbice())