import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/${userId}`)
      .then((response) => setUsername(response.data.username))
      .catch((error) => console.error(error));
  }, [userId]);

  useEffect(() => {
    Axios.get('http://localhost:3001/schedules')
      .then((response) => setSchedules(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDelete = (scheduleId) => {
    if (window.confirm('Você tem certeza que deseja excluir este horário?')) {
      Axios.delete(`http://localhost:3001/schedules/${scheduleId}`)
        .then(() => {
          setSchedules((prev) => prev.filter((schedule) => schedule.id !== scheduleId));
          alert('Horário excluído com sucesso.');
        })
        .catch((error) => {
          console.error(error);
          alert('Erro ao excluir o horário.');
        });
    }
  };

  const availableSchedules = schedules.filter((schedule) => !schedule.user);
  const reservedSchedules = schedules.filter((schedule) => schedule.user);
  
  const schedulesWithWaitlist = availableSchedules.map((schedule) => {
    const isDuplicated = reservedSchedules.some(
      (reserved) => reserved.time === schedule.time
    );
  
    if (isDuplicated) {
      return {
        ...schedule,
        status: 'Fila de Espera',
      };
    }
    return schedule;
  });
  
  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          style={{ fontSize: '14px', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Horários Disponíveis</h2>
      <div className="row">
        {schedulesWithWaitlist.map((schedule) => (
          <div className="col-6 col-sm-4 col-md-3 mb-3" key={schedule.id}>
            <div
              className="card bg-dark text-white"
              style={{
                cursor: 'pointer',
                width: '250px',
                height: '100px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                border: '1px solid #444',
                borderRadius: '8px',
                marginLeft: '100px'
              }}
              onClick={() =>
                navigate(`/book/${userId}`, { state: { schedule } })
              }
            >
              <div className="card-body text-center p-2">
                <h6 style={{ margin: 0 }}>{schedule.time}</h6>
                <p style={{ fontSize: '12px', margin: 0 }}>
                  {schedule.status ? schedule.status : 'Disponível'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Horários Marcados</h2>
      <div className="row">
        {reservedSchedules.map((schedule) => (
          <div className="col-6 col-sm-4 col-md-3 mb-3" key={schedule.id}>
            <div
              className="card bg-secondary text-white"
              style={{
                height: '100px',
                width: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #444',
                borderRadius: '8px',
                marginLeft: '100px'
              }}
            >
              <div className="card-body text-center p-2">
                <h6 style={{ margin: 0 }}>{schedule.time}</h6>
                <p style={{ fontSize: '12px', margin: 0 }}>
                  Reservado por {schedule.user.username}
                </p>
                {username === 'admin' && (
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className="btn btn-danger btn-sm mt-2"
                    style={{ fontSize: '12px', padding: '4px 8px' }}
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
}
  

export default ScheduleList;
