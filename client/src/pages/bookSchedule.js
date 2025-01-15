import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

const BookSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [client, setClient] = useState({ username: '', telefone: '' });

  const handleBook = async () => {
    const schedule = location.state.schedule;
    try {
      const response = await Axios.post('http://localhost:3001/schedules/book', {
        userId: userId,
        time: schedule.time,
      });

      alert('Horário marcado com sucesso!');
      navigate(`/scheduleList/${userId}`);
    } catch (error) {
      if (error.response.status === 400) {
        alert('Horário já ocupado. Adicionando à fila de espera...');
        navigate(`/waitlist/${userId}`, { state: { schedule } });
      } else {
        console.error(error);
        alert('Erro ao marcar horário.');
      }
    }
  };

  return (
    <div>
      <h2 style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>Marcar Horário</h2>
      

      <button
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
        style={{ display: 'flex', margin: '0 auto', marginBottom: '20px' }}
      >
        Voltar
      </button>
      
      <button className="btn btn-primary" onClick={handleBook} style={{ display: 'flex', margin: '0 auto' }}>
        Confirmar Horário
      </button>
    </div>
  );
};

export default BookSchedule;
