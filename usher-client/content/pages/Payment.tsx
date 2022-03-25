import * as React from "react";
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { useEffect } from "react";
import { Button, Text } from "native-base";
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../utils/Types/navTypes";
import { generateTicket } from "../../services/api/tickets";
import { UserContext } from "../../services/contexts/UserContext";
import fetchPaymentIntentClientSecret from "../../services/api/stripe";
type Props = NativeStackScreenProps<MainStackParamList, "Payment">;
type BillingDetails = {email: string}

const Payment = ({ navigation, route }: Props) => {

  const [card, setCard] = React.useState(false);

  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayPress = async () => {
    const billingDetails: BillingDetails = {
      email: 'testing@testing.com',
    };
    if(!card ) {
      return
    }
    const clientSecret = await fetchPaymentIntentClientSecret();
    console.log('client secret received', clientSecret)
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails,
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }

    return paymentIntent
  }
  const { showId, nSeats } = route.params;
  const { user } = React.useContext(UserContext);
  return (
      <View style={{width: '90%', flexDirection: 'column', alignItems: 'center'}}>
        <CardField
          postalCodeEnabled={false}
          placeholder={{number: '4242 4242 4242 4242',}}
          cardStyle={{backgroundColor: '#FFFFFF',textColor: '#000000',}}
          style={styles.card}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
            if (cardDetails.complete === true) setCard(true);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
        <Text color="light.50">Payment page for:</Text>
        <Text color="light.50">ShowId: {showId}</Text>
        <Text color="light.50">With {nSeats} number of seats:</Text>
        <Button
          alignSelf="center"
          width="50%"
          isDisabled={!card}
          colorScheme="primary"
          onPress={async () => {
            try{
              if (user) {
                const confirmedPayment = await handlePayPress();
                if (confirmedPayment) {
                  const show = await generateTicket(showId, nSeats);
                  if (show) {
                    navigation.navigate("Confirmation", {
                      event: show.event!.name,
                      date: show.date,
                      seats,
                    });
                  }
                }
              }
            } catch (e) {
              console.error(e)
            }
          }}
        >
          Pay 10€
        </Button>
      </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '90%',
    height: 50,
    marginVertical: 30,
  }
})