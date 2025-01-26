document.addEventListener('DOMContentLoaded', () => {
    const playlistsDiv = document.getElementById('playlists');
    const audioPlayer = document.getElementById('audio-player');

    fetch('http://localhost:3000/api/songs')
        .then(response => response.json())
        .then(data => {
            data.forEach(song => {
                const songDiv = document.createElement('div');
                songDiv.textContent = `${song.title} by ${song.artist}`;
                songDiv.addEventListener('click', () => {
                    audioPlayer.src = song.url;
                    audioPlayer.play();
                });
                playlistsDiv.appendChild(songDiv);
            });
        });
});
