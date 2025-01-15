import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios'

const BookSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [client, setClient] = useState({ username: '', telefone: ''});

  const handleBook = async () => {
    
    const schedule = location.state.schedule;
    try {
      const response = await Axios.post('http://localhost:3001/schedules/book', {
        userId: userId, // Substitua pelo ID do cliente salvo (adicione lógica para criar o cliente antes)
        time: schedule.time,
      });

      alert('Horário marcado com sucesso!');
      navigate(`/scheduleList/${userId}`);
    } catch (error) {
      if (error.response.status === 400) {
        alert('Horário já ocupado. Adicionando à fila de espera...');
        navigate(`/waitlist/${userId}`, { state: { schedule }});
      } else {
        console.error(error);
        alert('Erro ao marcar horário.');
      }
    }
  };

  return (
    <div>
      <h2>Marcar Horário</h2>
      <div className="form-group mb-3">
        <label>Nome</label>
        <input
          type="text"
          className="form-control"
          value={client.username}
          onChange={(e) => setClient({ ...client, username: e.target.value })}
        />
      </div>
      <div className="form-group mb-3">
        <label>Telefone</label>
        <input
          type="email"
          className="form-control"
          value={client.telefone}
          onChange={(e) => setClient({ ...client, telefone: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleBook}>
        Confirmar Horário
      </button>
    </div>
  );
};

export default BookSchedule;
