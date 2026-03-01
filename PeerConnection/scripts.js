const userName = "Nhon" + Math.floor(Math.random() * 100000);
const password = "123456";
document.querySelector('#user-name').innerHTML = userName;
const socket = io.connect('https://localhost:5069/',{
    auth:{
        userName,
        password
    }
});

const localVideoEl = document.querySelector('#local-video');
const remoteVideoEl= document.querySelector('#remote-video');
let localStream;// luu tru stream cua nguoi goi
let remoteStream;// luu tru stream cua nguoi nhan
let peerConnection;// luu tru ket noi peer-to-peer
let didIOffer = false;// bien kiem tra xem da tao offer chua, neu da tao thi khi nhan offer tu may khac thi se tu dong tao answer de thiet lap ket noi peer-to-peer

let peerConfiguration = {
    iceServers:[
        {
            urls:[
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302'
            ]
        }
    ]
}

//Tinh nang khoi tao cuoc goi
const call = async e =>{
    const stream = await navigator.mediaDevices.getUserMedia({
        video:true, 
        //audio:true
    });
    localVideoEl.srcObject = stream;
    localStream = stream;
    // Khi nguoi goi khoi tao cuoc goi, chung ta can tao mot doi tuong RTCPeerConnection de thuc hien ket noi peer-to-peer. Do do, chung ta se goi ham createPeerConnection de tao doi tuong nay va luu tru no trong bien peerConnection.
    await createPeerConnection();
    // Tao offer timep thuc hien qua trinh thiet lap ket noi peer-to-peer. Offer la mot loai thong diep SDP (Session Description Protocol) chua thong tin ve cau hinh va kha nang cua nguoi goi, nhu la cac codec ho tro, do phan giai video, va cac thong tin khac can thiet de thiet lap ket noi. Khi tao offer, chung ta se goi ham createOffer tren doi tuong RTCPeerConnection, ham nay se tra ve mot offer SDP ma chung ta co the gui den nguoi nhan de thiet lap ket noi.
    try{ 
        console.log('Creating offer...');
        const offer = await peerConnection.createOffer();
        console.log('Offer created: ');
        console.log(offer);
        peerConnection.setLocalDescription(offer);
        didIOffer = true;
        socket.emit('offer moi', offer);// gui offer den may nhan qua socket.io
    }
    catch(err){
        console.error('Error creating offer: ', err);
    }
}

const answerOffer = (offerObj)=>{
    console.log(offerObj);
}

const createPeerConnection = async () =>{
    return new Promise((resolve, reject) =>{
    //RTCPEERCONNECTION la doi tuong chinh de thuc hien ket noi peer-to-peer
    // Khi tao doi tuong nay, chung ta truyen vao cau hinh cua no, trong do co thong tin ve cac may chu STUN va TURN de ho tro qua trinh thiet lap ket noi
    // Trong do, iceServers la mot mang chua cac may chu STUN va TURN. STUN (Session Traversal Utilities for NAT) giup cac thiet bi xac dinh dia chi IP cong va port ma no co the su dung de ket noi voi thiet bi khac qua Internet. TURN (Traversal Using Relays around NAT) duoc su dung khi STUN khong hoat dong, no cho phep truyen du lieu qua mot may chu trung gian.
    peerConnection = new RTCPeerConnection(peerConfiguration);
    localStream.getTracks().forEach(track =>{
        peerConnection.addTrack(track, localStream);
    }) 
    peerConnection.addEventListener('icecandidate', e =>{
        console.log('New ICE candidate: ');
        console.log(e);
        if(e.candidate){
            socket.emit('Gui IceCandidateToSignalServer', {
                iceCandidate: e.candidate,
                iceUserName: userName,
                didIOffer,
            });
        }
    })
    resolve(); 
})
}

document.querySelector('#call').addEventListener('click', call);

