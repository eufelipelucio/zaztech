import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {  useParams , useNavigate} from 'react-router-dom';
import './EditarTarefa.css'; 

function EditarTarefa() {
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaPrioridade, setNovaPrioridade] = useState('');
  const [novoEstado, setNovoEstado] = useState('');
  const [novaPessoaId, setNovaPessoaId] = useState('');
  const [pessoasDisponiveis, setPessoasDisponiveis] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    async function carregarPessoas() {
      try {
        const response = await api.get('/pessoas');
        setPessoasDisponiveis(response.data);
      } catch (error) {
        console.error('Erro ao carregar pessoas:', error);
      }
    }

    carregarPessoas();
  }, []);

  useEffect(() => {
    async function carregarTarefa() {
      try {
        if (!id) {
          console.error('ID da tarefa não definido');
          return;
        }
        const response = await api.get(`/tarefas/${id}`);
        const { descricao, prioridade, estado, PessoaId } = response.data;

        setNovaDescricao(descricao);
        setNovaPrioridade(prioridade);
        setNovoEstado(estado);
        setNovaPessoaId(PessoaId ? PessoaId.toString() : ''); 

      } catch (error) {
        console.error('Erro ao carregar tarefa:', error);
      }
    }

    carregarTarefa();
  }, [id]);

  const handleEditarTarefa = async () => {
    try {
        await api.put(`/tarefas/${id}`, {
          descricao: novaDescricao,
          prioridade: novaPrioridade,
          estado: novoEstado,
          PessoaId: novaPessoaId,
        });
      navigate('/')
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  return (
    <div className="editar-tarefa-container">
      <label>
        Nova Descrição:
        <input
          type="text"
          value={novaDescricao}
          onChange={(e) => setNovaDescricao(e.target.value)}
        />
      </label>
      <label>
        Nova Prioridade:
        <select value={novaPrioridade} onChange={(e) => setNovaPrioridade(e.target.value)}>
          <option value="baixa">Baixa</option>
          <option value="normal">Normal</option>
          <option value="alta">Alta</option>
        </select>
      </label>

      <label>
        Novo Estado:
        <select value={novoEstado} onChange={(e) => setNovoEstado(e.target.value)}>
          <option value="Pendente">Pendente</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Concluída">Concluída</option>
        </select>
      </label>
      <label>
        Nova Pessoa:
        <select value={novaPessoaId} onChange={(e) => setNovaPessoaId(e.target.value)}>
          <option value="">Selecione...</option>
          {pessoasDisponiveis.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleEditarTarefa}>Editar Tarefa</button>
    </div>
  );
}

export default EditarTarefa;
