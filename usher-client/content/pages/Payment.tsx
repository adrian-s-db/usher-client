import { View, Text } from 'react-native'
import React from 'react'
import { Button, Center } from 'native-base'

const Payment = ({navigation}) => {
  return (
    <Center h={'full'} w={'full'}>
      <Text>Payment</Text>
      <Button
        colorScheme="primary"
        onPress={()=>{
          navigation.navigate('Confirmation')
        }}

      >
        Pay
      </Button>

    </Center>
  )
}

export default Payment