const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search");

btn.addEventListener("click", () => {
    let inputtxt =  document.getElementById("inputtxt").value;
    fetch(`${url}${inputtxt}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
                <h3>${inputtxt}</h3>
                <button onclick = "playsound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="dets">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class = "example">${data[0].meanings[0].definitions[0].example || ""}</p>
            <p class = "syn">Synonyms: ${data[0].meanings[0].synonyms}</p>
            </div>`;
            const audioSrc = data[0].phonetics[1].audio;
            if(audioSrc){
            sound.setAttribute("src", audioSrc.startsWith("http") ? audioSrc : `https:${audioSrc}`);
            }
        
        })
        .catch(() => {
            result.innerHTML = `<h3 class= "error">Sorry, coudlnt find the word!</h3>`
        });
});

function playsound(){
    if (sound.getAttribute("src")) {
    sound.play();
} else {
    alert("No audio source set.");
}
}