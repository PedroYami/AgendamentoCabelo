import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate('/schedule'); // Altere para a rota desejada
  };

  const handleLogout = () => {
    navigate('/login'); // Altere para a rota da página de login
  };

  return (
    <div className="container text-center mt-5">
      {/* Ícone de Logout */}
      <div className="position-absolute top-0 start-0 p-3">
        <button
          className="btn btn-outline-dark"
          onClick={handleLogout}
          style={{
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <i className="bi bi-box-arrow-left" style={{ fontSize: '1.2rem' }}></i>
        </button>
      </div>

      <h1 className="mb-4">NOSSOS SERVIÇOS</h1>
      <div className="row justify-content-center gap-3">
        {/* Serviço 1 */}
        <div
          className="col-md-4 mb-3"
          style={{
            border: '1px solid black',
            borderRadius: '10px',
            paddingTop: '10px',
          }}
        >
          <div className="card mb-4">
            <img
              src="https://img.freepik.com/fotos-gratis/cliente-fazendo-o-corte-de-cabelo-em-um-salao-de-barbearia_1303-20861.jpg" // Substitua pela imagem correta
              className="card-img-top"
              alt="Corte Cabelo"
            />
            <div className="card-body">
              <h5 className="card-title">CORTE CABELO</h5>
              <p className="card-text">R$25</p>
            </div>
          </div>
        </div>

        {/* Serviço 2 */}
        <div
          className="col-md-4 mb-3"
          style={{
            border: '1px solid black',
            borderRadius: '10px',
            paddingTop: '10px',
          }}
        >
          <div className="card mb-4">
            <img
              src="https://img.freepik.com/fotos-gratis/homem-em-um-salao-de-barbearia-fazendo-o-corte-de-cabelo-e-barba_1303-20962.jpg" // Substitua pela imagem correta
              className="card-img-top"
              alt="Barba"
            />
            <div className="card-body">
              <h5 className="card-title">BARBA</h5>
              <p className="card-text">R$15</p>
            </div>
          </div>
        </div>

        {/* Redirecionamento */}
        <div
          className="col-md-4 mb-3"
          style={{
            border: '1px solid black',
            borderRadius: '10px',
            backgroundColor: 'black',
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center bg-black text-white"
            style={{
              height: '100%',
              minHeight: '200px',
              cursor: 'pointer',
            }}
            onClick={handleRedirection}
          >
            <div>
              <h5>MARCAR HORÁRIO</h5>
              <i
                className="bi bi-arrow-down"
                style={{ fontSize: '2rem', color: 'gray' }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
