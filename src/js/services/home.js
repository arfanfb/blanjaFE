import request from 'request';

const base_uri = 'https://swapi.co/api';
const currentEpi = 7;

class Services {
  getList(type, page, component, item) {
      let url

      switch (type) {
        case "People":
          url = base_uri + '/people/';
          break;
        case "Planet":
          url = base_uri + '/planets/';
          break;
        case "Starship":
          url = base_uri + '/starships/';
          break;
        case "Film":
          url = base_uri + '/films/';
          break;
        case "Species":
          url = base_uri + '/species/';
          break;
        case "Vehicle":
          url = base_uri + '/vehicles/';
          break;
        default:
      }

      request
      .get(url + '?page=' + page, function(error, response, body) {
        if (body) {
          switch (type) {
            case "People":
              component.setState({people: item.concat(JSON.parse(body).results)});
              break;
            case "Planet":
              component.setState({planet: item.concat(JSON.parse(body).results)});
              break;
            case "Starship":
              component.setState({starship: item.concat(JSON.parse(body).results)});
              break;
            case "Film":
              component.setState({film: item.concat(JSON.parse(body).results)});
              break;
            case "Species":
              component.setState({species: item.concat(JSON.parse(body).results)});
              break;
            case "Vehicle":
              component.setState({vehicle: item.concat(JSON.parse(body).results)});
              break;
            default:
          }
        }
      })
  }

  getDetail(url, component) {
    let self = this

    request
    .get(url, function(error, response, body) {
      if (body) {
        if (component) {
          component.setState({detail: JSON.parse(body)});

          if (component.state.datatype != "film") {
            self.getRelatedfilm(component, JSON.parse(body).films)
          }
        }
      }
    })
  }

  getMovie(url, component) {
    if (component.state.detail.films.length != component.state.movie.length) {
      request
      .get(url, function(error, response, body) {
        if (body) {
          if (component) {
            let newArr = []
            newArr[0] = JSON.parse(body)
            let newMovie = component.state.movie.concat(newArr)
            component.setState({movie: newMovie})
          }
        }
      })
    }
  }

  getRelatedfilm(component, film) {
    let epi = []
    let relatedFilmepi = null

    film.map((item,idx) => {
        epi.push(item.split('/')[item.split('/').length - 2])
    })

    for (var i = 1; i <= epi.sort().length; i++) {
        if (i != epi.sort()[i - 1]) {
          relatedFilmepi = i
          break;
        }
    }

    if (relatedFilmepi == null) {
        if (epi.sort().length + 1 > 7) {
            relatedFilmepi = epi.sort().length - 1
        } else {
            relatedFilmepi = epi.sort().length + 1
        }
    }

    request
    .get(base_uri + '/films/' + relatedFilmepi, function(error, response, body) {
      if (body) {
        if (component) {
          component.setState({relatedMovie: JSON.parse(body)})
        }
      }
    })
  }
}

export default Services;
