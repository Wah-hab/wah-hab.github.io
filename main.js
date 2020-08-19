// Random Quran Verse by Abdulwahab Humayun

/**
 * Definitions of terms used: 
 * Quran - the Islamic religious book of Islam
 * Surah - chapters of the Quran
 * Ayah - a verse of a Quran
 */

// the total number of surahs in the Quran
const TOTAL_SURAHS = 114;

// declares the number of ayahs based on the chosen surah
let totalAyahs;

// declares the randomly chosen surah 
let surahNumber;

// declares the randomly chosen ayah
let ayahNumber;

// declares the Arabic ayah from the surah
let ayah;

// declares the translated ayah from Arabic
let translatedAyah;

// the Quran API link
const SURAH_URL = 'https://api.alquran.cloud/v1/surah/';

// declares the API call for the translation
let newSurahURL;

// the part of the link for the English translation
let eng = 'en.sahih';

// gets a random ayah on startup 
getRandomAyah();

// gets a random ayah from the Quran API and displays it
async function randomAyah() {
    showLoader();

    surahNumber = Math.floor(Math.random() * (TOTAL_SURAHS - 1)) + 1;
    newSurahURL = SURAH_URL + surahNumber;

    const response = await fetch(newSurahURL);
    const chapterJSON = await response.json();

    totalAyahs = chapterJSON.data.numberOfAyahs;
    
    ayahNumber = Math.floor(Math.random() * totalAyahs);
   
    ayah = chapterJSON.data.ayahs[ayahNumber].text;

    translateAyah();

    return Promise.resolve('Getting the ayah works!');
}

// translates the random ayah
async function translateAyah() {
    newSurahURL += '/' + eng;

    const response = await fetch(newSurahURL);
    const chapterJSON2 = await response.json();
    
    translatedAyah = chapterJSON2.data.ayahs[ayahNumber].text;

    printToHTML();

    return Promise.resolve('Getting the translation works!');
}

// prints the random ayah and translation to the HTML file
function printToHTML() {
    // hides the loader and displays the text
    document.getElementById('loadingCircle').style.display = 'none';
    document.getElementById('verse').style.display = 'block';
    document.getElementById('translation').style.display = 'block';

    document.getElementById('verse').innerHTML = ayah;
    document.getElementById('translation').innerHTML = (surahNumber + ':' + (ayahNumber + 1)).bold();
    document.getElementById('translation').innerHTML += ' ' + translatedAyah;
}

// shows a loader while the JSON loads
function showLoader() {
    document.getElementById('loadingCircle').style.display = 'block';
    document.getElementById('verse').style.display = 'none';
    document.getElementById('translation').style.display = 'none';
}

// gets a random ayah
async function getRandomAyah() {
    randomAyah()
}
