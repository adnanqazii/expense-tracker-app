import TransactionReducer from './transReducer'
import React, {createContext,useReducer}  from 'react'

const initialTransactions = [
    
]

export const TransactionContext = createContext(initialTransactions);
export const TransactionProvider = ({children }) => {
    let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);

    function addTransaction(transObj) {
        dispatch({
            type: "ADD",
            payload: {
                id:state.length,
                amount: transObj.amount,
                desc: transObj.desc
            }
        })
    }
    function deleteTransaction(transObj) {
        dispatch({
            type:"DELETE",
            payload: {
                id:transObj.id
            }
        })
    }
    function updateTransaction(trans) {
        dispatch({
            type:"UPDATE",
            payload:{
                id:trans.id,
                amount:trans.amount,
                desc:trans.desc,
            }
        })
    }
    function clearTransaction() {
        dispatch({
            type:"CLEAR",
        });
    }
    return (
        <TransactionContext.Provider value={{
            transactions: state,
            addTransaction,
            deleteTransaction,
            updateTransaction,
            clearTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}
