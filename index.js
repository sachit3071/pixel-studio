// upload page
var navbar = document.getElementsByTagName('nav');
var imgInput = document.getElementById("imgInput");
var editPage = document.getElementById("editPage");
var uploadPage = document.getElementById("uploadPage");
var img = new Image();
var imgFileName;

// edit page
var zoomInput = document.getElementById('zoomInput');
var zoomLabel = document.getElementById('zoomLabel');

var zoomInBtn = document.getElementById('zoomInBtn');
var zoomOutBtn = document.getElementById('zoomOutBtn');


// resize menu
var resizeBtn = document.getElementById('resizeBtn');
var resizeMenu = document.getElementById('resizeMenu');
var resizeWidthInput = document.getElementById('resizeWidthInput');
var resizeHeightInput = document.getElementById('resizeHeightInput');
var resizeSubmitBtn = document.getElementById('resizeSubmitBtn');


// rotateMenu
var original = document.getElementById("original")
var rotateBtn = document.getElementById("rotateBtn");
var rotateBtn = document.getElementById("rotateBtn");
var rotateAnticlockwiseBtn = document.getElementById("rotateAnticlockwiseBtn");
var rotateClockwiseBtn = document.getElementById("rotateClockwiseBtn");
var angle = 0;

// filter menu
var filterBtn = document.getElementById('filterBtn');
var filterMenu = document.getElementById('filterMenu');
// var resizeWidthInput = document.getElementById('resizeWidthInput');
// var resizeHeightInput = document.getElementById('resizeHeightInput');
// var resizeSubmitBtn = document.getElementById('resizeSubmitBtn');

// sidebar functions
var scale = 1;
var step = 0.05;
var minScale = 1;
var maxScale = 5;

// save 
var saveBtn = document.getElementById('saveBtn');
var saveAs = document.getElementById('saveAs');

// canvas 
var canvas = document.getElementById('frontCanvas');
var canvasContainer = document.getElementById('canvasContainer');
var canvasContext = canvas.getContext('2d')

var imgX = 0;
var imgY = 0;
var imgWidth = img.width;
var imgHeight = img.height;




// upload page

imgInput.addEventListener("change", (function()
{
    let imgFile = imgInput.files[0];
    imgFileName = imgFile.name;
    let readFile = new FileReader();
    readFile.onload = (e) => 
    {    
        img.src = e.target.result;
        img.onload = function()
        {
            imgWidth = img.width;
            imgHeight = img.height;
            resizeWidthInput.value = img.width;
            resizeHeightInput.value = img.height;
            console.log(img.width);
            console.log(img.height);
            togglePages( );
            fitImage();
        }
    };
    readFile.readAsDataURL( imgFile );
    }));
    
let togglePages = function(){
    uploadPage.classList.toggle('d-none');
    uploadPage.classList.toggle('d-block');
    editPage.classList.toggle('d-none');
    editPage.classList.toggle('d-flex')
    editPage.classList.toggle('flex-column');
    navbar[0].classList.toggle('d-none');
}

// edit page

// tab functions

// resize menu

toggleResizeMenu = function(){
    resizeMenu.classList.toggle('d-flex');
    resizeMenu.classList.toggle('flex-row');
    resizeMenu.classList.toggle('d-none');
}
resizeBtn.addEventListener("click", toggleResizeMenu);

resizeSubmitBtn.addEventListener('click', function(){ 

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    let imageAspectRatio = resizeWidthInput.value / resizeHeightInput.value;
    let canvasAspectRatio = canvas.width / canvas.height;
    
    let canvasX = 0;
    let canvasY = 0;
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    
    if( imageAspectRatio > canvasAspectRatio ){
        // image aspect ratio is smaller than canvas aspect ratio(image is in landscape)
        canvasY = (canvas.height-(canvas.width/imageAspectRatio))/2;
        canvasHeight = canvas.width/imageAspectRatio;
    } else {
        // image aspect ratio is greater than canvas aspect ratio(image is in portrait)
        canvasX = (canvas.width-(canvas.height*imageAspectRatio))/2;
        canvasWidth = canvas.height*imageAspectRatio;
    }
    canvasContext.drawImage(img, canvasX, canvasY, canvasWidth, canvasHeight); 
    toggleResizeMenu();
});

