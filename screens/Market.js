import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from "react-native";
import { MainLayout } from "./";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getCoinMarket } from "../stores/market/marketAction";
import { COLORS, SIZES, FONTS, icons, constants } from "../constants";
import { HeaderBar, TextButton } from "../components";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: React.createRef(),
}));

const Tabs = () => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {/* Tab */}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
function renderTabBars() {
  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray,
      }}
    >
      <Tabs />
    </View>
  );
}

function renderButons() {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
      }}
    >
      <TextButton label="USD" />

      <TextButton
        label="% 7d"
        containerStyle={{
          marginLeft: SIZES.base,
        }}
      />

      <TextButton
        label="Top"
        containerStyle={{
          marginLeft: SIZES.base,
        }}
      />
    </View>
  );
}

const Market = ({ getCoinMarket, coins }) => {
  useFocusEffect(
    React.useCallback(() => {
      getCoinMarket();
    }, [])
  );
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header */}
        <HeaderBar title="Martket" />

        {/* Tab Bar */}
        {renderTabBars()}

        {/* Button */}
        {renderButons()}

        {/* List */}
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispathToProps(dispatch) {
  return {
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

export default connect(mapStateToProps, mapDispathToProps)(Market);
