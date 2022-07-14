/* eslint-disable react/jsx-no-bind */
import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './style';

import close from '../../assets/fechar.svg';
import imgIn from '../../assets/entradas.svg';
import imgOut from '../../assets/saidas.svg';
import { useTransactions } from '../../hook/useTransactions';

interface NewTransactionModalProps {
  isOpen:boolean,
  onRequestClose:()=>void
}
export function NewTransactionModal({ isOpen, onRequestClose }:NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');
  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(event:FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type,
    });
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }
  return (
    <Modal
      isOpen={isOpen}
    // eslint-disable-next-line react/jsx-no-bind
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={onRequestClose}
      >
        <img src={close} alt="close" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          placeholder="Titulo"
          value={title}
          onChange={(event) => { setTitle(event.target.value); }}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => { setAmount(Number(event.target.value)); }}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={imgIn} alt="entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >

            <img src={imgOut} alt="entrada" />
            <span>
              Saida
            </span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          value={category}
          onChange={(event) => { setCategory(event.target.value); }}
          placeholder="Categoria"
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
