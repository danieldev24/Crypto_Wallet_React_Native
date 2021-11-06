import React from "react";
import { View, Text } from "react-native";

import { MainLayout } from "./";

import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import {useFocusEffect} from "@react-navigation/native";
import { COLORS,FONTS,SIZES ,icons,dummyData} from "../constants";

const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  useFocusEffect(
    React.useCallback(() => {
        getHoldings(dummyData.holdings)
        getCoinMarket()
    },[])
  )
  return (
    <MainLayout>
      <View>
        <Text>Home</Text>
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings : state.marketReducer.myHoldings,
    coins : state.marketReducer.coins
  };
}

function mapDispathToProps(dispatch) {
  return {
    getHoldings : (holdings,currency,coinList,orderBy,
      sparkLine,priceChangePerc,perPage,page) => {
        return dispatch(getHoldings(holdings,currency,coinList,orderBy,
          sparkLine,priceChangePerc,perPage,page
        ))
      },
    getCoinMarket : (currency,coinList,orderBy,
      sparkLine,priceChangePerc,perPage,page) => {
        return dispatch(getCoinMarket(currency,coinList,orderBy,
          sparkLine,priceChangePerc,perPage,page))
      }
  };
}

export default connect(mapStateToProps, mapDispathToProps)(Home);
