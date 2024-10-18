const playListSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const previousButton = document.getElementById('previous');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const playSongText = document.getElementById('player-song-title')
const playArtistText = document.getElementById('player-song-artist')

const playImgW = document.getElementById('play-white')
const playImgY = document.getElementById('play-yellow')
const pauseImgW = document.getElementById('pause-white')
const pauseImgY = document.getElementById('pause-yellow')

const allSongs=[
    {
        
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
        
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
        
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
        
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
        
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
        
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
        
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
        
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
        
    },
    {
        
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
        
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
];


const audio = new Audio();
let userData ={
    songs:[...allSongs],
    currentSong : null,
    currentSongTime:0,
}
const renderSong=(array)=>{
    
    const songHTML = array.map((song)=>{
        return `
        <li id="song-${song.id}" class="playlist-songs">
        <button class="playlist-song-info " onclick="playSongs(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" id='del-${song.id}'  onclick="remove(${song.id})">
            <img src="/imgs/close-tab-svgrepo-com.svg" alt="song cover art"/>
        </button>
        </li>`
    }).join('')
    playListSongs.innerHTML=songHTML;
    
}




const playSongs= (id)=>{
    song=userData?.songs.find((song)=>song.id===id)
    audio.src=song.src;
    audio.title=song.title;
    if (userData?.currentSong ===null || userData?.currentSong.id!==song.id){
        audio.currentTime=0;
    }else{
        audio.currentTime=userData?.currentSongTime;
    }
    userData.currentSong = song;
    const playListEl = document.querySelectorAll('.playlist-songs')
    
    const songsElements=[]
    playListEl.forEach((el)=>{
        el.classList.remove('active')
        songsElements.push(el);
    })
    songsElements[userData.currentSong.id].classList.add('active')
    playArtistText.innerText=userData?.currentSong.artist;
    playSongText.innerText=userData?.currentSong.title;
    audio.play()
    playImgW.style.display = 'none'
    playImgY.style.display = 'block'
    pauseImgW.style.display = 'block'
    pauseImgY.style.display = 'none'
}
const pauseSong=()=>{
    userData.currentSongTime=audio.currentTime;
    audio.pause();
    playImgW.style.display = 'block'
    playImgY.style.display = 'none'
    pauseImgW.style.display = 'none'
    pauseImgY.style.display = 'block'
}


playButton.addEventListener('click',()=>{
    if (userData?.currentSong===null){
        playSongs(userData?.songs[0].id);
    }else{
        playSongs(userData?.currentSong.id);
    }
});
pauseButton.addEventListener('click',pauseSong);


const highlightCurrentSong=(nap)=>{
    const playListElements = document.querySelectorAll('.playlist-songs');
    const currentSongOnList = document.getElementById(`song-${userData?.currentSong?.id}`);
    const playListArray=[]
    playListElements.forEach((songEl)=>{
        playListArray.push(songEl);
    })

    const currentSongIndex = playListArray.indexOf(currentSongOnList)
    console.log(currentSongIndex)
    if (nap==='n'){
        if(currentSongOnList === null){
            
            playSongs(userData?.songs[playListArray[0].id.split('-')[1]].id);
        }else if (currentSongIndex!=playListArray.length-1){
            
            playSongs(userData?.songs[playListArray[currentSongIndex+1].id.split('-')[1]].id)
        }
    }
    if (nap==='p'){
        if(currentSongOnList === null){
            
            playSongs(userData?.songs[playListArray[playListArray.length-1 ].id.split('-')[1]].id);
        }else if (currentSongIndex!=0){
   
            playSongs(userData?.songs[playListArray[currentSongIndex-1].id.split('-')[1]].id)
        }
    }
}


const nextSong=()=>{
    highlightCurrentSong('n')
}

const previousSong=()=>{
    highlightCurrentSong('p')
}

const sortSong=()=>{
    userData?.songs.sort((a,b)=>{
        if(a.title<b.title){
            return -1
        }
        if(a.title>b.title){
            return 1
        }
        return 0
    });
    for(let i=0; i<userData?.songs.length;i++){
        userData.songs[i].id =i;
    }
    return userData?.songs;
};

function shuffle() {
    userData?.songs.sort(() => Math.random() - 0.5);
    for(let i=0; i<userData?.songs.length;i++){
        userData.songs[i].id =i;
    }
    renderSong(userData?.songs)
    pauseSong()
    const playListEl = document.querySelectorAll('.playlist-songs')
    const songsElements=[]
    playListEl.forEach((el)=>{
        el.classList.remove('active')
        songsElements.push(el);
    })
    
    songsElements[userData.currentSong.id].classList.add('active')
}

const remove=(songId)=>{
    const song = document.getElementById(`song-${songId}`)
    song.classList.add('del')
    song.classList.remove('playlist-songs')
    userData?.songs.splice(songId,1)
    for(let i=0; i<userData?.songs.length;i++){
        userData.songs[i].id =i;
    }
    (userData?.songs);
    renderSong(userData?.songs)
    userData.currentSong=null;
    userData.currentSongTime=0;
    audio.pause()
    playArtistText.innerText=' ';
    playSongText.innerText=' ';
    playImgW.style.display='block';
    playImgY.style.display='none';
}



renderSong(sortSong());
nextButton.addEventListener('click',nextSong)
previousButton.addEventListener('click',previousSong)
shuffleButton.addEventListener('click',shuffle)