// rotateMenu

rotateBtn.addEventListener("click", function(){
    rotateMenu.classList.toggle('d-flex');
    rotateMenu.classList.toggle('flex-row');
    rotateMenu.classList.toggle('d-none');
});


rotateAnticlockwiseBtn.addEventListener("click", function(){
    img.style.transform = "rotate(90deg)"
    console.log(img.style.transform);
    console.log("rotation anti-clockwise");
    fitImage();

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    // canvasContext.save();

    // move to the center of the canvas
    // canvasContext.translate(canvas.width/2, canvas.height/2);

    // rotate the canvas to the specified degrees
    // let temp = canvas.width;
    // canvas.width = canvas.height;
    // canvas.height = temp;

    // angle += Math.PI/2;
    // canvasContext.rotate(-angle);

    // draw the image
    // since the context is rotated, the image will be rotated also
    // let scale = canvas.parentElement.clientHeight / canvas.width;
    // if(canvas.height > canvas.parentElement.clientWidth)
    //     scale = canvas.parentElement.clientWidth / canvas.height;
    // canvas.height = scale*canvas.height;
    // canvas.width = scale*canvas.width;
    // canvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.height, canvas.width);
    // we’re done with the rotating so restore the unrotated context
    // canvasContext.restore();

    // canvas.height = canvas.parentElement.clientHeight;
    // canvas.width = canvas.parentElement.clientWidth;
    // imageAspectRatio = img.height / img.width;
    // canvasAspectRatio = canvas.width / canvas.height;
    // canvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width/2, canvas.height/2);
});

// rotateClockwiseBtn.addEventListener("click", function(){
//     img.rotate(90);
//     clearCanvas();
//     canvasContext.drawImage(img, (canvas.width-(img.width*scale))/2, (canvas.height-(img.height*scale))/2, img.width*scale, img.height*scale);
// });


// filter menu

toggleFilterMenu = function(){
    filterMenu.classList.toggle('d-flex');
    filterMenu.classList.toggle('flex-row');
    filterMenu.classList.toggle('d-none');
}
filterBtn.addEventListener("click", toggleFilterMenu);

function applyFilter(brightness = 100, contrast = 100, grayscale = 0, saturate = 100, sepia = 0, hueRotate = 0, invert = 0) {
    
    clearCanvas();
    // Create a string that will contain all the filters
    // to be used for the image
    let filterString =
        "brightness(" + brightness + "%" +
        ") contrast(" + contrast + "%" +
        ") grayscale(" + grayscale + "%" +
        ") saturate(" + saturate + "%" +
        ") sepia(" + sepia + "%" +
        ") invert(" + invert + "%" +
        ") hue-rotate(" + hueRotate + "deg" + ")";
    
    let imageAspectRatio = img.width / img.height
    let canvasAspectRatio = canvas.width / canvas.height;
    
    let canvasX = 0;
    let canvasY = 0;
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    
    if( imageAspectRatio > canvasAspectRatio ){
        // image aspect ratio is smaller than canvas aspect ratio(image is in landscape)
        canvasY = (canvas.height-(canvas.width/imageAspectRatio))/2;
        canvasHeight = canvas.width/imageAspectRatio;
    } else {
        // image aspect ratio is greater than canvas aspect ratio(image is in portrait)
        canvasX = (canvas.width-(canvas.height*imageAspectRatio))/2;
        canvasWidth = canvas.height*imageAspectRatio;
    }

    // canvasContext.filter = "blur(40px)";
    // Apply the filter to the image
    canvasContext.filter = filterString;
    // Draw the edited image to canvas
    canvasContext.drawImage(img, canvasX, canvasY, canvasWidth, canvasHeight);
}

