import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Tarefa.css'; 

function Tarefa() {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState({});
  const [nomePessoa, setNomePessoa] = useState('Carregando...');
  const navigate = useNavigate();


  useEffect(() => {
    async function carregarTarefa() {
      try {
        const response = await api.get(`/tarefas/${id}`);
        setTarefa(response.data);

        const nomePessoaResponse = await api.get(`/pessoas/${response.data.PessoaId}`);
        setNomePessoa(nomePessoaResponse.data.nome);
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error);
      }
    }

    carregarTarefa();
  }, [id]);
  const handleRemoverTarefa = async () => {
    try {
      await api.delete(`/tarefas/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };

  return (
    <div className="tarefa-container">
      <h1>Tarefa: {tarefa.descricao}</h1>
      <p>Prioridade: {tarefa.prioridade}</p>
      <p>Estado: {tarefa.estado}</p>
      <p>Pessoa Associada: {nomePessoa}</p>
      <div className="tarefa-buttons">
        <Link to={`/editar-tarefa/${id}`}>
          <button>Editar Tarefa</button>
        </Link>
        <button onClick={handleRemoverTarefa}>Remover Tarefa</button>
      </div>
    </div>
  );
}

export default Tarefa;
