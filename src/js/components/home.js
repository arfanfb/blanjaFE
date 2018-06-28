// Author : Arfan. Febriyanto - arfan10110046@gmail.com

import React, { Component } from 'react';
import Services from '../services/home'
import Handlers from '../handlers/home'

let service = new Services();
let handler = new Handlers();
let promises = [];

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      people: [],
      planet: [],
      starship: [],
      film: [],
      species: [],
      vehicle: [],
      dump: [1,2],
      page: "index",
      detail: null,
      datatype: null,
      movie: [],
      relatedMovie: null,
      allMovie: false
    };

    // This binding is necessary to make `this` work in the callback
    handler.clickHandler = handler.clickHandler.bind(this);
    handler.clickMore = handler.clickMore.bind(this);
    handler.redirectIndex = handler.redirectIndex.bind(this);
    handler.allMovie = handler.allMovie.bind(this);
  }

  componentDidMount() {
    let self = this;

    service.getList('People', 1, self, self.state.people);
    service.getList('Planet', 1, self, self.state.planet);
    service.getList('Starship', 1, self, self.state.starship);
    service.getList('Film', 1, self, self.state.film);
    service.getList('Species', 1, self, self.state.species);
    service.getList('Vehicle', 1, self, self.state.vehicle);
  }

  contentComponent() {
    switch (this.state.page) {
      case "index":
        return this.indexComponent();
        break;
      case "detail":
        return this.detailComponent();
        break;
      case "more":
        return this.moreComponent();
        break;
      default:

    }
  }

  indexComponent() {
    return (
      <div className="content-wrapper">
        <div className="content-list">
          <h3 className="blockquote">People</h3>
          {this.generateList(this.state.people,'people')}
        </div>
        <div className="content-list">
          <h3 className="blockquote">Planet</h3>
          {this.generateList(this.state.planet,'planet')}
        </div>
        <div className="content-list">
          <h3 className="blockquote">Starship</h3>
          {this.generateList(this.state.starship,'starship')}
        </div>
        <div className="content-list">
          <h3 className="blockquote">Species</h3>
          {this.generateList(this.state.species,'species')}
        </div>
        <div className="content-list">
          <h3 className="blockquote">Vehicle</h3>
          {this.generateList(this.state.vehicle,'vehicle')}
        </div>
        <div className="content-list">
          <h3 className="blockquote">Film</h3>
          {this.generateList(this.state.film,'film')}
        </div>
      </div>
    )
  }

  detailComponent() {
    return (
      <div className="content-wrapper">
        {this.generateDetail()}
      </div>
    )
  }

  moreComponent() {
    let item = null

    switch (this.state.datatype) {
      case "people":
        item = this.state.people
        break;
      case "planet":
        item = this.state.planet
        break;
      case "film":
        item = this.state.film
        break;
      case "starship":
        item = this.state.starship
        break;
      case "species":
        item = this.state.species
        break;
      case "vehicle":
        item = this.state.vehicle
        break;
      default:

    }

    return (
      <div className="content-wrapper">
        {this.generateMore(item)}
      </div>
    )
  }

  generateList(stateData, dataType) {
    if (stateData.length > 0)  {
      return (
        <div className="row list">
        {
          stateData.map((item,idx) =>
            {
              if ((idx < 5 && this.state.page == "index") || this.state.page == "more") {
                if (dataType == "people") {
                  return (
                  <div key={item.url} onClick={handler.clickHandler.bind(this, dataType, 'detail', item.url)} className="col-xs-6 col-sm-4	col-md-3 col-lg-2 col-md-offset-2 thumb hover">
                    <div className="row image">
                      <div className="col-md-12">
                        <img src="/img/avatar.png"/>
                      </div>
                    </div>
                    <div className="row label">
                      <div className="col-md-12">
                        {item.name}
                      </div>
                    </div>
                  </div>
                  )
                } else if (dataType == "film") {
                  return (
                  <div key={item.url} onClick={handler.clickHandler.bind(this, dataType, 'detail', item.url)} className="col-xs-6 col-sm-4	col-md-3 col-lg-2 col-md-offset-2 thumb hover">
                    <div className="row image">
                      <div className="col-md-12">
                        <img src="/img/avatar.png"/>
                      </div>
                    </div>

                    <div className="row label">
                      <div className="col-md-12">
                        {item.title}
                      </div>
                    </div>
                  </div>
                  )
                } else {
                  return (
                  <div key={item.url} onClick={handler.clickHandler.bind(this, dataType, 'detail', item.url)} className="col-xs-6 col-sm-4	col-md-3 col-lg-2 col-md-offset-2 thumb hover">
                    <div className="row image">
                      <div className="col-md-12"></div>
                    </div>
                    <div className="row label">
                      <div className="col-md-12">
                        {item.name}
                      </div>
                    </div>
                  </div>
                  )
                }
              } else if (idx == 6 && this.state.page != "more") {
                return (
                  <div key={item.url} onClick={handler.clickMore.bind(this, dataType)} className="col-xs-6 col-sm-4	col-md-3 col-lg-2 col-md-offset-2 thumb hover">
                    <div className="row">
                      <div className="col-md-12">
                        More
                      </div>
                    </div>
                  </div>
                )
              }
            }
          )
        }
        {
          (this.state.page == "more") ?
          <div onClick={handler.clickMore.bind(this, dataType)} className="col-xs-6 col-sm-4	col-md-3 col-lg-2 col-md-offset-2 thumb hover">
            <div className="row">
              <div className="col-md-12">
                More
              </div>
            </div>
          </div>
          : ""
        }
        </div>
      )
    } else {

      return (
        <div className="row list">
        {
          this.state.dump.map((item,idx) =>
          {
              return (
              <div key={idx} className="col-xs-6 col-sm-4	col-md-3 col-lg-2 col-md-offset-2 thumb animated">
                <div className="row image">
                  <div className="col-md-12">
                  </div>
                </div>
                <div className="row label animated">
                  <div className="col-md-12">
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      )
    }
  }

  generateDescription() {
    if (this.state.datatype != null && this.state.detail != null) {
      switch (this.state.datatype) {
        case "people":
          return (
            <div className="col-xs-12 col-sm-8	col-md-9 col-lg-10 col-md-offset-2 description">
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Name:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.name}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Height:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.height} cm
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Mass:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.mass} kg
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Hair Color:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.hair_color}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Skin Color
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.skin_color}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Birth year:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.birth_year}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Eye Color:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.eye_color}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Gender
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.gender}
                </div>
              </div>
            </div>
          )
          break;
        case "planet":
          return (
            <div className="col-xs-12 col-sm-8	col-md-9 col-lg-10 col-md-offset-2 description">
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Name:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.name}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Climate:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.climate}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Diameter:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.diameter}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Orbital Period
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.orbital_period}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Population
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.population}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Rotation Period:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.rotation_period}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Surface Water:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.surface_water}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Terrain:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.terrain}
                </div>
              </div>
            </div>
          )
          break;
        case "starship":
          return (
            <div className="col-xs-12 col-sm-8	col-md-9 col-lg-10 col-md-offset-2 description">
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Name:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.name}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Model:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.model}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Manufacturer:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.manufacturer}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Cargo Capacity
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.cargo_capacity}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Length:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.length}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Passengers:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.passengers}
                </div>
              </div>
            </div>
          )
          break;
        case "species":
          return (
            <div className="col-xs-12 col-sm-8	col-md-9 col-lg-10 col-md-offset-2 description">
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Name:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.name}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Average Height:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.average_height}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Life Span:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.average_lifespan}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Classification:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.classification}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Designation:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.designation}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Eye Colors:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.eye_colors}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Hair Colors:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.hair_colors}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Language:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.language}
                </div>
              </div>
            </div>
          )
          break;
        case "vehicle":
          return (
            <div className="col-xs-12 col-sm-8	col-md-9 col-lg-10 col-md-offset-2 description">
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Name:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.name}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Model:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.model}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Manufacturer:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.manufacturer}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Cargo Capacity
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.cargo_capacity}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Length:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.length}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Passengers:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.passengers}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Vehicle Class:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.vehicle_class}
                </div>
              </div>
            </div>
          )
          break;
        case "film":
          return (
            <div className="col-xs-12 col-sm-8	col-md-9 col-lg-10 col-md-offset-2 description">
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Title:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.title}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Synopsis:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.opening_crawl}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Director:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.director}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Producer
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.producer}
                </div>
              </div>
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-3	col-md-2 col-lg-2">
                Release Date:
                </div>
                <div className="col-xs-12 col-sm-9	col-md-10 col-lg-10">
                {this.state.detail.release_date}
                </div>
              </div>
            </div>
          )
          break;
        default:

      }
    }
  }

  generateMovie() {
    let self = this;

    if (this.state.detail != null && this.state.movie.length == 0) {
      this.state.detail.films.map((item,idx) => {
        service.getMovie(item, self)
      })
    }

    return (
      (this.state.movie != []) ? (this.state.movie.map((item, idx) => { if (idx < 4 || this.state.allMovie == true) {
        return (
          <div key={idx} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <div className="movie-wrapper">
              <div className={"play content view " + (idx % 2 == 0 ? 'padme' : 'leia')}>
                <img src="/img/play.png"/>
              </div>
              <div className="description">
                <p><b>{(item.title.length <= 18 ) ? item.title : item.title.substring(0, 18) + "..."}</b></p>
                <p>Director : {item.director}</p>
                <p>Release : {item.release_date}</p>
              </div>
            </div>
          </div>
        )
      }})) : ""
    )
  }

  generateRelatedmovie() {
    return (
      <div className="movie-related-wrapper pull-left">
        <div className="bio">
          <p className="title"><b>{this.state.relatedMovie.title}</b></p>
          <p>Director: {this.state.relatedMovie.director}</p>
          <p>Producer: {this.state.relatedMovie.producer}</p>
          <p>Release: {this.state.relatedMovie.release_date}</p>
        </div>
        <div className="description">
          <p>{(this.state.relatedMovie.opening_crawl.length <= 200 ) ? this.state.relatedMovie.opening_crawl : this.state.relatedMovie.opening_crawl.substring(0, 200) + "..."}</p>
          {(this.state.relatedMovie.opening_crawl.length >= 200 ) ? <p className="pull-right yoda hover" onClick={handler.clickHandler.bind(this, 'film', 'detail', this.state.relatedMovie.url)}>See More</p> : ""}
        </div>
      </div>
    )
  }

  generateMore(item) {
    return (
      <div className="content-wrapper">
        <div className="content-list">
          <h3 className="blockquote">{this.state.datatype}</h3>
          {this.generateList(item,this.state.datatype)}
        </div>
      </div>
    )
  }

  generateDetail() {
    return (
      <div>
        <div className="row content-detail">
          <h1 className="blockquote">{(this.state.detail != null) ? this.state.detail.name : ""}</h1>
        </div>
        <div className="row list">
          <div className="col-xs-12 col-sm-4	col-md-3 col-lg-2 col-md-offset-2 thumb detail">
            <div className="row image">
              {(this.state.datatype == "people") ?  (<div className="col-md-12"><img src="/img/avatar.png"/></div>) : ""}
              {(this.state.datatype == "film") ?  (<div className="col-md-12"><img src="/img/play.png"/></div>) : ""}
            </div>
          </div>
          {this.generateDescription()}
        </div>
        {(this.state.datatype != "film") ? this.generateContentdetail() : ""}
      </div>
    )
  }

  generateContentdetail() {
    return (
      <div className="row content-detail">
        <div className="col-xs-12 col-sm-12	col-md-7 col-lg-7">
          <div className="row">
            <div className="col-xs-10 col-sm-10	col-md-10 col-lg-10 pull-left maul">
              <div className="row"><h5>{(this.state.detail != null) ? this.state.detail.name : ""} Movies</h5></div>
            </div>
            <div className="col-xs-2 col-sm-2	col-md-2 col-lg-2 small-text yoda hover pull-right no-padd" onClick={handler.allMovie.bind(this)}>
              {(this.state.detail != null ) ? ((this.state.detail.films.length > 4 ) ? "See More" : "") : ""}
            </div>
          </div>
          <div className="row list-movie">
            {this.generateMovie()}
          </div>
        </div>
        <div className="col-xs-12 col-sm-12	col-md-5 col-lg-5">
          <div className="row">
            <div className="col-xs-12 col-sm-12	col-md-2 col-lg-2">
              &nbsp;
            </div>
            <div className="col-xs-12 col-sm-12	col-md-10 col-lg-10">
              <div className="row pull-left">
                <div className="col-xs-12 col-sm-12	col-md-12 col-lg-12 maul">
                  <h5>Related Another Movies</h5>
                </div>
              </div>
              <div className="row">
                {(this.state.relatedMovie) ? this.generateRelatedmovie() : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <center>
          <header className="App-header hover" onClick={handler.redirectIndex.bind(this)}>
            <img src="/img/logo.png" className="App-logo" alt="logo" width="30%" />
            <h5 className="App-title">Welcome to STAR WARS WIKI</h5>
          </header>
          <div className="content">
            {this.contentComponent()}
          </div>
        </center>
      </div>
    );
  }
}

export default Home;
