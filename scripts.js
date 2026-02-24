const videoEl = document.querySelector("#my-video"); //Lấy phần tử video từ DOM
let stream = null; //Biến khởi tạo (Dùng kiểu var để dùng được ở mọi nơi trong code)

const constraints = {
  audio: true,
  video: true,
};



const getMicandCamera = async (e) => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);
    changeButtons([
      "green",
      "blue",
      "blue",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ]);
  } catch {
    console.log("Người dùng đã từ chối quyền truy cập vào mic và camera.");
  }
};

const showMyFeed = (e) => {
  console.log("Video của bạn đã được hiển thị.");
  if (!stream) {
    alert("Đang tải videocall....");
    return;
  }
  videoEl.srcObject = stream;
  const tracks = stream.getTracks();
  console.log("Các track trong stream của bạn:", tracks);
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "blue",
    "grey",
    "grey",
    "blue",
  ]);
};

const stopMyFeed = (e) => {
  if (!stream) {
    alert("Đang tải videocall....");
    return;
  }
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    //console.log(track)
    track.stop(); // Dừng tất cả các track trong stream, bao gồm cả video và audio
  });
  changeButtons([
    "blue",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
  ]);
};

document
  .querySelector("#share")
  .addEventListener("click", (e) => getMicandCamera(e));
document
  .querySelector("#show-video")
  .addEventListener("click", (e) => showMyFeed(e));
document
  .querySelector("#stop-video")
  .addEventListener("click", (e) => stopMyFeed(e));
document
  .querySelector("#change-size")
  .addEventListener("click", (e) => changeVideoSize(e));
document
  .querySelector("#start-record")
  .addEventListener("click", (e) => startRecording(e));
document
  .querySelector("#stop-record")
  .addEventListener("click", (e) => stopRecording(e));
document
  .querySelector("#play-record")
  .addEventListener("click", (e) => playRecording(e));
document
  .querySelector("#share-screen")
  .addEventListener("click", (e) => shareScreen(e));