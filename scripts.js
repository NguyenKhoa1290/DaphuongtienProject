const videoEl = document.querySelector('#my-video'); //Lấy phần tử video từ DOM
let stream = null; //Biến khởi tạo (Dùng kiểu var để dùng được ở mọi nơi trong code)

const constraints = {
        audio: true, 
        video: true 
};

const getMicandCamera = async (e) => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
}catch{
    console.log("Người dùng đã từ chối quyền truy cập vào mic và camera.");
}
};

const showMyFeed = e => {
    console.log("Video của bạn đã được hiển thị.");
    videoEl.srcObject = stream;
    const tracks = stream.getTracks();
    console.log("Các track trong stream của bạn:", tracks);
}

const stopMyFeed = e => {
    const tracks = stream.getTracks();
    tracks.forEach(track=> {
        //console.log(track)
        track.stop();// Dừng tất cả các track trong stream, bao gồm cả video và audio
})
}

document.querySelector('#share').addEventListener('click',e => getMicandCamera(e));
document.querySelector('#show-video').addEventListener('click',e => showMyFeed(e));
document.querySelector('#stop-video').addEventListener('click',e => stopMyFeed(e));
