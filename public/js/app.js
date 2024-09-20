document.addEventListener('DOMContentLoaded',()=>{

    function atualizarFila() {
        fetch('/fila')
          .then(response => response.json())
          .then(senhasPendentes => {
            const listafila = document.getElementById('fila');
            listafila.innerHTML = ''; 
    
            senhasPendentes.forEach(senha => {
              const item = document.createElement('li');
              item.innerText = `Senha ${senha.numero}`;
              listafila.appendChild(item);
            });
          });
      }
    
      document.getElementById("gerarSenha").addEventListener('click', ()=> {
        fetch('/gerarSenha')
          .then(response => response.text())
          .then(data => {
            document.getElementById('gerada').innerText = data;
            atualizarFila(); 
          });
      });
    
      document.getElementById("chamarSenha").addEventListener('click', ()=> {
        fetch('/chamarSenha')
          .then(response => response.text())
          .then(data => {
            document.getElementById('chamada').innerText = data;
            atualizarFila(); 
          });
      });
    
      window.onload = function() {
        atualizarFila();
      };
})
