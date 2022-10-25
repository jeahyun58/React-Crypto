import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  padding: 0px 30px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 15px;
  }
  &:hover {
    a {
      color: ${(pr) => pr.theme.accentColor};
      transition: color 0.3s ease-in;
    }
  }
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  margin-right: 10px;
  width: 35px;
  height: 35px;
`;

interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinProps {}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((current) => !current);
  };
  const { isLoading, data } = useQuery<Icoin[]>(["allcoins"], fetchCoins);
  /* const [coins, setCoins] = useState<Icoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); */
  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ConinsList>
          {data?.slice(0, 100).map((x) => (
            <Coin key={x.id}>
              <Link to={x.id} state={x.name}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${x.symbol.toLowerCase()}`}
                />
                {x.name} &rarr; 💰{" "}
              </Link>
            </Coin>
          ))}
        </ConinsList>
      )}
    </Container>
  );
}

export default Coins;
