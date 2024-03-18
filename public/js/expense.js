const jwt = require('jwtwebtoken');
const { authenticate } = require('../../middleware/auth');
const { decode } = require('jsonwebtoken');
window.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData(req, res, next) {
    try {
        // Call the authentication middleware to verify the user's token
        authenticate(req, res, async () => {
            const token = req.header('Authorization');
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            try {
                // Get user ID from token
                const decoded = jwt.verify(token, 'secretkey');
                const userId = decoded.userId;

                // Use the user ID to fetch expenses
                const response = await axios.get('http://localhost:4000/addExpense', {
                    headers: {
                        Authorization: token
                    }
                });

                const expenses = response.data.allExpenses;
                expenses.forEach(expense => {
                    addExpenseToList(expense);
                });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: 'Unauthorized' });
            }
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
    btnDelete.textContent = 'Delete Expense';
    btnDelete.style.backgroundColor = 'blue';
    btnDelete.style.color = 'white';
    btnDelete.style.border = 'none';
    btnDelete.style.cursor = 'pointer';
    btnDelete.style.padding = '8px 16px';
    btnDelete.style.margin = '0 10px';
    btnDelete.style.fontSize = '14px';
    btnDelete.style.borderRadius = '4px';
    btnDelete.style.transition = 'background-color 0.3s, color 0.3s';
    btnDelete.className = 'btn btn-danger';
    btnDelete.addEventListener('click', () => {
        removeExpense(expense.id, li);
    });

    li.appendChild(btnDelete);
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








