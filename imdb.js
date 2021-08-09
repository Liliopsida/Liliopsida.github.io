let baseURL = "https://api.themoviedb.org/3/";
let imageURL = "https://image.tmdb.org/t/p/w185/"
const APIKEY = "77fc4cf5a7c91a8806988b1b2dc95d68";

//make sure DOM is ready
$(document).ready(function() {

//gets config data, does not show to user
let requestConfig = function() {
    let configURL = baseURL.concat("configuration?api_key=", APIKEY);

    fetch(configURL).then(result => result.json()).then((data)=> {
        console.log(data);
    })
}

//function to return results for the keyword
let searchKeyword = function (keyword) {
    //generate url for search results
    let requestURL = baseURL.concat("search/movie?api_key=", APIKEY, "&query=", keyword);
    //fetch results
    fetch(requestURL).then(result => result.json()).then((data)=> {
        //create ul element
        passjson(data);   
    });
}

//gets request for trending movies
let requestTrending = function() {
    let trendURL = baseURL.concat("trending/movie/day?api_key=", APIKEY);
    fetch(trendURL).then(result => result.json()).then((data)=> {
        passjson(data);
    });
}

//gets request for popular movies
let requestPopular = function() {
    let popURL = baseURL.concat("discover/movie?api_key=", APIKEY, "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate");
    fetch(popURL).then(result => result.json()).then((data)=> {
        passjson(data);
    });
}

//adds the data to the div
let passjson = function(data) {
    clearData();
    
    if(data.results.length < 1){
        document.getElementById("moviegrid").innerHTML = "I'm sorry, Dave. I'm afraid I can't do that."
    }
    
    var ul = document.createElement("ul");
    ul.setAttribute("id", "movielist");
    document.getElementById("moviegrid").appendChild(ul);
    console.log(data.results);
    for (var element of data.results) {
            let truePosterPath = "";
            //generate trye url for image
            if(element.poster_path != null){
                truePosterPath = imageURL.concat(element.poster_path);
            }
            else{
                truePosterPath = imageURL.concat("/h3MNu3aOknrzpC3t9cdyXG2BCnF.jpg");
            }
             
                    
                    //make li for each result
            var li = document.createElement("li");
            document.getElementById("movielist").appendChild(li);

            //makediv for each result
            var div = document.createElement("div");
            li.appendChild(div);

            

            //add image element to div
            var imageElem = document.createElement("img");
            imageElem.setAttribute("src", truePosterPath);
            div.appendChild(imageElem);            
            
            //add title to div
            var h2 = document.createElement("h2");
            h2.innerHTML = element.original_title;
            div.appendChild(h2); 
        }
}

//clears out the div to add new data
let clearData = function () {
    document.getElementById("moviegrid").innerHTML = "";
}

    //get keyword and run searchKeyword function
    document.getElementById("searchbutton").onclick = function() {
        //get value of search bar
        let requestKeyword = document.getElementById("search").value;
        requestConfig();
        //call requestKeyword function;
        searchKeyword(requestKeyword);
    };

    document.getElementById("trendingbutton").onclick = function() {
        requestTrending();
    };

    document.getElementById("popreleasebutton").onclick = function() {
        requestPopular();
    };


});