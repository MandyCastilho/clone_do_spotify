// Selecionando elementos do DOM
const searchInput = document.getElementById('search');
const playlists = document.getElementById('playlists');
const audioPlayer = document.getElementById('audio-player');
const trackName = document.querySelector('.track-name');
const artistName = document.querySelector('.artist-name');
const playButton = document.querySelector('#player .controls button:nth-child(2)');

// Dados de exemplo para músicas e playlists
const musicLibrary = [
    {
        name: 'Song 1',
        artist: 'Artist 1',
        src: '../musicas/song1.mp3',
        playlist: 'Top Hits Brasil',
    },
    {
        name: 'Song 2',
        artist: 'Artist 2',
        src: '../musicas/song2.mp3',
        playlist: 'Clássicos do Rock',
    },
    {
        name: 'Song 3',
        artist: 'Artist 3',
        src: '../musicas/song3.mp3',
        playlist: 'Pop Internacional',
    },
];

// Função para renderizar as playlists
function renderPlaylists() {
    const uniquePlaylists = [...new Set(musicLibrary.map((music) => music.playlist))];
    playlists.innerHTML = `
        <nav aria-label="Playlists">
            <ul>
                ${uniquePlaylists
                    .map(
                        (playlist) =>
                            `<li><a href="#" data-playlist="${playlist}">${playlist}</a></li>`
                    )
                    .join('')}
            </ul>
        </nav>
    `;
}

// Função para tocar uma música
function playMusic(music) {
    audioPlayer.src = music.src;
    audioPlayer.play();
    trackName.textContent = music.name;
    artistName.textContent = music.artist;
    playButton.textContent = '⏸️'; // Alterar para botão de pausa
}

// Função para pausar a música
function pauseMusic() {
    audioPlayer.pause();
    playButton.textContent = '⏯️'; // Alterar para botão de play
}

// Função para buscar músicas
function searchMusic(query) {
    const results = musicLibrary.filter((music) =>
        music.name.toLowerCase().includes(query.toLowerCase())
    );
    const content = document.getElementById('content');
    if (results.length > 0) {
        content.innerHTML = `
            <h2>Resultados da Pesquisa</h2>
            <ul>
                ${results
                    .map(
                        (music) => `
                        <li>
                            <div class="album">
                                <img src="${music.cover || '../imagens/album-cover.jpg'}" alt="${music.name}">
                                <div class="album-info">
                                    <h3>${music.name}</h3>
                                    <p>${music.artist}</p>
                                    <button data-src="${music.src}" class="play-song">▶️</button>
                                </div>
                            </div>
                        </li>
                    `
                    )
                    .join('')}
            </ul>
        `;
    } else {
        content.innerHTML = '<p>Nenhuma música encontrada.</p>';
    }
}

// Event listeners
playlists.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        const playlist = e.target.dataset.playlist;
        const content = document.getElementById('content');
        const playlistSongs = musicLibrary.filter(
            (music) => music.playlist === playlist
        );
        content.innerHTML = `
            <h2>${playlist}</h2>
            <ul>
                ${playlistSongs
                    .map(
                        (music) => `
                        <li>
                            <div class="album">
                                <img src="${music.cover || '../imagens/album-cover.jpg'}" alt="${music.name}">
                                <div class="album-info">
                                    <h3>${music.name}</h3>
                                    <p>${music.artist}</p>
                                    <button data-src="${music.src}" class="play-song">▶️</button>
                                </div>
                            </div>
                        </li>
                    `
                    )
                    .join('')}
            </ul>
        `;
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('play-song')) {
        const src = e.target.dataset.src;
        const music = musicLibrary.find((m) => m.src === src);
        if (music) {
            playMusic(music);
        }
    }
});

playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = '⏸️';
    } else {
        pauseMusic();
    }
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    searchMusic(query);
});

// Inicializando playlists na barra lateral
renderPlaylists();

// document.getElementById('add-music-btn').addEventListener('click', () => {
//     const name = document.getElementById('music-name').value;
//     const artist = document.getElementById('artist-name').value;
//     const src = document.getElementById('music-src').value;
//     const playlist = document.getElementById('playlist-name').value;

//     if (name && artist && src && playlist) {
//         // Adiciona a nova música à lista
//         musicLibrary.push({ name, artist, src, playlist });

//         // Atualiza as playlists e conteúdo na tela
//         renderPlaylists();
//         alert('Música adicionada com sucesso!');
//     } else {
//         alert('Preencha todos os campos antes de adicionar.');
//     }
// });



