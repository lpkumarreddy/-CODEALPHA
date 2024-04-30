document.getElementById('expense-form').addEventListener('submit', function(e) {
      e.preventDefault();

      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
      const expenseList = document.getElementById('expense-list');

      const li = document.createElement('li');
      li.innerHTML = `${description} - $${amount} <button onclick="deleteExpense(this)">Delete</button>`;
      expenseList.appendChild(li);

      localStorage.setItem('expenses', JSON.stringify([...JSON.parse(localStorage.getItem('expenses') || '[]'), {
          description,
          amount
      }]));

      document.getElementById('description').value = '';
      document.getElementById('amount').value = '';
  });

  function deleteExpense(element) {
      const expenses = JSON.parse(localStorage.getItem('expenses'));
      const newExpenses = expenses.filter(expense => expense.description !== element.parentNode.firstChild.textContent.split(' - ')[0]);
      localStorage.setItem('expenses', JSON.stringify(newExpenses));
      element.parentNode.remove();
  }

  function loadExpenses() {
      const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      expenses.forEach(expense => {
          const li = document.createElement('li');
          li.innerHTML = `${expense.description} - $${expense.amount} <button onclick="deleteExpense(this)">Delete</button>`;
          document.getElementById('expense-list').appendChild(li);
      });
  }

  loadExpenses();