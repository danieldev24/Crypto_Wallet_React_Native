import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";

import { MainLayout } from "./";
import { HeaderBar } from "../components";
import { FONTS, COLORS, SIZES, icons, dummyData } from "../constants";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}
    >
      <Text
        style={{
          color: COLORS.lightGray3,
          ...FONTS.h4,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginLeft: SIZES.radius,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}
          >
            {value}
          </Text>

          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>

        <Switch
          trackColor={{ true: COLORS.lightGreen, false: COLORS.white }}
          value={value}
          onValueChange={(value) => onPress(value)}
        />
      </View>
    );
  }
};

const Profile = () => {
  const [faceID, setFaceID] = React.useState(true);
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Header */}
        <HeaderBar title="Profile" />

        {/* Detail */}
        <ScrollView>
          {/* Email & user id */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                {dummyData.profile.email}
              </Text>

              <Text
                style={{
                  color: COLORS.lightGray3,
                  ...FONTS.body4,
                }}
              >
                ID: {dummyData.profile.id}
              </Text>
            </View>
            {/* status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.verified}
                style={{
                  width: 25,
                  height: 25,
                }}
              />

              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}
              >
                {" "}
                Verified
              </Text>
            </View>
          </View>

          {/* App */}

          <SectionTitle title="APP" />

          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log("Click")}
          />

          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log("Click")}
          />

          {/* Account */}
          <SectionTitle title="ACCOUNT" />

          <Setting
            title="Payment Curenncy"
            value="USD"
            type="button"
            onPress={() => console.log("Click")}
          />

          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log("Click")}
          />

          {/* Security */}
          <SectionTitle title="SECURITY" />

          <Setting
            title="FaceID"
            value={faceID}
            type="switch"
            onPress={(value) => setFaceID(value)}
          />
          <Setting
            title="Password Setting"
            value=""
            type="button"
            onPress={() => console.log("Click")}
          />
          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log("Click")}
          />
          <Setting
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log("Click")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