function resetFilter(){
    console.log("Original");
    applyFilter();
}
function bw(){
    console.log("bw");
    applyFilter(120, 120, 100, 100, 0, 0);
}
function vintage(){
    applyFilter(120, 150, 0, 70, 0, 0, 0);
}
function grayscale(){
    applyFilter(100, 100, 100, 100, 0, 0);
}
function invert(){
    applyFilter(100, 100, 0, 100, 0, 0, 100);
}

// sidebar functions
zoomIn = function(){
    clearCanvas();
    scale += step;
    scale = Math.max(minScale, Math.min(maxScale, scale));
    zoomLabel.innerText = Math.round(scale*100)/100;
    fitImage();
};
zoomOut = function(){
    clearCanvas();
    scale -= step;
    scale = Math.max(minScale, Math.min(maxScale, scale));
    zoomLabel.innerText = Math.round(scale*100)/100;
    fitImage();
};
zoom = function(event)
{
    event.preventDefault;
    scale += (event.deltaY  * -step)/100;
    scale = Math.max(minScale, Math.min(maxScale, scale));
    zoomLabel.innerText = Math.round(scale*100)/100;
    fitImage();
    console.log("scale :",scale);
}
frontCanvas.onwheel = zoom;
zoomInBtn.addEventListener("click", zoomIn);
zoomOutBtn.addEventListener("click", zoomOut);

// save 

saveBtn.addEventListener("click", function(){
    let element = document.createElement('a');
    // element.setAttribute('href','data:text/plain;charset=utf-8, '+ encodeURIComponent(text));
    // element.setAttribute('download', file);
    element.href = canvas.toDataURL(`image/${saveAs.value}`);
    element.download = imgFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});


// canvas 
fitImage = function(){

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    
    let imageAspectRatio = img.width / img.height
    let canvasAspectRatio = canvas.width / canvas.height;
    
    let canvasX = 0;
    let canvasY = 0;
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    
    if( imageAspectRatio > canvasAspectRatio ){
        // image aspect ratio is smaller than canvas aspect ratio(image is in landscape)
        canvasY = (canvas.height-(canvas.width/imageAspectRatio))/2;
        canvasHeight = canvas.width/imageAspectRatio;
    } else {
        // image aspect ratio is greater than canvas aspect ratio(image is in portrait)
        canvasX = (canvas.width-(canvas.height*imageAspectRatio))/2;
        canvasWidth = canvas.height*imageAspectRatio;
    }
    if(scale > 1)
    {
        canvasX = (canvas.width - (canvasWidth*scale))/2;
        canvasY = (canvas.height - (canvas.height*scale))/2;
        if(scale*canvasWidth > canvas.width)
        {
            canvasX = 0;
            imgWidth = (canvas.width*img.width)/(canvasWidth*scale);
            canvasWidth = canvas.width;
            imgX = (img.width-imgWidth)/2;
        } else {
            canvasWidth = canvasWidth*scale;
        }
        if(scale*canvasHeight > canvas.height)
        {
            canvasY = 0;
            imgHeight = (canvas.height*img.height)/(canvasHeight*scale);
            canvasHeight = canvas.height;
            imgY = (img.height-imgHeight)/2;
        } else {
            canvasHeight = canvasHeight*scale;
        }
    }
    else
    {
        imgX = 0;
        imgY = 0;
        imgWidth = img.width;
        imgHeight = img.height;
    }
    canvasContext.drawImage(img, imgX, imgY, imgWidth, imgHeight, canvasX, canvasY, canvasWidth, canvasHeight); 
    console.log(imgX," ", imgY);
    console.log(imgWidth," ", imgHeight);
    console.log(canvasX," ",canvasY );
    console.log(canvasWidth," ", canvasHeight);
    console.log("imgWidth :", imgWidth)
    console.log("imgHeight", imgHeight)
}

clearCanvas = function() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}