import React,{useState,useEffect} from "react";
import Expenses from "./components/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
let DUMMY_EXPENSE =[
    
];

function App(){
const[expenses,setExpenses]=useState(DUMMY_EXPENSE);
//fetch api get request puted in a funtion
function fetchData(){
    fetch('http://192.168.88.195/poetryapis/expense.php').then(
    response=>{
        return response.json();
    }
).then(
    data=>{
        setExpenses(data);
        }
);

}

//here we use that func
useEffect(()=>{
    fetchData();
},[]);


const addExpenseHandler=(expense)=>{//new data comes in expense
    
    //we create a form for sending data in database 
    const formData = new FormData();
    formData.append('title',expense.title);
    //'title' keyword must match with database column name
    formData.append('amount',expense.amount);
    //'amount' keyword must match with database column name
    formData.append('date', expense.date);
    //'date' keyword must match with database column name

fetch('http://192.168.88.195/poetryapis/expensepost.php',{
    method:'POST',
    body:formData
}).then(
    response=>{
        fetchData();
    }
);

 
};

    return (
            <div>
               <NewExpense onAddExpense={addExpenseHandler}/>
               <Expenses item={expenses}/>
               
               
            </div> 
    );
}
export default App;