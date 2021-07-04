import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      countries: []
    };

  }
  data = [];


  async componentDidMount() { 
    let url = "http://amock.io/api/fcmaia/countries";
    let response = await fetch(url);
    const data = await response.json(); 
    ///console.log(data); // just for debug

    // ordering data (up->down)
    data.sort(function(a,b){
      return b.fronteiras.length - a.fronteiras.length;
    });
    ///console.log(data); // just for debug
    ///
    this.setState({ countries: data });

  }


  render() {

  	return (

  		<div class="card">
  		  <h2 class="card-header">Lista de Países</h2>

<div class="card-body">
  		<table class="table table-dark">
  		<thead>
  		<tr>
  		<th scope="col">#</th>
  		<th scope="col">Código</th>
  		<th scope="col">Nome do País</th>
  		<th scope="col">Fronteiras</th>
  		<th scope="col">Número de Países</th>
  		</tr>
  		</thead>

  		<tbody>
  		{this.state.countries.map( (country, index) => (
  			<tr>
  			<th scope="row">{index+1}</th>
  			<td>{country.code}</td>
  			<td>{country.name}</td>
  			<td>{country.fronteiras+""}</td>
  			<td>{country.fronteiras.length}</td>
  			</tr>

  			))}
  		</tbody>
  		</table>
      <footer class="blockquote-footer">Países em ordem de número de fronteiras on <cite title="Source Title">http://amock.io/api/fcmaia/countries</cite></footer>
  		  </div>
  		</div>

  		);
  }

};