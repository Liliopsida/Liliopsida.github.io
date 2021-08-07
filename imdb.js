let baseURL = "https://api.themoviedb.org/3/";
const APIKEY = "77fc4cf5a7c91a8806988b1b2dc95d68";

$(document).ready(function(){

    document.getElementById("searchbutton").onclick = function() {
        let requestKeyword = document.getElementById("search").value;
        console.log(requestKeyword);
        searchKeyword(requestKeyword);
    };



let searchKeyword = function (keyword) {
    let requestURL = baseURL.concat("search/movie?api_key=", APIKEY, "&query=", keyword);
    console.log(requestURL);
    fetch(requestURL).then(result => result.json()).then((data)=> {
        document.getElementById('result').innerHTML = JSON.stringify(data, null, 4);
    });
}

});