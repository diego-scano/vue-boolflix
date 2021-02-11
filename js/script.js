new Vue({
  el: '#root',
  data: {
    userSearch: '',
    all: [],
    movies: [],
    tvShows: [],
    languageFlags: ['en', 'it', 'de', 'sv', 'es', 'ja', 'hr', 'fr', 'pt'],
    descriptionActive: false,
    imageActive: true
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
    mouseover: function() {
      this.imageActive = false;
      this.descriptionActive = true;
    },
    mouseleave: function() {
      this.descriptionActive = false;
      this.imageActive = true;
    }
  }
})

Vue.config.devtools = true;
