import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Axios from 'axios'

const Waitlist = () => {
  const location = useLocation();
  const { userId } = useParams();

  const handleAddToWaitlist = async () => {
    try {
      const schedule = location.state.schedule;
      await Axios.post('http://localhost:3001/waitlist', {
        userId: userId,
        time: schedule.time,
      });

      alert('Adicionado à fila de espera com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar à fila de espera.');
    }
  };

  return (
    <div>
      <h2>Fila de Espera</h2>
      <p>O horário selecionado está ocupado. Deseja entrar na fila de espera?</p>
      <button className="btn btn-warning" onClick={handleAddToWaitlist}>
        Adicionar à Fila de Espera
      </button>
    </div>
  );
};

export default Waitlist;
