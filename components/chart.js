import React from "react";
import { View, Text } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import { COLORS, SIZES, FONTS } from "../constants";
import moment from "moment";

const Chart = ({ containerStyle, chartPrice }) => {
  //Points
  let startUnixTimeStamp = moment().subtract(7, "day").unix();

  let data = chartPrice
    ? chartPrice?.map((item, index) => {
        return {
          x: startUnixTimeStamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });

  console.log(data)
  console.log(points)

  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: "bezier",
          }}
        >
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />

          <ChartDot>
            <View
              style={{
                position: "absolute",
                left: -35,
                width: 80,
                alignItems: "center",
                backgroundColor: COLORS.transparentBlack,
              }}
            >
                <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white
                }}>

                  <View
                  style={{
                    width:15,
                    height:15,
                    borderRadius:10,
                    backgroundColor: COLORS.lightGreen
                  }}>

                  </View>

                </View>
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
