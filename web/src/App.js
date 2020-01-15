import React, { useState, useEffect } from 'react';
import api from './services/api.js';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Compenente: É um bloco isolado de HTML, CSS e JS, o qual nao interfere no restada da aplicacao
// Estado: Informacoes que um componente PAI passa para o componente filho
// Propriedade: Informações mantidas pela componente (Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);





  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
