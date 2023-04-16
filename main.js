song = "";
song$ = "";
lwx = 0;
rwx = 0;
lwy = 0;
rwy = 0;

slw = 0;
srw = 0;

function preload() {
    song = loadSound("music.mp3")
    song$ = loadSound("old_phone.mp3")
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 800, 600);
    fill("#c19dff");
    if (slw > 0.2) {
        circle(lwx, lwy, 20);
        song.play();
        song$.stop();
        document.getElementById("songname").innerHTML="Song Name: Music"
    }
    if (srw > 0.2) {
        circle(rwx, rwy, 20);
        song$.play();
        song.stop();
        document.getElementById("songname").innerHTML="Song Name: Alarm"
    }
}

function Stop(){
    song.stop();
    song$.stop();
}

function modelLoaded() {
    console.log("Model complete. Launching in 5, 4, 3, 2, 1, 0. Blast off!!!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        rwx = results[0].pose.rightWrist.x;
        lwy = results[0].pose.leftWrist.y;
        rwy = results[0].pose.rightWrist.y;
        slw = results[0].pose.keypoints[9].score
        srw = results[0].pose.keypoints[10].score
    }
}