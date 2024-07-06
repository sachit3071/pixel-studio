// upload page

let imgInput = document.getElementById("imgInput");
let editPage = document.getElementById("editPage");
let uploadPage = document.getElementById("uploadPage");
imgInput.addEventListener("change", (function()
{
    let imgFile = imgInput.files[0];
    let readFile = new FileReader();
    readFile.readAsDataURL( imgFile );
    readFile.onload = (e) => 
    {    togglePages( ); };
}));
let togglePages = function(){
    uploadPage.classList.toggle('d-none');
    uploadPage.classList.toggle('d-block');
    editPage.classList.toggle('d-none');
    editPage.classList.toggle('d-flex')
    editPage.classList.toggle('flex-column');
}



// edit page

var canvas = document.getElementById('imgCanvas');
var canvasContext = canvas.getContext('2d')

var zoomInput = document.getElementById('zoomInput');
var zoomLabel = document.getElementById('zoomLabel');

var zoomIn = document.getElementById('zoomIn');
var zoomOut = document.getElementById('zoomOut');




var banana = new Image()
var minScale = 1;
var maxScale = 1;
var step = 0.05;

banana.src =  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bananavarieties.jpg/250px-Bananavarieties.jpg"
console.log(banana);



// tab functions

// resize menu

var resizeBtn = document.getElementById('resizeBtn');
var resizeMenu = document.getElementById('resizeMenu');
var resizeWidthInput = document.getElementById('resizeWidthInput');
var resizeHeightInput = document.getElementById('resizeHeightInput');
var resizeSubmitBtn = document.getElementById('resizeSubmitBtn');

toggleResizeMenu = function(){
    resizeMenu.classList.toggle('d-flex');
    resizeMenu.classList.toggle('flex-row');
    resizeMenu.classList.toggle('d-none');
}
resizeBtn.addEventListener("click", toggleResizeMenu);

resizeWidthInput.addEventListener('input', function(){
    resizeHeightInput.value = Math.round((banana.height/banana.width)*resizeWidthInput.value);
});
resizeHeightInput.addEventListener('input', function(){
    resizeWidthInput.value = Math.round((banana.width/banana.height)*resizeHeightInput.value);
});
resizeSubmitBtn.addEventListener('click', function(){ 
    banana.width = resizeWidthInput.value;
    banana.height = resizeHeightInput.value;
    clearCanvas();
    canvasContext.drawImage(banana, (canvas.width-(banana.width*scale))/2, (canvas.height-(banana.height*scale))/2, banana.width*scale, banana.height*scale);
    toggleResizeMenu();
});

// rotateMenu
var original = document.getElementById("original")
var rotateBtn = document.getElementById("rotateBtn");
var rotateBtn = document.getElementById("rotateBtn");
var rotateAnticlockwiseBtn = document.getElementById("rotateAnticlockwiseBtn");
var rotateClockwiseBtn = document.getElementById("rotateClockwiseBtn");

rotateBtn.addEventListener("click", function(){
    rotateMenu.classList.toggle('d-flex');
    rotateMenu.classList.toggle('flex-row');
    rotateMenu.classList.toggle('d-none');
});

// rotateAnticlockwiseBtn.addEventListener("click", function(){
//     banana.rotate(-90);
//     clearCanvas();
//     canvasContext.drawImage(banana, (canvas.width-(banana.width*scale))/2, (canvas.height-(banana.height*scale))/2, banana.width*scale, banana.height*scale);
// });

// rotateClockwiseBtn.addEventListener("click", function(){
//     banana.rotate(90);
//     clearCanvas();
//     canvasContext.drawImage(banana, (canvas.width-(banana.width*scale))/2, (canvas.height-(banana.height*scale))/2, banana.width*scale, banana.height*scale);
// });


// filter menu
// populateFilterMenu = function(){
//     var originalImg = banana;
//     originalImg.classList.add("img-thumbnail")
//     original.appendChild(originalImg);
// }
// populateFilterMenu();

// sidebar functions
zoomIn.addEventListener("click", function(){
    clearCanvas();
    if(scale+step < maxScale)
        scale += step;
    canvasContext.drawImage(banana, (canvas.width-(banana.width*scale))/2, (canvas.height-(banana.height*scale))/2, banana.width*scale, banana.height*scale);
});
zoomOut.addEventListener("click", function(){
    clearCanvas();
    if(scale+step > minScale)
        scale -= step;
    canvasContext.drawImage(banana, (canvas.width-(banana.width*scale))/2, (canvas.height-(banana.height*scale))/2, banana.width*scale, banana.height*scale);
});
fitImage = function(){
    let imageAspectRatio = banana.width / banana.height 
    let canvasAspectRatio = canvas.width / canvas.height 
    if( imageAspectRatio > canvasAspectRatio){
        scale = canvas.width / banana.width;
    } else {
        scale = canvas.height / banana.height;
    }
    // console.log("canvas width :", canvas.width)
    // console.log("canvas height", canvas.height)
    // console.log("banana width :", banana.width)
    // console.log("banana height", banana.height)
    step = step*scale*2;
    minScale = scale;
    maxScale = scale*3;
    resizeHeightInput.value = banana.height
    resizeWidthInput.value = banana.width
    canvasContext.drawImage(banana, (canvas.width-(banana.width*scale))/2, (canvas.height-(banana.height*scale))/2, banana.width*scale, banana.height*scale);
}


clearCanvas = function() {
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

saveBtn.addEventListener("click", function(e){
    var imgData = canvas.toDataURL('image/jpeg', 1.0);
    window.location.href = imgData;
})


// save 
var saveBtn = document.getElementById('saveBtn');
var saveAs = document.getElementById('saveAs');

saveBtn.addEventListener("click", function(){
    let resizedDataUrl = canvas.toDataURL("image/jpeg");
    saveBtn.href = resizedDataUrl;
    saveBtn.download() 
});

fitImage();