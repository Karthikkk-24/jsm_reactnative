import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, ScrollViewText, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../components/CustomButton";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center justify-center min-h-[80vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="mt-2 max-w-[380px] w-full h-[300px]"
          />

          <View className="relative mt-7">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibility with{" "}
              <Text className="text-secondary-200 text-center">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="absolute w-[136px] h-[15px] absolute -bottom-2 -right-8"
            />
          </View>

          <Text className="text-sm font-pregular text-center mt-7 text-white">
            Where Creativity Meets Innovation: Embark On A Journey Of Limitless
            Exploration With Aora
          </Text>

          <CustomButton
            title="Continue With Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
