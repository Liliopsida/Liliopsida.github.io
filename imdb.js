let baseURL = "https://api.themoviedb.org/3/";
let imageURL = "https://image.tmdb.org/t/p/w185/"
const APIKEY = "77fc4cf5a7c91a8806988b1b2dc95d68";

//make sure DOM is ready
$(document).ready(function(){

    //get keyword and run searchKeyword function
    document.getElementById("searchbutton").onclick = function() {
        //get value of search bar
        let requestKeyword = document.getElementById("search").value;
        //call requestKeyword function;
        searchKeyword(requestKeyword);
        
    };


//function to return results for the keyword
let searchKeyword = function (keyword) {
    //generate url for search results
    let requestURL = baseURL.concat("search/movie?api_key=", APIKEY, "&query=", keyword);
    //fetch results
    fetch(requestURL).then(result => result.json()).then((data)=> {
        //create ul element
        var ul = document.createElement("ul");
        ul.setAttribute("id", "movielist");
        document.getElementById("moviegrid").appendChild(ul);
        console.log(data.results);
        for (var element of data.results) {
            
            //generate trye url for image
            let truePosterPath = imageURL.concat(element.poster_path); 
            
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

        //document.getElementById('moviegrid').innerHTML = JSON.stringify(data, null, 4);
    });
}

});