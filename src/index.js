import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            estacao: null,
            data: null,
            icone: null
        }
    }

    obterEstacao(data, latitude) {
        const ano = data.getFullYear();
        const d1 = new Date(ano, 5, 21);
        const d2 = new Date(ano, 8, 24);
        const d3 = new Date(ano, 11, 22);
        const d4 = new Date(ano, 3, 21);

        const sul = latitude < 0;

        if (data >= d1 && data < d2) {
            return sul ? 'inverno' : 'verão';
        }

        if (data >= d2 && data < d3) {
            return sul ? 'primavera' : 'outono';
        }

        if (data >= d3 && data < d4) {
            return sul ? 'verão' : 'inverno';
        }

        return sul ? 'outono' : 'primavera';
    }

    icons = {
        'verão': 'fa-sun',
        'outuno': 'fa-tree',
        'inverno': 'fa-snowman',
        'primavera': 'fa-seeding'
    }

    render() {
        return (
            <div>Meu App</div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)