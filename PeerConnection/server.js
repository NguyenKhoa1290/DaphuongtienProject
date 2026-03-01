const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const { off } = require("cluster");
app.use(express.static(__dirname));
const key = fs.readFileSync("create-ca.key");
const cert = fs.readFileSync("create-ca.crt");
//Doi de may chu ho tro https
const expressServer = https.createServer({ key, cert }, app);
const io = socketio(expressServer);
expressServer.listen(5069);
const offers = [
  //offererUserName
  //offer
  //offerIceCandidates
  //answer
  //answerIceCandidates
]; // luu tru cac offer da nhan duoc tu may goi
const connectedSockets = [
    //socketId
    //userName
]; // luu tru cac socket da ket noi den server, moi socket se co id va userName de xac dinh nguoi dung
io.on("connection", (socket) => {
  const userName = socket.handshake.auth.userName;
  const password = socket.handshake.auth.password;
  if (password !== "123456") {
    socket.disconnect(true);
    return;
  }
  connectedSockets.push({
    socketId: socket.id,
    userName,
  });
  // mot may khach moi truy cap vao server se tao mot socket moi de thuc hien ket noi va trao doi du lieu voi server. Khi co mot socket moi ket noi, su kien "connection" se duoc kich hoat tren doi tuong io, va ham callback se duoc goi voi doi tuong socket moi tao. Trong ham callback, chung ta co the thuc hien cac thao tac de xac dinh nguoi dung, luu tru thong tin ve socket, va thiet lap cac su kien de nhan du lieu tu socket.
  if(offers.length){
    socket.emit("danh sach offer", offers);
  }
  socket.on("offer moi", (newOffer) => {
    offers.push({
      offererUserName: userName,
      offer: newOffer,
      offerIceCandidates: [],
      answerUserName: null,
      answer: null,
      answererIceCandidates: [],
    });
    // gui den tat caa socket tru may gui
    socket.broadcast.emit("co offer moi", offers.slice(-1));
  });
  socket.on("Gui IceCandidateToSignalServer", iceCandidateObj  => {
    const { didIOffer, iceUserName, iceCandidate } = iceCandidateObj;
    //console.log(iceCandidate);
    if(didIOffer){
        const offerInOffers = offers.find(offer => offer.offererUserName === iceUserName);
        if(offerInOffers){
            offerInOffers.offerIceCandidates.push(iceCandidate);
        }
    }
    console.log(offers);
  });
});
