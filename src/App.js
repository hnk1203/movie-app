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
    return "0.00";
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input onChange={onChange} type="number" placeholder="소지한 달러" value={money} />
          <strong> $</strong>
          <select onChange={onSelectChange}>
            <option value="">코인 선택</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          {selectedCoin ? <h3>살 수 있는의 양 : {calcAmount()} {selectedCoin ? selectedCoin.symbol : ""}</h3> : ""}
        </div>
      )}
    </div>
  );
}

export default App;
