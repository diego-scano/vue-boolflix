new Vue({
  el: '#root',
  data: {
    userSearch: '',
    movies: []
  },
  methods: {
    searchMovies: function() {
      axios
        .get('https://api.themoviedb.org/3/search/movie?api_key=109b8dfeb232ae967f413b6c5604382e&query=' + this.userSearch)
        .then(function(resp) {
          this.movies = resp.data.results;
          console.log(this.movies);
        })
    }
  }
})

Vue.config.devtools = true;
