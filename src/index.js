import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom";
import React from "react";
import EstacaoClimatica from "./EstacaoClimatica";
import Loading from "./Loading";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("construtor");
    // this.state = {
    //   latitude: null,
    //   longitude: null,
    //   estacao: null,
    //   data: null,
    //   icone: null,
    //   mensagemDeErro: null,
    // };
  }

  state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null,
  };

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

  componentDidMount() {
    this.obterLocalizacao();
  }

  render() {
    return (
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {!this.state.mensagemDeErro && !this.state.latitude ? (
              <Loading />
            ) : this.state.mensagemDeErro ? (
              <p className="border rounded p-2 fs-1">É preciso dar permissão</p>
            ) : (
              <EstacaoClimatica
                icone={this.state.icone}
                estacao={this.state.estacao}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                // data={this.state.data}
                // mensagemDeErro={this.state.mensagemDeErro}
                obterLocalizacao={this.obterLocalizacao}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
