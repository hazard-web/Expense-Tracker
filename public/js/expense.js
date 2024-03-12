



  
window.addEventListener('DOMContentLoaded', () => {
    fetchData();
    
  });
  
  async function fetchData() {
     
   await axios.get('http://localhost:4000/addExpense')
      .then(responses => {
        console.log(responses);
        const expenses = responses.data.allExpenses;
        console.log(expenses[0])
        for (let i = 0; i < expenses.length; i++) {
          addExpenseToList(expenses[i]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  function addExpenseToList(expense) {
    const { description, amount, category } = expense;
  
    const liEle = document.getElementById('items');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(description));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode("$" + amount));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(category));
    li.appendChild(document.createTextNode(" "));
   
   
    // Delete button
    const btnn = document.createElement('button');
    btnn.className = "btn btn-danger";
    btnn.appendChild(document.createTextNode('Delete'));
    li.appendChild(btnn);
  
    li.appendChild(document.createTextNode(" "));
  
    // Edit button
    const edit = document.createElement('button');
    edit.className = "btn btn-primary";
    edit.appendChild(document.createTextNode('Edit'));
    li.appendChild(edit);
  
    liEle.appendChild(li);
  
    // Remove element function
    btnn.addEventListener('click', removeExpense);
  
    function removeExpense() {
  
     let id = expense.id;
    
      axios.delete('http://localhost:4000/expense/delete-expense/'+`${id}`)
       .then(response => console.log(response))
       .catch(err => console.log(err))
          liEle.removeChild(li);
    }
  
    edit.addEventListener('click', editExpense);
  
    function editExpense() {
  
        let id = expense.id;
        
      document.getElementById('description').value = description;
      document.getElementById('amount').value = amount;
      document.getElementById('category').value = category;
  
      axios.delete('http://localhost:4000/expense/delete-expense/'+`${id}`)
       .then(response => console.log(response))
       .catch(err => console.log(err))
  
  
     
      liEle.removeChild(li);
    }
  }
  
  
  
  
       
  
  
  
  
       