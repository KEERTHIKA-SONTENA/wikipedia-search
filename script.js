let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function func(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");

        let searchIp = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchIp;
        
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                let { search_results } = jsondata;
                spinnerEl.classList.toggle("d-none");

                for (let i of search_results) {
                    let a1 = document.createElement("a");
                    a1.textContent = i.title;
                    a1.target = "_blank";
                    a1.href = i.link;
                    a1.classList.add("result-title");
                    searchResultsEl.appendChild(a1);

                    let br1 = document.createElement("br");
                    searchResultsEl.appendChild(br1);

                    let a2 = document.createElement("a");
                    a2.textContent = i.link;
                    a2.target = "_blank";
                    a2.classList.add("result-url");
                    a2.href = i.link;
                    searchResultsEl.appendChild(a2);

                    let br2 = document.createElement("br");
                    searchResultsEl.appendChild(br2);

                    let p = document.createElement("p");
                    p.textContent = i.description;
                    p.classList.add("link-description");
                    searchResultsEl.appendChild(p);
                }
            })
            .catch(function(error) {
                console.log("Error fetching data: ", error);
                spinnerEl.classList.toggle("d-none");
            });
    }
}

searchInputEl.addEventListener("keydown", func);
