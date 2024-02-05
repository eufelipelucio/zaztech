import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './AdicionarTarefa.css'; 

function AdicionarTarefa() {
  const [descricao, setDescricao] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [prioridade, setPrioridade] = useState('normal');
  const [estado, setEstado] = useState('Pendente');
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const carregarPessoas = async () => {
      try {
        const response = await api.get('/pessoas');
        setPessoas(response.data);
      } catch (error) {
        console.error('Erro ao carregar pessoas:', error);
      }
    };
    carregarPessoas();
  }, []);

  const handleAdicionarTarefa = async () => {
    try {
      // Realize a chamada à API para adicionar a tarefa
      console.log(selectedPessoa);
      await api.post('/tarefas', {
        descricao,
        prioridade,
        estado,
        PessoaId: selectedPessoa !== '' ? selectedPessoa : null,
      });
      setError('');
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="adicionar-tarefa-container">
      <h1>Adicionar Tarefa</h1>
      <label>
        Descrição:
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </label>
      <label>
        Pessoa:
        <select
          value={selectedPessoa}
          onChange={(e) => setSelectedPessoa(e.target.value)}
        >
          <option value=''>Selecione uma pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
          ))}
        </select>
      </label>
      <label>
        Prioridade:
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
          <option value="baixa">Baixa</option>
          <option value="normal">Normal</option>
          <option value="alta">Alta</option>
        </select>
      </label>
      <label>
        Estado:
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>
      </label>
      <button onClick={handleAdicionarTarefa}>Adicionar Tarefa</button>
      <span className="error-message">{error}</span>
    </div>
  );
}

export default AdicionarTarefa;
