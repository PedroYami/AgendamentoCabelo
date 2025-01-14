import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HorariosDisponiveis = () => {

  const navigate = useNavigate();
  
  const horariosManha = [
    '8H', '9H', '10H', '11H', '12H',
  ];

  const horariosTarde = [
    '13H', '14H', '15H', '16H', '17H',
  ];

  const handleBack = () => {
    navigate('/home'); // Altere para a rota da página de login
  };

  return (
    <div className="container-fluid bg-dark text-light vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Botão de Voltar */}
      <div className="position-absolute top-0 start-0 p-3">
        <button className="btn btn-outline-light" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>

      {/* Título */}
      <h1 className="mb-4 text-center">HORÁRIOS DISPONÍVEIS</h1>

      <div className="d-flex justify-content-center align-items-start gap-4">
        {/* Coluna da Manhã */}
        <div className="d-flex flex-column gap-2">
          {horariosManha.map((horario, index) => (
            <button
              key={index}
              className="btn btn-outline-light"
              style={{
                width: '120px',
                height: '40px',
              }}
            >
              {horario}
            </button>
          ))}
        </div>

        {/* Coluna da Tarde */}
        <div className="d-flex flex-column gap-2">
          {horariosTarde.map((horario, index) => (
            <button
              key={index}
              className="btn btn-outline-light"
              style={{
                width: '120px',
                height: '40px',
              }}
            >
              {horario}
            </button>
          ))}
        </div>

        {/* Coluna de Ações */}
        <div className="d-flex flex-column gap-3">
          <button
            className="btn btn-dark text-white border-light"
            style={{
              width: '150px',
              height: '80px',
              borderRadius: '10px',
            }}
          >
            CONFIRMAR HORÁRIO
          </button>
          <button
            className="btn btn-dark text-white border-light"
            style={{
              width: '150px',
              height: '80px',
              borderRadius: '10px',
            }}
          >
            LISTA DE ESPERA
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorariosDisponiveis;
