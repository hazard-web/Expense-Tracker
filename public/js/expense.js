window.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await axios.get('http://localhost:4000/addExpense');
        const expenses = response.data.allExpenses;
        expenses.forEach(expense => {
            addExpenseToList(expense);
        });
    } catch (error) {
        console.error(error);
    }
}

function addExpenseToList(expense) {
    const { description, amount, category } = expense;
    const liEle = document.getElementById('items');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(description + ' - $' + amount + ' - ' + category));

    // Delete button
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.className = 'btn btn-danger';
    btnDelete.addEventListener('click', () => {
        removeExpense(expense.id, li);
    });

    // Edit button
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.className = 'btn btn-primary';
    btnEdit.addEventListener('click', () => {
        editExpense(expense);
    });

    li.appendChild(btnDelete);
    li.appendChild(btnEdit);
    liEle.appendChild(li);
}

async function removeExpense(id, liElement) {
    try {
        await axios.delete(`http://localhost:4000/deleteExpense/${id}`);
        liElement.remove();
    } catch (error) {
        console.error(error);
    }
}

function editExpense(expense) {
    const { id, description, amount, category } = expense;
    document.getElementById('description').value = description;
    document.getElementById('amount').value = amount;
    document.getElementById('category').value = category;
 

    axios.delete('http://localhost:4000/deleteExpense/' + `${id}`)
        .then(response => console.log(response))
        .catch(err => console.log(err))



    liEle.removeChild(li);
}










