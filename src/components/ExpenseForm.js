/* eslint-disable no-unused-vars */
import React from 'react'
import {MdSend} from "react-icons/md"

const ExpenseForm = (
  {
    paymentName,
    amount,
    handlePaymentName,
    handleAmount,
    handleSubmit,
    edit
  }

) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="paymentName">paymentName</label>
          <input
          type="text"
          className="form-control"
          id="paymentName"
          name="paymentName"
          placeholder="insert the payment name"
          value={paymentName}
          onChange={handlePaymentName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
          type="number"
          className="form-control"
          id="amount"
          name="amount"
          placeholder="insert the amount"
          value={amount}
          onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? 'edit': 'submit'}
        <MdSend className="btn-icon" />
      </button>
    </form>

  )

}

export default ExpenseForm
