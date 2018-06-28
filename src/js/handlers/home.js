import Services from '../services/home'
let service = new Services();

class Handlers {
  constructor() {

  }

  redirectIndex() {
    this.setState({page: "index",allMovie: false});
  }

  clickHandler(dataType, pageHref, url, ) {
    switch (pageHref) {
      case "index":
        this.setState({page: "index",allMovie: false});
        break;
      case "detail":
        service.getDetail(url, this);
        this.setState({detail: null, movie: [], relatedMovie: null});
        this.setState({page: "detail", datatype: dataType});
        break;
      default:
    }
  }

  allMovie() {
    this.setState({allMovie: true})
  }

  clickMore(dataType) {
    let type, item = null

    switch (dataType) {
      case "people":
        item = this.state.people
        type = "People"
        break;
      case "planet":
        item = this.state.planet
        type = "Planet"
        break;
      case "starship":
        item = this.state.starship
        type = "Starship"
        break;
      case "film":
        item = this.state.film
        type = "Film"
        break;
      case "species":
        item = this.state.species
        type = "Species"
        break;
      case "vehicle":
        item = this.state.vehicle
        type = "Vehicle"
        break;
      default:
    }

    service.getList(type, Math.ceil((item.length / 10) + 1), this, item);
    this.setState({page: "more", datatype: dataType});
  }
}

export default Handlers;
