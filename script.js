// 子音（14個）
const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
// 母音（10個基本母音 + 11個複合母音）
const vowels = ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", 
                "ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"];

const phonemeElement = document.getElementById("phoneme");
const playAudioButton = document.getElementById("play-audio");
const nextConsonantButton = document.getElementById("next-consonant");
const nextVowelButton = document.getElementById("next-vowel");
const clearCanvasButton = document.getElementById("clear-canvas");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 設定 Canvas 尺寸
canvas.width = 300;
canvas.height = 200;
ctx.lineWidth = 5;
ctx.lineCap = "round";

// 變數來儲存手寫狀態
let isDrawing = false;

// 隨機選擇一個子音
function getRandomConsonant() {
    return consonants[Math.floor(Math.random() * consonants.length)];
}

// 隨機選擇一個母音
function getRandomVowel() {
    return vowels[Math.floor(Math.random() * vowels.length)];
}

// 更新畫面上的韓文字母
function updatePhoneme(type) {
    phonemeElement.textContent = type === "consonant" ? getRandomConsonant() : getRandomVowel();
}

// 頁面載入時，先顯示一個隨機子音
updatePhoneme("consonant");

function logToPage(message) {
    const logElement = document.getElementById('console-log');
    logElement.innerHTML += message + '<br>';
}
// 播放發音（Web Speech API）
playAudioButton.addEventListener("click", () => {
    const phoneme = phonemeElement.textContent;
    const utterance = new SpeechSynthesisUtterance(phoneme);
    utterance.lang = "ko-KR";
    
    utterance.onend = () => {
        logToPage("語音播放完成！");
    };
    utterance.onerror = (event) => {
        logToPage("語音合成錯誤:" + event.error);
    };
    speechSynthesis.speak(utterance);
    const voices = speechSynthesis.getVoices();
    logToPage(voices);
});


// 監聽按鈕點擊，切換子音或母音
nextConsonantButton.addEventListener("click", () => updatePhoneme("consonant"));
nextVowelButton.addEventListener("click", () => updatePhoneme("vowel"));

// 手寫功能，監聽觸控事件
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", draw);

// 觸控事件函式
function startDrawing(event) {
    event.preventDefault(); // 防止滾動頁面
    isDrawing = true;
    const touch = event.touches[0]; // 取得觸控點
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(event) {
    if (!isDrawing) return;
    event.preventDefault(); // 防止滾動頁面
    const touch = event.touches[0]; // 取得觸控點
    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
}

// 清除 Canvas
clearCanvasButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
