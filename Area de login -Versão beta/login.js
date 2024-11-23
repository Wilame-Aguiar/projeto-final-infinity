document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    
    form.addEventListener('submit', async function (e) {
      e.preventDefault();  // Evita o envio padrão do formulário
  
      const usuario = document.getElementById('usuario').value;  // Alterado de 'email' para 'usuario'
      const senha = document.getElementById('senha').value;
  
      // Cria o corpo da requisição
      const data = { usuario, senha };
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        // Se a resposta for bem-sucedida
        if (response.ok) {
          const result = await response.json();
          console.log('Login bem-sucedido:', result);
          
          // Armazenar o token no localStorage
          localStorage.setItem('token', result.token);
          
          // Redireciona o usuário para o dashboard ou página protegida
          window.location.href = '/dashboard.html';  // Alterar conforme necessário
        } else {
          const error = await response.json();
          console.log('Erro no login:', error.msg);
          alert(error.msg);  // Exibe o erro no login
        }
      } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao tentar fazer login. Tente novamente.');
      }
    });
  });
  