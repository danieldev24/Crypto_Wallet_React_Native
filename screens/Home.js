import React from "react";
import { View, Text } from "react-native";

import { MainLayout } from "./";

import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketAction";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants";
import { BalanceInfo, IconTextButton ,Chart} from "../components";

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  useFocusEffect(
    React.useCallback(() => {
      getHoldings(dummyData.holdings);
      getCoinMarket();
    }, [])
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.base,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* Balance */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: 10,
          }}
        />

        {/* Buttons */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight : SIZES.radius
            }}
            onPress={() => console.log("Transfer click")}
          />

          <IconTextButton
            label="Wthdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40
            }}
            onPress={() => console.log("Withdraw click")}
          />
        </View>
      </View>
    );
  }
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header */}
        {renderWalletInfoSection()}

        {/* Chart */}

        <Chart
          containerStyle={{
            marginTop: SIZES.padding*2
          }}
          chartPrice = {coins[0]?.sparkline_in_7d?.price}
        />

      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.holdings,
    coins: state.marketReducer.coins,
  };
}

function mapDispathToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkLine,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkLine,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkLine,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkLine,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispathToProps)(Home);
