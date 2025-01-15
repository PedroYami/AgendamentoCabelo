import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  
  const { userId } = useParams();

  useEffect(() => {
    Axios
      .get(`http://localhost:3001/users/${userId}`)
      .then((response) => setUsername(response.data.username))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    Axios
      .get('http://localhost:3001/schedules')
      .then((response) => setSchedules(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  const handleDelete = (scheduleId) => {
    // Confirmação antes da exclusão
    if (window.confirm('Você tem certeza que deseja excluir este horário?')) {
      Axios
        .delete(`http://localhost:3001/schedules/${scheduleId}`)
        .then(() => {
          // Atualiza a lista de horários após a exclusão
          setSchedules((prev) => prev.filter((schedule) => schedule.id !== scheduleId));
          alert('Horário excluído com sucesso.');
        })
        .catch((error) => {
          console.error(error);
          alert('Erro ao excluir o horário.');
        });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button 
          onClick={handleLogout} 
          className="btn btn-danger"
          style={{ fontSize: '14px', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      <h2 style={{display: "flex", justifyContent: "center"}}>Horários Disponíveis</h2>
      <div className="row">
        {schedules.map((schedule) => (
          <div className="col-md-3 mb-3" key={schedule.id}>
            <div
              className={`card ${
                schedule.user ? 'bg-secondary text-white' : 'bg-light'
              }`}
              style={{ cursor: schedule.user ? 'not-allowed' : 'pointer' }}
              onClick={() =>
                !schedule.user && navigate(`/book/${userId}`, { state: { schedule }})
              }
            >
              <div className="card-body text-center">
                <h5>{schedule.time}</h5>
                <p>
                  {schedule.user
                    ? `Reservado por ${schedule.user.username}`
                    : 'Disponível'}
                </p>
                {username === 'admin' && schedule.user && (
                  <button 
                    onClick={() => handleDelete(schedule.id)} 
                    className="btn btn-danger btn-sm mt-2"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
