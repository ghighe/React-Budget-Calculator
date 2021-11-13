/* eslint-disable no-unused-vars */
import {useState,useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';
//initialExpenses without localstorage
// const initialExpenses = [

// {id:uuidv4(),charge:"rent",amount:4000},
// {id:uuidv4(),charge:"car payment",amount:1000},
// {id:uuidv4(),charge:"light payment",amount:250},
// {id:uuidv4(),charge:"gas payment",amount:100}
// ];
//initialExpenses with localstorage usage
const initialExpenses = localStorage.getItem('expenses') ?
JSON.parse(localStorage.getItem('expenses')) : []

function App() {
  // ******************* state values ***************
  // all expenses, add expenses state
  const [expenses, setExpenses] = useState(initialExpenses);
// single expenses state
  const [paymentName, setPaymentName] = useState('');
//single amount state
  const [amount, setAmount] = useState('');
//alert state
  const [alert, setAlert] = useState({show:false});
//edit state
  const [edit, setEdit] = useState(false);
//edit item state
  const [id, setId] = useState(0);
  //********** useEffect */
  useEffect(() => {
    console.log('we called useEffect');
    localStorage.setItem('expenses',JSON.stringify(expenses));
  },[expenses]);
  //********** functionality */

  //handlePayment
  const handlePaymentName = event => {
    setPaymentName(event.target.value);
  }
  //handleAmount
  const handleAmount = event => {
    setAmount(event.target.value);
  }
//handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if(paymentName !== '' && amount > 0){
      if(edit){
      let editExpenses = expenses.map(item => {
        return item.id === id ? {...item, charge:paymentName, amount } :item; //use spread operator in case that we want to update a certain object
      });
      setExpenses(editExpenses);
      setEdit(false);
      handleAlert({type:'success', text:"item edited"});
      }else {
        //if we are not editing run below piece of code
        const singlePayment = {id: uuidv4(), charge:paymentName, amount}
        setExpenses([...expenses, singlePayment]); //we need to keep track of the old object and we use ... to get a copy of the old object
        handleAlert({type:'success', text:"item added"});
      }
      setPaymentName('');
      setAmount('');
    }else {
      handleAlert({
        type:`danger`,
        text:`payment Name or amount cannot be empty`
      })
    }
  }
//clear all items
const clearItems = () => {
  setExpenses([]);
  handleAlert({type:'danger', text: 'all items deleted'});
};
//handle delete
const handleDelete = id => {
  let tempExpenses = expenses.filter(item => item.id !== id);
  setExpenses(tempExpenses);
  handleAlert({type:'danger', text: 'item deleted'});
};
//handle edit
const handleEdit = id => {
  let expense = expenses.find((item) => item.id === id);
  let {charge, amount} = expense;
  setPaymentName(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
};

//handle Alert
const handleAlert = ({type,text}) => {
  setAlert({show:true,type,text});
  setTimeout(() => {
    setAlert({show:false});
  },1500)
}

  return (
 <>
  {alert.show && <Alert type={alert.type} text={alert.text} />}
  <Alert />
  <h1>budget calculator</h1>
  <main className="App">
    <ExpenseForm
    paymentName={paymentName}
    amount={amount}
    handlePaymentName={handlePaymentName}
    handleAmount={handleAmount}
    handleSubmit={handleSubmit}
    edit={edit}
    />
    <ExpenseList
    expenses={expenses}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
    clearItems={clearItems}
    />
  </main>
  <h1>total spending:{" "} <span className="total">
  {expenses.reduce((acc, curr) => {
    return (acc += parseInt(curr.amount));
  },0)} lei
  </span></h1>
  </>
  );
}

export default App;
