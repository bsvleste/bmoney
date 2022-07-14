/* eslint-disable no-unused-vars */
import {
  createContext, useEffect, useState, ReactNode, useContext,
} from 'react';
import { api } from '../services/api';

interface Transaction{
  id:number,
  title:string,
  amount:number,
  type:string,
  category:string,
  createAt:string,
}
interface TransactionProviderProps{
  children:ReactNode
}
type TransactionInput = Omit<Transaction, 'id' | 'createAt'>;

interface TransactionContextData{
   [x: string]: any;
   transactions:Transaction[];
   createTransaction:(transaction:TransactionInput)=>Promise<void>
 }
const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData,
);

export function TransactionsProvider({ children }:TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    api.get('transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput:TransactionInput) {
    const resp = await api.post('/transactions', {
      ...transactionInput,
      createAt: new Date(),
    });
    const { transaction } = resp.data;
    setTransactions([...transactions, transaction]);
  }
  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  return context;
}
