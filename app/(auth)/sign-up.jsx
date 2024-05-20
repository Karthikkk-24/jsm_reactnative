import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { images } from "../../constants";

import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async() => {
    if (!form.username || !form.email || !form.password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
    }

    setIsSubmitting(true);
    try {
        const result = await createUser(form.email, form.password, form.username);
        router.replace('/home');
    } catch (error) {
        console.log(error);
        // Alert.alert("Error", "Failed to create account");
        Alert.alert("Error", error.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] mb-3"
          />
          <Text className="text-xl text-white font-semibold">
            Sign Up To Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7 mb-7"
          />
          <CustomButton
            title="Sign Up"
            isLoading={isSubmitting}
            handlePress={submit}
          />

          <View className="flex-row items-center justify-center mt-7">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg text-secondary font-psemibold ml-1"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
