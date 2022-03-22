"use strict"

let ctrlPressed = false;
let elements = [];
let visibleElements = [];
let trashCan;
let caseSensitive = false;

window.onload=function(){
    let titleInput = document.getElementById("titleInput");
    titleInput.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            event.preventDefault();
            document.getElementById("titleInputButton").click();
        }
    });
    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", (event) => {
        clearScreen();
        search();
        showList();
    });

    $(window).on('keydown', (e) => {
        if(e.key == "Control"){
            ctrlPressed = true;
        }
        if(e.key == "z" && ctrlPressed == true){
            if(trashCan[1] == ""){
                return;
            }
            console.log(trashCan);
            console.log("Przed");
            console.log(visibleElements);
            visibleElements[trashCan[0]] = trashCan[1];
            elements[trashCan[0]] = trashCan[1];
            console.log("Po");
            console.log(visibleElements);
            clearScreen();
            search();
            showList();
            trashCan = ["",""];
        }
    });

    $(window).on('keyup', (e) => {
        if(e.key == "Control"){
            ctrlPressed = false;
        }
    });
}

function toogleCaseSensitive(button){
    if(button.classList.contains("button")){
        button.classList.remove("button");
        button.classList.remove("search-button");
        button.classList.add("button-checked");
        caseSensitive = true;
        return;
    }
    button.classList.remove("button-checked");
    button.classList.add("search-button");
    button.classList.add("button");
    caseSensitive = false;
}

function newElement(){
    let titleInput = document.getElementById("titleInput");
    if(titleInput.value == ""){
        titleInput.placeholder = "U must enter a text !";
        titleInput.classList.add("title-input-placeholder");
        
        return;
    }
    titleInput.placeholder = "Text";
    titleInput.classList.remove("title-input-placeholder");

    elements.push(titleInput.value);
    if(elements.length == 0){
        addElementToList(0,titleInput.value);
    }
    else{
        addElementToList(elements.length-1,titleInput.value);
    }

    visibleElements = elements;
    document.getElementById("searchInput").value = "";
    document.getElementById("titleInput").value = "";
}

function createModal(index,text,paragraph){
    let modalId = "modal" + index;
    let $modal = $('<div class="modal"></div>');
    $($modal).attr('id', modalId);
    let $modalParagraph = $('<p></p>').text("Are you sure you want to delete " + text + " ?");
    let $modalButton = $('<a id="modalConfirm" class="button" rel="modal:close">Yes</a>');
    $modalButton.click(() => {
        let searchInput = document.getElementById("searchInput");
        if(searchInput.value != ""){
            clearScreen();
            trashCan = [paragraph.id,paragraph.firstChild.innerHTML];
            elements[paragraph.id] = "";
            search();
            showList();
            return;
        }
        trashCan = [paragraph.id,paragraph.firstChild.innerHTML];
        $(paragraph).remove();
        elements[paragraph.id] = "";
        $($modal).remove();
    });
    $($modal).append($modalParagraph);
    $($modal).append($modalButton);

    $("#list").append($modal);

    return "#" + modalId;
}

function addElementToList(index,text = "null"){
    let wholeList = document.getElementById("list");
    let paragraph = document.createElement("p");
    paragraph.classList.add("list-element-container");
    let btn = document.createElement("button");
    btn.innerHTML = text;
    paragraph.id = index;
    btn.onclick = () => crossElement(btn);
    btn.classList.add("list-element");
    paragraph.appendChild(btn);

    let modalId = createModal(index,text,paragraph);

    let $input = $('<a class="button button-small">X</a>');
    $input.click(() => {
        $(modalId).modal('show');
    });
    $(paragraph).append($input);


    wholeList.appendChild(paragraph);
}

function crossElement(button){
    if(button.classList.contains("list-element-line")){
        button.classList.remove("list-element-line");

        var reg = /([0-9]+(\.[0-9]+)+)/g;
        button.innerHTML = button.innerHTML.replace(reg,"");

        return;
    }
    var today = new Date();
    button.classList.add("list-element-line");
    button.innerHTML += " " + today.toLocaleDateString("pl-PL");
}

function clearScreen(){
    visibleElements = [];
    let wholeList = document.getElementById("list");
    wholeList.innerHTML = '';
}

function showList(){
    for (let i = 0; i < visibleElements.length; i++) {
        if(visibleElements[i] != ''){
            addElementToList(i,visibleElements[i]);
        }
    }
}

function search(){
    let searchInput = document.getElementById("searchInput");
    if(searchInput.value == ""){
        visibleElements = elements;
        return;
    }

    if(caseSensitive){
        visibleElements = elements.filter((element) => {
            return element.includes(searchInput.value);
        });
        return;     
    }

    visibleElements = elements.filter((element) => {
        console.log(element.toLowerCase());
        return element.toLowerCase().includes(searchInput.value.toLowerCase());
    });
}