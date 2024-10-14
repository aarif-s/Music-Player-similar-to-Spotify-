console.log("hello");
let currentsong = new Audio() ;
let songs;
 
function formatTime(seconds) {

  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
   
  const minutes = Math.floor(seconds / 60); // Calculate minutes
  const remainingSeconds = Math.floor(seconds % 60); // Calculate remaining seconds

  // Ensure that seconds are always two digits (e.g., "03" instead of "3")
  const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  return `${minutes}:${formattedSeconds}`;
}

// Example usage:
console.log(formatTime(14.2334353)); // Output: "23:43"



async function getsongs() {

  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  

  let as = div.getElementsByTagName("a");
   
  let songs = []; 
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
      // console.log(element.href)
    } 
  }
  return songs;
} 


const playMusic = (track ,pause=false)=>{
  currentsong.src = "/songs/"+ track
     if(!pause){
        currentsong.play();
        play.src="/images/pause.svg"
     }
      
        document.querySelector(".songtime").innerHTML= "00:00 / 00:00"
        document.querySelector(".songinfo").innerHTML= decodeURI(track);
        
}



async function main() {

  //get the list of all songs
    songs = await getsongs();
  playMusic(songs[0],true)


  // show all the song in the play list
 let  songUl  =document.querySelector(".songlist").getElementsByTagName("ul")[0];
  for ( song of songs) {
    songUl.innerHTML= songUl.innerHTML + ` <li>  
                        <img src="/images/music.svg" alt="">
                        <div class="info">
                            <div class="songname">${song.replaceAll("%20"," ")}</div>
                            <div class="artist">Arif</div>
                        </div>
                        <div class="playnow" id="playnow">
                            <div class="playnowtext">Play now</div>
                            <img   src="/images/play.svg" alt="">
                        </div> 
                     </li> ` ;
  }

   // Attach an event listener to each song 
  Array.from( document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    // console.log(e)
       e.addEventListener("click", element=>{
        document.querySelector(".songinfo").innerHTML=` ${e.querySelector(".info").firstElementChild.innerHTML.trim()} `;
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim() )
        console.log(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  })
 
   //  Add an addEventListener to play , next and previous 
   
   play.addEventListener("click",()=>{
      if(currentsong.paused){
        currentsong.play()
       play.src="/images/pause.svg"
      }
      else{
        currentsong.pause() 
        play.src="/images/play.svg"
      } 
   })
    

   // listen to time update event 
   currentsong.addEventListener("timeupdate",()=>{
    // console.log(currentsong.currentTime, currentsong.duration);
    document.querySelector(".songtime").innerHTML= `${formatTime(currentsong.currentTime)} : ${formatTime(currentsong.duration)}`
    document.querySelector(".circle").style.left =currentsong.currentTime/ currentsong.duration*100 +"%";
    console.log(currentsong.currentTime/ currentsong.duration*100 +"%")
   })  
   

  //  Add event Listener to seek bar
   document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=  (e.offsetX /e.target.getBoundingClientRect().width )*100  ;
    document.querySelector(".circle").style.left = (e.offsetX /e.target.getBoundingClientRect().width )*100 +"%";
    currentsong.currentTime= ((currentsong.duration)*percent)/100;
   })

   //Add event listener to hamburger
   document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left = 0+"%";
   })
    
   // Add envent listener to cross 
   document.querySelector(".cross").addEventListener("click",()=>{
     document.querySelector(".left").style.left = -112+"%";
   })
   
   //Add event listener for previous button 
   previous.addEventListener("click",()=>{
    console.log("previous clicked");
    let index = songs.indexOf(currentsong.src.split("/songs/")[1])
    console.log(currentsong.src.split("/songs/")[1])
    console.log(songs,index,songs[index+3])
     if((index-1) >= 0 ){
      if(!currentsong.paused){
        playMusic(songs[index-1])
      } 
     }
     else{
      index = songs.length-1;
      playMusic(songs[index])
     }
   }) 


   //Add event listener for next button 
    
    next.addEventListener("click",()=>{
      console.log("next clicked");
      let index = songs.indexOf(currentsong.src.split("/songs/")[1])
      console.log(currentsong.src.split("/songs/")[1])
       if((index+1) < songs.length ){
        if(!currentsong.paused){
          playMusic(songs[index+1])
        } 
       }else{
        index = 0;
        playMusic(songs[index])
       }
     })
   
    consol


} 

main();
