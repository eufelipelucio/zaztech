import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import ListaTarefas from '../pages/ListaTarefas/ListaTarefas';
import AdicionarTarefa from '../pages/AdicionarTarefa/AdicionarTarefa';
import EditarTarefa from '../pages/EditarTarefa/EditarTarefa';
import Tarefa from '../pages/Tarefa/Tarefa';
import AdicionarPessoa from '../pages/AdicionarPessoa/AdicionarPessoa';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={ListaTarefas} />
        <Route path="/adicionarTarefa" Component={AdicionarTarefa} />
        <Route path="/adicionarPessoa" Component={AdicionarPessoa} />
        <Route path="/editar-tarefa/:id" Component={EditarTarefa} />
        <Route path="/tarefas/:id" Component={Tarefa} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
