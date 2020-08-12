import React, { useContext, useState } from 'react';
import { TransactionContext } from './transContext';

function Child() {
    let { transactions, addTransaction,deleteTransaction,updateTransaction,
    clearTransaction }
     = useContext(TransactionContext);
    let [newDesc, setDesc] = useState("");
    let [newAmount, setAmount] = useState(0);
    let [cancel,setCancel]=useState(-1);
    const handleAddition = (event) => {
        event.preventDefault();
        addTransaction({ 
            amount: Number(newAmount),
            desc: newDesc
        });
        setDesc('');
        setAmount(0);
    }
    const handleUpdate=(props,event)=> {

        updateTransaction({
            id:props,
            amount:Number(newAmount),
            desc:newDesc,
        });
    }
    const handleCancel=()=> {
        deleteTransaction({
            id:cancel
        });
        setCancel(-1);
    }
    const handleClear=()=> {
        clearTransaction();
    }
    const getExpense = () => {
        let expense = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount < 0)
                expense += transactions[i].amount;
        }
        return expense;
    }
    const getIncome = () => {
        let income = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0)
                income += transactions[i].amount;
        }
        return income;
    }
    return (
        <div className="container">
            <h1>Expense Tracker</h1>

            <h3>Your Balance <br /> {getIncome() + getExpense()}</h3>
            <div className="expense-container">
                <h3>INCOME <br />{getIncome()}</h3>
                <h3>EXPENSE <br />{getExpense()}</h3>
            </div>
            <h3>History</h3>
            <span id="clr" style={{float:"right"}} onClick={handleClear}>Clear</span>
            <hr style={{clear:"right"}} />
            <ul className="transaction-list">
                {transactions.map((transObj, ind) => {
                    if(transObj.id===cancel) {
                        handleCancel();
                        return null;
                    }
                    else {
                        return (
                            <li key={ind}>
                                <span onClick={()=>{
                                    setCancel(transObj.id);
                               }}
                                    className="x">x</span>
                                <span onClick={handleUpdate.bind(this,transObj.id)}>
                                    {transObj.desc}</span>
                                <span>{transObj.amount}</span>
                            </li>
                        )
                    }
                    
                })}

            </ul>
            <h3>Add new transaction</h3>
            <p>To update,click on any transaction above after input to update transaction</p>
            <hr />

            <form className="transaction-form" onSubmit={handleAddition}>
                <label>
                    Enter description <br />
                    <input type="text" value={newDesc} placeholder="Description" onChange={(ev) => setDesc(ev.target.value)} required />
                </label>
                <br />
                <label>
                    Enter amount <br />
                    <input type="number" value={newAmount} placeholder="Amount" onChange={(ev) => setAmount(ev.target.value)} required />
                </label>
                <br />
                <input type="submit" value="Add transaction" />
            </form>
        </div>
    )
}
export default Child