const arr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
let nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let completed = [];
let active = [];
let selectedSecond = -1;
let selectedFirst = -1;
let started = false;

let bestMoves = 9999;
let currentMoves = 0;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

$(".pick-me").click(function () {
    console.log($(this).attr("id"));
    if (!started) {
        shuffleArray(nums);
        started = true;
    }
    const id = $(this).attr("id");
    const index = arr.indexOf(id) - 1;
    if (!completed.includes(index) && !active.includes(index)) {

        active.push(index);
        $(this).attr("src", "/images/" + nums[index] + ".png");
        setTimeout(function () {
            console.log("hello");
        }, 1000);
        if (active.length == 1) selectedFirst = index;
        else selectedSecond = index;
        if (selectedSecond >= 0) {
            setTimeout(function () {
                if (nums[selectedSecond] == nums[selectedFirst]) {
                    $("#" + arr[selectedSecond + 1]).attr("src", "/images/done.jpg");
                    $("#" + arr[selectedFirst + 1]).attr("src", "/images/done.jpg");
                    completed.push(selectedSecond);
                    completed.push(selectedFirst);
                    playSong("correct");
                } else {
                    $("#" + arr[selectedSecond + 1]).attr("src", "/images/pick-me.jpg");
                    $("#" + arr[selectedFirst + 1]).attr("src", "/images/pick-me.jpg");
                    playSong("wrong");
                }
                active = [];
                selectedFirst = -1;
                selectedSecond = -1;
            }, 500);
            currentMoves++;
            $(".current-moves").text("Current Moves: " + currentMoves);
        }
    }
});

$(".restart").click(function () {
    if (completed.length == 12) {
        bestMoves = Math.min(bestMoves, currentMoves);
    }
    completed = [];
    active = [];
    selectedSecond = -1;
    selectedFirst = -1;
    started = false;
    currentMoves = 0;
    $(".current-moves").text("Current Moves: " + currentMoves);
    if(bestMoves!=9999) $(".best-moves").text("Current Moves: " + bestMoves);
    for(let i=1;i<13;i++){
        $("#"+arr[i]).attr("src","/images/pick-me.jpg");
    }
});

function playSong(audio) {
    const song = new Audio("/music/" + audio + ".mp3");
    song.play();
}
