import React, { useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState({  classificacao: 0, comentario: '', nome: '', id: ''});
  const [feedbacks, setFeedbacks] = useState([]);
  const [backendURL, setBackendURL] = useState('https://1b8sxqhyy2.execute-api.us-east-1.amazonaws.com/dev');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({ ...prevFeedback, [name]: value }));
  };


  const handleURLChange = (event) => {
    setBackendURL(event.target.value);
  };

  const obterFeedbacks = async () => {

      const response = await axios.get(`${backendURL}/feedback`, {
        headers: {
          "x-api-key": "zRRrQIaXYX6d0K8u8v3ux9XRRIeL4HJT1sPjco5b"
      }
      });
      setFeedbacks(response.data); 
      
  } 

  
  const cadastrar = async () => {
    try {
        // Adjust the feedback object as per your backend requirements
        const feedbackData = {
            classificacao: parseInt(feedback.classificacao, 10), // Ensuring it's a number
            comentario: feedback.comentario,
            nome: feedback.nome,
            // Include 'id' only if required for the POST operation
            id: feedback.id 
        };

        // Log the feedback data for debugging
        console.log("Sending Feedback:", feedbackData);

        const response = await axios.post(`${backendURL}/feedback`, feedbackData, {
            headers: {
                "x-api-key": "zRRrQIaXYX6d0K8u8v3ux9XRRIeL4HJT1sPjco5b",
                "Content-Type": "application/json"
            }
        });

        console.log("Response Status:", response.status);

        if (response.status === 200 || response.status === 201) {
            setFeedbacks([...feedbacks, response.data]);
            setFeedback({ id: '', nome: '', classificacao: 0, comentario: '' });
        } else {
            console.error("Erro ao cadastrar o feedback", response.data);
        }
    }
    catch (error) {
        console.error("Erro ao conectar com o back-end", error);
        if (error.response) {
            // Log detailed response error
            console.error("Response Error:", error.response.data);
        }
    }
};

  const obterFeedback = async (id) => {
    try {
      const response = await axios.get(`${backendURL}/feedback/${id}`, {
        headers: {
          'x-api-key': 'zRRrQIaXYX6d0K8u8v3ux9XRRIeL4HJT1sPjco5b'
      }
      });
      console.log(response.status)
      if (response.status === 200) {
        console.log(response.data)
        setFeedback({ id: response.data.id, nome: response.data.nome, classificacao: response.data.classificacao, comentario: response.data.comentario });
        console.log(JSON.stringify(response.data))
      } else {
        console.error('Erro ao buscar feedbacks')
      }

    }
    catch (error) {
      console.error("Erro ao conectar com o back-end", error);
    }
  };

  return (
    <div className="App">
      <form>
        <input
          name="id"
          placeholder="ID"
          value={feedback.id}
          onChange={handleInputChange}
        />
        <input
          name="nome"
          placeholder="Nome"
          value={feedback.nome}
          onChange={handleInputChange}
        />
        <input
          name="classificacao"
          placeholder="classificacao"
          value={feedback.classificacao}
          onChange={handleInputChange}
        />
        <input
          name="comentario"
          placeholder="comentario"
          value={feedback.comentario}
          onChange={handleInputChange}
        />
        <button type="button" onClick={cadastrar}>Cadastrar</button>
        <button type="button" onClick={() => obterFeedback(feedback.id)}>Obter pelo id</button>
        <button type="button" onClick={() => obterFeedbacks()}>Obter todos</button>
      </form>
      <input
        className="backend-url-input"
        type="text"
        placeholder="URL do Backend"
        value={backendURL}
        onChange={handleURLChange}
      />
      <ul>
    {feedbacks.map(f => (
      <li key={f.id}>
        <div className="feedback-box">
          <div className="Nome">{f.nome}</div>
          <div className="Classificacao">{f.classificacao}</div>
          <div className="Comentario">{f.comentario}</div>
        </div>
      </li>
    ))}
</ul>

    </div>
  );
}

export default App;
