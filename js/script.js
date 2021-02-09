new Vue({
  el: '#root',
  data: {
    userSearch: '',
    movies: []
  },
  methods: {
    searchMovies: function() {
      const self = this;
      axios
        .get('https://api.themoviedb.org/3/search/movie?api_key=109b8dfeb232ae967f413b6c5604382e&query=' + self.userSearch)
        .then(function(resp) {
          self.movies = resp.data.results;
        })
    }
  }
})

Vue.config.devtools = true;
