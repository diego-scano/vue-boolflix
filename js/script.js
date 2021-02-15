new Vue({
  el: '#root',
  data: {
    userSearch: '',
    all: [],
    movies: [],
    tvShows: [],
    languageFlags: ['en', 'it', 'de', 'sv', 'es', 'ja', 'hr', 'fr', 'pt'],
    cast: [],
    genres: [],
    buttonName : 'Show Cast',
    selected: ''
  },
  methods: {
    searchMovies: function() {
      const self = this;
      axios
        .get('https://api.themoviedb.org/3/search/movie?api_key=109b8dfeb232ae967f413b6c5604382e&query=' + self.userSearch)
        .then(function(resp) {
          self.movies = resp.data.results;
          self.all = [...self.movies, ...self.all];
        });
    },
    searchTvShows: function() {
      const self = this;
      axios
        .get('https://api.themoviedb.org/3/search/tv?api_key=109b8dfeb232ae967f413b6c5604382e&query=' + self.userSearch)
        .then(function(resp) {
          self.tvShows = resp.data.results;
          self.all = [...self.tvShows, ...self.all];
        });
    },
    search: function() {
      this.all = [];
      this.searchMovies();
      this.searchTvShows();
    },
    getVote: function(vote) {
      return parseInt(vote / 2);
    },
    getGenres: function() {
      const self = this;
      axios
        .get('https://api.themoviedb.org/3/genre/movie/list?api_key=109b8dfeb232ae967f413b6c5604382e')
        .then(function(resp) {
          self.genres = resp.data.genres;
        })
    },
    getCast: function(id) {
      const self = this;
      axios
        .get('https://api.themoviedb.org/3/movie/'+ id +'/credits?api_key=109b8dfeb232ae967f413b6c5604382e&language=en-US')
        .then(function(resp) {
          if(self.cast.length === 0) {
            for(x = 0; x < 5; x++) {
              self.cast.push(resp.data.cast[x].name);
            }
            self.buttonName = 'Hide Cast';
          } else {
            self.cast = [];
            self.buttonName = 'Show Cast';
          }
        })
    },
    resetArray: function() {
      this.cast = [];
      this.buttonName = 'Show Cast';
    },
    filterByGenre: function() {
      if(this.selected === '' || this.selected === 'All') {
        return true;
      } 
      if(!this.genres.includes(this.selected)) {
        return false;
      }
    }
  },
  mounted() {
    const self = this;
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=109b8dfeb232ae967f413b6c5604382e')
      .then(function(resp) {
        self.genres = resp.data.genres;
      })
  }
})

Vue.config.devtools = true;
