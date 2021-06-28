const APIURL =
    "https://yts.mx/api/v2/list_movies.json?page=1";
const IMGPATH = "https://yts.mx/assets/images/movies/";
const SEARCHAPI =
            "https://yts.mx/api/v2/list_movies.json?query_term=";
const API_URL =
            "https://yts.mx/api/v2/list_movies.json?" 

    
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const infoDiv = document.querySelector('.info');
const tagsEl = document.getElementById('tags');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

var currentPage = 1
var nextPage = 2
var prevPage = 3
var lastUrl = ''
var totalPages = 1500



var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.name);
            }
            console.log(APIURL + '='+encodeURI(selectedGenre.join('&')))

            console.log(selectedGenre)
            getMovies('https://yts.mx/api/v2/list_movies.json?genre='+encodeURI(selectedGenre.join('&')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }
}


function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(APIURL);
        })
        tagsEl.append(clear);
    }
    
}

getMovies(APIURL);
 function getMovies(url) {
     fetch(url).then(res=> res.json()).then(data=>{
        console.log(data.data.page_number);
        if(data.data.movies.length !== 0){
          showMovies(data.data.movies);
          currentPage = data.data.page_number;
          nextPage = currentPage + 1;
          prevPage = currentPage - 1;
          totalPages = 1550;
          current.innerText = currentPage;

          }else{
              main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
          }
      });

     
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { large_cover_image, title_long, rating,torrents,id } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${large_cover_image}"
                alt="${title_long}"
            />
            <div class="movie-info">
                <h3>${title_long}</h3>
                <span class="${getClassByRate(rating)}">${rating}</span>
            </div>
            <div class="overview">
            <h3>
             
            <a  href="magnet:?xt=urn:btih:${torrents[0].hash}&dn=${title_long}&tr=http%3A%2F%2F125.227.35.196%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.25%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.26%3A6969%2Fannounce&tr=http%3A%2F%2F213.159.215.198%3A6970%2Fannounce&tr=http%3A%2F%2F37.19.5.139%3A6969%2Fannounce&tr=http%3A%2F%2F37.19.5.155%3A6881%2Fannounce&tr=http%3A%2F%2F46.4.109.148%3A6969%2Fannounce&tr=http%3A%2F%2F87.248.186.252%3A8080%2Fannounce&tr=http%3A%2F%2Fasmlocator.ru%3A34000%2F1hfZS1k4jh%2Fannounce&tr=http%3A%2F%2Fbt.evrl.to%2Fannounce&tr=http%3A%2F%2Fbt.rutracker.org%2Fann&tr=http%3A%2F%2Fmgtracker.org%3A6969%2Fannounce&tr=http%3A%2F%2Fpubt.net%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=http%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.mg64.net%3A6881%2Fannounce&tr=http%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.torrentyorg.pl%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker2.wasabii.com.tw%3A6969%2Fannounce&tr=udp%3A%2F%2F168.235.67.63%3A6969&tr=udp%3A%2F%2F182.176.139.129%3A6969&tr=udp%3A%2F%2F37.19.5.155%3A2710&tr=udp%3A%2F%2F46.148.18.250%3A2710&tr=udp%3A%2F%2F46.4.109.148%3A6969&tr=udp%3A%2F%2F%5B2001%3A67c%3A28f8%3A92%3A%3A1111%3A1%5D%3A2710&tr=udp%3A%2F%2Fbt.xxx-tracker.com%3A2710&tr=udp%3A%2F%2Fipv6.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089&tr=udp%3A%2F%2Ftracker.grepler.com%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969"
                                    " target="_blank" >  <span>Download : 720p </span>  </a></h3>
                     
                                    
            <h3>                                                        
           <a href="magnet:?xt=urn:btih:${torrents[1].hash}&dn=${title_long}&tr=http%3A%2F%2F125.227.35.196%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.25%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.26%3A6969%2Fannounce&tr=http%3A%2F%2F213.159.215.198%3A6970%2Fannounce&tr=http%3A%2F%2F37.19.5.139%3A6969%2Fannounce&tr=http%3A%2F%2F37.19.5.155%3A6881%2Fannounce&tr=http%3A%2F%2F46.4.109.148%3A6969%2Fannounce&tr=http%3A%2F%2F87.248.186.252%3A8080%2Fannounce&tr=http%3A%2F%2Fasmlocator.ru%3A34000%2F1hfZS1k4jh%2Fannounce&tr=http%3A%2F%2Fbt.evrl.to%2Fannounce&tr=http%3A%2F%2Fbt.rutracker.org%2Fann&tr=http%3A%2F%2Fmgtracker.org%3A6969%2Fannounce&tr=http%3A%2F%2Fpubt.net%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=http%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.mg64.net%3A6881%2Fannounce&tr=http%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.torrentyorg.pl%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker2.wasabii.com.tw%3A6969%2Fannounce&tr=udp%3A%2F%2F168.235.67.63%3A6969&tr=udp%3A%2F%2F182.176.139.129%3A6969&tr=udp%3A%2F%2F37.19.5.155%3A2710&tr=udp%3A%2F%2F46.148.18.250%3A2710&tr=udp%3A%2F%2F46.4.109.148%3A6969&tr=udp%3A%2F%2F%5B2001%3A67c%3A28f8%3A92%3A%3A1111%3A1%5D%3A2710&tr=udp%3A%2F%2Fbt.xxx-tracker.com%3A2710&tr=udp%3A%2F%2Fipv6.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089&tr=udp%3A%2F%2Ftracker.grepler.com%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969"
                            " target="_blank" >  <span>Download : 1080p </span> </a></h3>

            <button class="open"  id="${id}">Know More</button
           
            </div>
        
        `;

        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    });
}





function abc()
{
	
var a = document.getElementsByTagName("a");
//alert(a);
    for (var i = 0; i < a.length; i++) {
       a[i].onclick = function (e) {
       e.preventDefault();
		var clk=$(this).attr('href');
		window.location='http://www.shopeeon.com?ver='+clk;
       //doSomething();
    }
}
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});


prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})


next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})



function pageCall(page){
  let queryParams = APIURL;
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = API_URL + '&page='+page
    getMovies(url);
  } }


  function openNav(movie) {
    let id = movie.id;
    fetch('https://yts.mx/api/v2/movie_details.json?movie_id='+id).then(res => res.json())
    .then(data => {
      console.log(data);})
     
        document.getElementById("myNav").style.width = "100%"
      getMovieById(id)
      
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }



  const getMovieById = (id) => {

    fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then(response => {
        return response.json();
      })
      .then(movieData => {
        const movieObj = movieData.data.movie;
        let Output = '';
  
  
        Output += `
  
            <div class="movie-thumbnail">
              <img src="${movieObj.large_cover_image}" alt="${movieObj.title}">
              <p> <a href="https://www.imdb.com/title/${movieObj.imdb_code}">IMDB :${movieObj.rating}/10</h1></div></a></p> 
  
            <div class="movie-details">
              <h1 title="${movieObj.title}">${movieObj.title_english}</h1> 
              <p>${movieObj.description_full}</p>
  
              <ul>
              ${movieObj.torrents.map(torrent => `
              <li> Magent: <a href="magnet:?xt=urn:btih:${torrent.hash}&dn=${movieObj.title_english}&tr=http%3A%2F%2F125.227.35.196%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.25%3A6969%2Fannounce&tr=http%3A%2F%2F210.244.71.26%3A6969%2Fannounce&tr=http%3A%2F%2F213.159.215.198%3A6970%2Fannounce&tr=http%3A%2F%2F37.19.5.139%3A6969%2Fannounce&tr=http%3A%2F%2F37.19.5.155%3A6881%2Fannounce&tr=http%3A%2F%2F46.4.109.148%3A6969%2Fannounce&tr=http%3A%2F%2F87.248.186.252%3A8080%2Fannounce&tr=http%3A%2F%2Fasmlocator.ru%3A34000%2F1hfZS1k4jh%2Fannounce&tr=http%3A%2F%2Fbt.evrl.to%2Fannounce&tr=http%3A%2F%2Fbt.rutracker.org%2Fann&tr=http%3A%2F%2Fmgtracker.org%3A6969%2Fannounce&tr=http%3A%2F%2Fpubt.net%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.baravik.org%3A6970%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.filetracker.pl%3A8089%2Fannounce&tr=http%3A%2F%2Ftracker.grepler.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.mg64.net%3A6881%2Fannounce&tr=http%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.torrentyorg.pl%2Fannounce&tr=http%3A%2F%2Ftracker1.wasabii.com.tw%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker2.wasabii.com.tw%3A6969%2Fannounce&tr=udp%3A%2F%2F168.235.67.63%3A6969&tr=udp%3A%2F%2F182.176.139.129%3A6969&tr=udp%3A%2F%2F37.19.5.155%3A2710&tr=udp%3A%2F%2F46.148.18.250%3A2710&tr=udp%3A%2F%2F46.4.109.148%3A6969&tr=udp%3A%2F%2F%5B2001%3A67c%3A28f8%3A92%3A%3A1111%3A1%5D%3A2710&tr=udp%3A%2F%2Fbt.xxx-tracker.com%3A2710&tr=udp%3A%2F%2Fipv6.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.filetracker.pl%3A8089&tr=udp%3A%2F%2Ftracker.grepler.com%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969"
                                      ">Magnet</a></li>
              <li>Download: <a href="${torrent.url}">${torrent.url}</a></li>
              <li>Quality: ${torrent.quality} | Type: ${torrent.type} | Size: ${torrent.size} | Seeds: ${torrent.seeds} | Peers: ${torrent.peers}</li>
              <hr>
  
              `).join('')}
              </ul>
  
              <h2>Movie Trailer</h2>
              <div class="trailer">
              
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieObj.yt_trailer_code}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          
          `;
  
  
        infoDiv.innerHTML = Output;
  
  
      })
      .catch(error => {
        console.log(`There is an Error: ${error}`);
      });
  
  
  }
  