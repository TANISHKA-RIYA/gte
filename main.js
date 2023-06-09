//https://teachablemachine.withgoogle.com/models/BSk6vToy7/

prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("camera");

function takesnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='capturedimg' src='"+data_uri+"'>";
    });
}

console.log(ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/BSk6vToy7/model.json",modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function predictemotion (){
    img = document.getElementById("capturedimg");
    classifier.classify(img,gotResult);
}

function gotResult(error,result){
    if (error){
        console.log(error);
    } else {
        console.log(result);
        document.getElementById("gesturename").innerHTML= result[0].label;

        prediction = result[0].label;
        speak();

        if (result[0].label == "ok"){
            document.getElementById("resultemoji").innerHTML = "&#128076;";
        }
        if (result[0].label == "thumbs up"){
            document.getElementById("resultemoji").innerHTML = "&#128077;";
        }
        if (result[0].label == "cheese pose"){
            document.getElementById("resultemoji").innerHTML = "&#9996;";
        }
    }
}

function speak(){
    if (prediction == "ok"){
        gesture = "This is looking amazing ";
    }
    if (prediction == "thumbs up"){
        gesture = "All the best ";
    }
    if (prediction == "cheese pose"){
        gesture = "That was a marvelous victory";
    }

    var synth = window.speechSynthesis;

    speakdata=gesture;

    var utterThis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
}