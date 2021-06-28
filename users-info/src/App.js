import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      page: null,
      per_page: null,
      total: null,
      total_pages: null,
      users: []
    };

    this.activePage = 1;
  }

  async componentDidMount(){ 
    let url = "https://reqres.in/api/users?page="+this.activePage;
    let response = await fetch(url);
    let state = await response.json();

    this.setState({ users: state.data });
    this.setState({ total_pages: state.total_pages });

  }

  handlePageChange(pageNumber) {
    if (pageNumber!==this.activePage) {
      this.activePage = pageNumber; 
      window.scrollTo(0, 0)
      this.componentDidMount();
    }
    
  }

  handlePreviousChange() {
    if (this.activePage > 1) {
      this.activePage -= 1; 
      window.scrollTo(0, 0)
      this.componentDidMount();
    }
  }

  handleNextChange() {
     if (this.activePage < this.state.total_pages) {
      this.activePage += 1; 
      window.scrollTo(0, 0)
      this.componentDidMount();
    }   
  }

  render() {
    //console.log(this.state.total_pages); // just for debug

    // create array page-itens
    var array_aux = Array.from({length: this.state.total_pages}, (_, i) => i + 1);
    ///

    return (

      <div class="card">
        <h2 class="card-header">Lista de Usuários</h2>
    
        {this.state.users.map( (user) => (
          <div class="card-columns">
            <div class="card">
              <img class="card-img-top" src={user.avatar} alt="Card image cap"/>
              <div class="card-body">
                <h5 class="card-title">{user.first_name + ' ' + user.last_name}</h5>
                <p class="card-text">{user.email}</p>
              </div>
             <div class="card-footer">
                <small class="text-muted">Last updated 22 mins ago</small>
             </div>
            </div>
          </div>
        ))}

        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" onClick={() => this.handlePreviousChange()}>Previous</a>
            </li>
            {array_aux.map( i => (         
              <li class="page-item" >
                <a class="page-link" onClick={() => this.handlePageChange(`${i}`)}>{i}</a>  
              </li>
            ))}
            <li class="page-item">
              <a class="page-link" onClick={() => this.handleNextChange()}>Next</a>
            </li>
          </ul>
        </nav>
      </div>

    );
  }

};