prediction_1 = "";
prediction_2 = "";
Webcam.set({
    height:300,
    width:350,
    image_format: 'jpeg',
    jpeg_quality:100
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version: ", ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8u-BkaN1s/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model has Loaded!");
}


function check(){
    img= document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result-hand-gesture1").innerHTML = results[0].label;
        document.getElementById("result-hand-gesture2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Victory"){
            document.getElementById("update-gesture1").innerHTML = "&#9996;"
        }

        if(results[0].label == "Call me"){
            document.getElementById("update-gesture1").innerHTML = "&#129305;"
        }

        if(results[0].label == "Heart"){
            document.getElementById("update-gesture1").innerHTML = "&#129310;"
        }

        if(results[0].label == "Awesome!"){
            document.getElementById("update-gesture1").innerHTML = "&#128076;"
        }


        if(results[1].label == "Victory"){
            document.getElementById("update-gesture2").innerHTML = "&#9996;"
        }

        if(results[1].label == "Call me"){
            document.getElementById("update-gesture2").innerHTML = "&#129305;"
        }

        if(results[1].label == "Heart"){
            document.getElementById("update-gesture2").innerHTML = "&#129310;"
        }

        if(results[1].label == "Awesome!"){
            document.getElementById("update-gesture2").innerHTML = "&#128076;"
        }
    }

}

function speak(){
    var synth = window.speechSynthesis;
    speakdata_1 = "The first prediction is " + prediction_1;
    speakdata_2 = "And the second prediction is " + prediction_2;
    var UtterThis = new SpeechSynthesisUtterance (speakdata_1 + speakdata_2);
    synth.speak(UtterThis);
}
