import { Container } from './style';
import entradaImg from '../../assets/entradas.svg';
import saidaImg from '../../assets/saidas.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hook/useTransactions';

export function Summary() {
  const { transactions } = useTransactions();

  // eslint-disable-next-line max-len

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }
    return acc;
  }, {
    deposits: 0,
    withdraw: 0,
    total: 0,
  });

  return (
    <Container>
      <div>
        <header>
          <p>entrada</p>
          <img src={entradaImg} alt="simbolo Entrada" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>saidas</p>
          <img src={saidaImg} alt="simbolo saida" />
        </header>
        <strong>
          {' '}
          {new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdraw)}
        </strong>
      </div>

      <div className="total">
        <header>
          <p>total</p>
          <img src={totalImg} alt="simbolo total" />
        </header>
        <strong>
          {' '}
          {new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
