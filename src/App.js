import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState();
  const [selectedCoin, setSelectedCoin] = useState(null); // 선택된 코인 정보를 저장하는 상태

  const onChange = (event) => setMoney(event.target.value);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onSelectChange = (event) => {
    const selectedCoinId = event.target.value; // 선택된 코인의 ID
    const selectedCoinInfo = coins.find((coin) => coin.id === selectedCoinId); // 선택된 코인 정보
    setSelectedCoin(selectedCoinInfo); // 선택된 코인 정보를 상태로 저장
  };

  const calcAmount = () => {
    if (selectedCoin && money) {
      const priceUSD = selectedCoin.quotes.USD.price;
      const canAmount = parseFloat(money) / priceUSD;
      return canAmount.toFixed(2); // 살 수 있는 양을 소수점 두 자리까지 표시
    }
    setToDo("");
    setToDos((currentArray) => [toDo, ...currentArray]);
  };
  console.log(toDos);
  return (
    <div>
      <h1>my To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="write your to do"
        />
        <button>Add To Do</button>
      </form>
    </div>
  );
}

export default App;
