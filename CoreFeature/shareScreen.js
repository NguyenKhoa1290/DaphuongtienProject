const shareScreen = async()=>{
  const options = {
    video:true,
    audio:true,
    suefaceSwitch: 'include', //include/exclude không giống true/fa;se
  }
  try{
  mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
  }
  catch(err){
    console.log(err);
  }
    changeButtons([
      "green",
      "green",
      "blue",
      "blue",
      "green",
      "green",
      "green",
      "green",
    ])
};