let mediaRecorder;
let recordedBlod;
const startRecording = () => {
  if (!stream) {
    alert("Vui lòng bật camera trước khi ghi hình.");
    return;
  }
  console.log("Bắt đầu ghi hình...");
  recordedBlod = [];
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (e) => {
    console.log("Dữ liệu ghi hình đã sẵn sàng:");
    recordedBlod.push(e.data);
  };
  mediaRecorder.start();
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "blue",
    "grey",
    "blue",
  ]);
};
const stopRecording = () => {
  if (!mediaRecorder) {
    alert("Bạn chưa bắt đầu ghi hình.");
    return;
  }
  console.log("Dừng ghi hình...");
  mediaRecorder.stop();
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "blue",
    "blue",
  ]);
};
const playRecording = () => {
  console.log("Phát lại video đã ghi...");
  if (!recordedBlod || recordedBlod.length === 0) {
    alert("Bạn chưa ghi hình hoặc không có dữ liệu ghi hình nào.");
    return;
  }
  const superBuffer = new Blob(recordedBlod);
  const recodedVideoEl = document.querySelector("#other-video");
  recodedVideoEl.src = window.URL.createObjectURL(superBuffer);
  recodedVideoEl.controls = true;
  recodedVideoEl.play();
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "green",
    "blue",
  ]);
};
