import React, { Component } from "react";

export default class EstacaoClimatica extends Component {
  timer = null;

  state = {
    data: null,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ data: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div
            className="d-flex align-items-center border rounded mb-2"
            style={{ height: "6rem" }}
          >
            <i className={`fas fa-5x ${this.props.icone}`}></i>
            <p className="w-75 ms-3 text-center fs-1">{this.props.estacao}</p>
          </div>
          <div>
            <p className="text-center">
              {this.props.latitude
                ? `Coordenadas: ${this.props.latitude}, ${this.props.longitude}, Data: ${this.state.data}`
                : `Clique no botão para saber a sua estação climática`}
            </p>
          </div>
          <button
            onClick={this.props.obterLocalizacao}
            className="btn btn-outline-primary w-100 mt-2"
          >
            Qual a minha estação?
          </button>
        </div>
      </div>
    );
  }
}
