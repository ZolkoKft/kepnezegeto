var index = 0;
var myObject = JSON.parse(readJSON('content.json'));
var count = Object.keys(myObject).length;

var data = $.getJSON("content.json", function(json) {
    //console.log(json[1]); // this will show the info it in firebug console
    addImages(json);
    loadMainPhoto(index, json);
});


function createImg (element, index) {

    var divThumbnail = document.createElement("div");
    divThumbnail.setAttribute("class", "thumbnail");

    var img = document.createElement("img");
    img.src = element.photo;
    img.setAttribute("class", "thumbnail-img");
    img.setAttribute("id", makeIdText(index));

    var divTilte = document.createElement("div");
    divTilte.innerText = element.title;
    divTilte.setAttribute("class", "title");

    divThumbnail.appendChild(img);
    divThumbnail.appendChild(divTilte);
    
    document.getElementById("thumbnail-container").appendChild(divThumbnail);
}

function addImages(json) {
    // json.forEach(element => {
    //     createImg(element);
    // });
    for (let i = 0; i < count; i++) {
        createImg(json[i], i);
        
    }
}


function loadMainPhoto (index, json) {
    //console.log(json[index].photo);
    document.getElementById("main-photo").src = json[index].photo;
    document.getElementById("photo-title").innerText = json[index].title;
    let description = document.getElementById("photo-description").innerText = json[index].description;
    //console.log(description);
    highLightActualThumbnal(index);
}

function highLightActualThumbnal(index){
    $(".highlight").removeClass("highlight");

    let element = document.getElementById(makeIdText(index));
    element.classList.add("highlight");
    //console.log(element);
}


$('#right-arrow').on('click',()=>{
    incIndex();
    loadMainPhoto(index, myObject);
    //console.log(index);
})

$('#left-arrow').on('click',()=>{
    decIndex();
    loadMainPhoto(index, myObject);
    //console.log(index);
})

$('#thumbnail-container').on('click', function(event) {
    var target = $(event.target);
    if ((event.target.tagName === 'IMG')) {
        //console.log(target.attr('src'));
        //console.log(target.attr('id'));
        //getIndexBySrc(target.attr('src'));
        index = getIdNumber(target.attr('id'));
        loadMainPhoto(index, myObject);
    }
});

function getIdNumber(text) {
    var res = text.split("-");
    return res[res.length-1];
}

function makeIdText(index) {
    return "img-"+ index;
}

function getIndexBySrc(src) {
    for (let i = 0; i < count; i++) {
        if (src == myObject[i].photo) {
            index = i;
            //console.log(index);
        }
    }
}

function incIndex() {
    if ( index < count-1) {
        index++;
    }
    else {
        index = 0;
    }
}

function decIndex() {
    if ( index > 0) {
        index--;
    }
    else {
        index = count - 1;
    }
}

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
};

var myObject = JSON.parse(readJSON('content.json'));