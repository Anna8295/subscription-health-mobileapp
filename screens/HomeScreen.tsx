import React from 'react'
import { SafeAreaView, Text, Image, TouchableOpacity, ScrollView, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ActionRow from '../components/ActionRow'
import {logo} from '../assets/index'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import useRevenueCat from '../hooks/useRevenueCat';

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Paywall'
>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {isProMember} = useRevenueCat();

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Paywall')}
          className="absolute z-50 top-5 right-10 items-center"
        >
          <Ionicons name="person-circle" size={30} color="#F35B04" />
          <Text className="text-center text-[#F35B04]">{isProMember ? "PRO" : "UPGRADE"}</Text>
        </TouchableOpacity>  

        <Image
          source={logo}
          resizeMode = 'contain'
          className="w-full h-64"
        />

        <View className="mx-5">
          <View className="flex-row justify-between space-x-2">
            <ActionRow 
              title="Track Calories"
              screen="Demo"
              color="#F35B04"
              icon="calculator"
              vertical
            />
            <ActionRow 
              title="Browse Recipes"
              screen="Demo"
              color="#3D348B"
              icon="library"
              vertical
            />
          </View>
            <ActionRow 
              title="Connect with Friends"
              screen="Demo"
              color="#7678ED"
              icon="share-social"
            />
            <ActionRow 
              title="Create a Meal"
              screen="Demo"
              color="#B79877"
              icon="restaurant"
              requiresPro
            />
            <ActionRow 
              title="Add a Recipe"
              screen="Demo"
              color="#F7B801"
              icon="add-circle"
              requiresPro
            />
            <ActionRow 
              title="Join Challenges"
              screen="Demo"
              color="#F47E03"
              icon="trophy"
              requiresPro
            />
        </View>  
      </ScrollView>
    </SafeAreaView>
  )
}