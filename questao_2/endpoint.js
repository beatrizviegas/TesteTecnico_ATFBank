const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/salvar', (req, res) => {
  // Extrai os dados do formulário enviado
  const { email, comissao } = req.body;

  // Validação dos dados
  let error = null;
  let totalComissao = 0;

  for (let i = 0; i < email.length; i++) {
    // Verifica se o email é válido
    if (!isValidEmail(email[i])) {
      error = 'Email inválido';
      break;
    }
    
    // Verifica se a comissão é um número válido entre 0 e 100
    const comissaoNumber = Number(comissao[i]);
    if (isNaN(comissaoNumber) || comissaoNumber < 0 || comissaoNumber > 100) {
      error = 'Porcentagem de comissão inválida';
      break;
    }
    
    totalComissao += comissaoNumber;
  }
  
  // Verifica se a soma das comissões é igual a 100
  if (error === null && totalComissao !== 100 ) {
    error = "A soma não é igual a 100% ou é superior";
  }

  // Código para salvar os dados no banco de dados
  if (error) {
    res.json({ success: false, error });
  } else {
    res.json({ success: true });
  }

});

function isValidEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  
  return regex.test(email);
}

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}/salvar`);
});