import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null,
      mensagemDeErro: null,
    };
  }

  obterEstacao = (data, latitude) => {
    const ano = data.getFullYear();
    const d1 = new Date(ano, 5, 21);
    const d2 = new Date(ano, 8, 24);
    const d3 = new Date(ano, 11, 22);
    const d4 = new Date(ano, 3, 21);

    const sul = latitude < 0;

    if (data >= d1 && data < d2) {
      return sul ? "inverno" : "verão";
    }

    if (data >= d2 && data < d3) {
      return sul ? "primavera" : "outono";
    }

    if (data >= d3 && data < d4) {
      return sul ? "verão" : "inverno";
    }

    return sul ? "outono" : "primavera";
  };

  icons = {
    verão: "fa-sun",
    outuno: "fa-tree",
    inverno: "fa-snowman",
    primavera: "fa-seeding",
  };

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        let data = new Date();
        let estacao = this.obterEstacao(data, position.coords.latitude);
        let icone = this.icons[estacao];
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          data: data.toLocaleString(),
          estacao: estacao,
          icone: icone,
        });
      },
      (error) => {
        console.log(error);
        this.setState({ mensagemDeErro: "Tente novamente mais tarde" });
      }
    );
  };

  render() {
    return (
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div
                  className="d-flex align-items-center border rounded mb-2"
                  style={{ height: "6rem" }}
                >
                  <i className={`fas fa-5x ${this.state.icone}`}></i>
                  <p className="w-75 ms-3 text-center fs-1">
                    {this.state.estacao}
                  </p>
                </div>
                <div>
                  <p className="text-center">
                    {this.state.latitude
                      ? `Coordenadas: ${this.state.latitude}, ${this.state.longitude}, Data: ${this.state.data}`
                      : this.state.mensagemDeErro
                      ? `${this.state.mensagemDeErro}`
                      : `Clique no botão para saber a sua estação climática`}
                  </p>
                </div>
                <button
                  onClick={this.obterLocalizacao}
                  className="btn btn-outline-primary w-100 mt-2"
                >
                  Qual a minha estação?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
