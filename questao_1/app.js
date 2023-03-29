// Adiciona um novo campo de vendedor
function addVendedor() {
  let repeater = document.getElementById('repeater');
  let newVendedor = document.createElement('div');
  newVendedor.innerHTML = `
    <label>E-mail:</label>
    <input type="text" name="email[]" placeholder="Digite o e-mail do vendedor">
    <label>Percentual</label>
    <input type="text" name="comissao[]" placeholder="Digite a porcentagem de comissão do vendedor">
    <button type="button" class="remove">Remover</button>
  `;
  repeater.appendChild(newVendedor);

  // Adiciona o evento de remoção ao botão "Remover"
  let removeBtn = newVendedor.querySelector('.remove');
  removeBtn.addEventListener('click', removeVendedor);
}

// Remove um campo de vendedor
function removeVendedor() {
  let vendedor = this.parentNode;
  let repeater = document.getElementById('repeater');
  repeater.removeChild(vendedor);
}

// Adiciona o evento de adição ao botão "Adicionar Vendedor"
let addBtn = document.getElementById('add');
addBtn.addEventListener('click', addVendedor);
