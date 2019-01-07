

function btnClick(){
    console.log('Btn is clicked!');
    var request = new XMLHttpRequest();
    // request.open("GET", "/data.csv?d=3");
    request.open("POST", "/postdata");

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200){
            console.log("request done");
            console.log(request.responseText);
        }
    }


    request.setRequestHeader("Content-Type",
                             "text/plain");
    // request.send(null);
    somejson = {
        "val1":"val1 value",
        "val2":"val2 value"
    }
    request.send(JSON.stringify(somejson));
}

function btnClickGetAllDivs(){
    console.log($("div"));
    localStorage.username = "Name in local storage!";
}

function btnClickTryJQuery() {
    $.post("/postdata", function (data){
       console.log(data);
    });
}

function btnClickGetFromFolder() {
    $.get("/data/test.json", function(data){
        console.log(data);
    });
    console.log("Got name from local storage = " + localStorage.username);
}

function btnClickSetCookie() {
    document.cookie = "mycookie";
}

function btnClickGetCookie() {
    console.log(document.cookie)
}



