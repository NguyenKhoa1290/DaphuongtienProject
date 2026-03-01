socket.on('cac offer da co', offers=>{
    console.log('Danh sach offer da co: ');
    console.log(offers);
})
// Đúng tên sự kiện từ server
socket.on('danh sach offer', offers => {
    createOfferEls(offers);
});
function createOfferEls(offers){
    const answerEl = document.querySelector('#answer');
    offers.forEach(o=>{
        console.log(o);
        const newOfferEl = document.createElement('div');
        newOfferEl.innerHTML = `<button class="btn btn-success col-1">Answer ${o.offererUserName}</button>`;
        newOfferEl.addEventListener('click',()=>answerOffer(o))
        answerEl.appendChild(newOfferEl);
    })
}