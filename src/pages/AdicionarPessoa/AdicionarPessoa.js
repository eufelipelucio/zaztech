import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './AdicionarPessoa.css'; 

function AdicionarPessoa() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();
  const [error,setError] = useState('');


  const handleAdicionarPessoa = async () => {
    try {
        if(nome !== ''){
            await api.post('/pessoas', { nome });
            navigate('/');
        }else{
            setError('Nome vazio')
        }
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
    }
  };

  return (
    <div className="adicionar-pessoa-container">
      <h1>Adicionar Pessoa</h1>
      <label>
        Nome:
        <input required
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          />
      </label>
      <button onClick={handleAdicionarPessoa}>Adicionar Pessoa</button>
    <span>{error}</span>
    </div>
  );
}

export default AdicionarPessoa;
