const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
const showLyrics = document.getElementById('show');
const showLyricsText = document.getElementById('showLyric');

const findLyricText = async (artist, song) => {

    let url = `https://api.lyrics.ovh/v1/${artist}/${song}`
    try {
        let fetchLyricsText = await fetch(url);
        let lyricsText = await fetchLyricsText.json();
        //insert br
        let text = lyricsText.lyrics.replace(/,/g, '<br>');
        //show text
        showLyricsText.innerHTML = `
                                <div class="single-lyrics text-center">               
                                    <h2 class="text-success mb-4">${song} - ${text.substring(0, 15)} </h2>
                                    <pre class="lyric text-white">
                                    ${text}
                                    </pre>
                                </div>`
    }
    catch (error) {
        if (error) {
            alert('Sorry! The lyrics to this song were not found. Please Try another song');
        }
    }
}

const findLyrics = async (inputValue) => {
    let url = `https://api.lyrics.ovh/suggest/${inputValue}`

    let fetchLyrics = await fetch(url);
    let lyricsRes = await fetchLyrics.json();
    let totalData = lyricsRes.data;
    let sliceData = totalData.slice(0, 10);
    showResults(sliceData);
};

const showResults = (results) => {
    showLyrics.innerHTML = '';
    console.log(results);
    results.forEach(res => {
        let card = document.createElement('div');
        card.classList.add('search-result');
        card.classList.add('col-md-8');
        card.classList.add('mx-auto');
        card.classList.add('py-4');
        card.innerHTML = `
                        <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-6">
                            <h3 class="lyrics-name">${res.title}</h3>
                            <p class="author lead">Album by <span>${res.artist.name}</span></p>  
                        </div>
                        <div class="col-md-3">
                            <img src="${res.artist.picture_small}" alt="Artist-Picture">
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="findLyricText('${res.artist.name}','${res.title}')" class="btn btn-success">Get Lyrics</button>
                        </div>
                        </div>`
        showLyrics.appendChild(card);
    });
}

searchButton.addEventListener('click', function () {
    let inputValue = searchBox.value;
    findLyrics(inputValue);
})

