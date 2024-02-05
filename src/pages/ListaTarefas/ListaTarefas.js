import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './ListaTarefas.css'; 

function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [nomesPessoas, setNomesPessoas] = useState([]);

  const carregarTarefas = async () => {
    try {
      const response = await api.get('/tarefas');
      const tarefasOrdenadas = response.data.sort((a, b) => {
        const prioridades = { 'alta': 3, 'normal': 2, 'baixa': 1 };
        return prioridades[b.prioridade] - prioridades[a.prioridade];
      });
      setTarefas(tarefasOrdenadas);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  useEffect(() => {
    const buscarNomesPessoas = async () => {
      const nomes = await Promise.all(
        tarefas.map(async (tarefa) => {
          try {
            const response = await api.get(`/pessoas/${tarefa.PessoaId}`);
            return response.data.nome;
          } catch (error) {
            console.error(`Erro ao buscar pessoa ${tarefa.PessoaId}:`, error);
            return 'Nenhuma pessoa para essa tarefa';
          }
        })
      );
      setNomesPessoas(nomes);
    };

    buscarNomesPessoas();
  }, [tarefas]);

  return (
    <div className="lista-tarefas-container">
      <h1>Lista de Tarefas</h1>
      <div className="botoes-adicionar">
        <Link to="/adicionarTarefa">
          <button>Adicionar Tarefa</button>
        </Link>
        <Link to="/adicionarPessoa">
          <button>Adicionar Pessoa</button>
        </Link>
      </div>
      <ul className="lista-tarefas">
        {tarefas.map((tarefa, index) => (
          <li key={tarefa.id} className={`prioridade-${tarefa.prioridade}`}>
            <Link to={`/tarefas/${tarefa.id}`}>
              <strong>Tarefa:</strong> {tarefa.descricao} - 
              <strong> Prioridade:</strong> {tarefa.prioridade} - 
              <strong> Pessoa:</strong> {nomesPessoas[index]} - 
              <strong> Estado:</strong> {tarefa.estado}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTarefas;
