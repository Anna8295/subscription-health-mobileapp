import React, {useEffect, useState} from "react";
import { Platform } from "react-native";
import Purchases, { CustomerInfo, PurchasesOffering } from "react-native-purchases";

const APIkeys = {
    apple: "your_revenuecat_apple_api_key",
    google: "your_revenuecat_google_api_key"
}

function useRevenueCat() {
    const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
    const isProMember = customerInfo?.entitlements.active.pro;

    useEffect(() => {
        const fetchData = async () => {
            Purchases.setDebugLogsEnabled(true);

            if(Platform.OS == "android"){
                await Purchases.configure({apiKey: APIkeys.google});
            } else {
                await Purchases.configure({ apiKey: APIkeys.apple})
            }

            const offerings = await Purchases.getOfferings();
            const customerInfo = await Purchases.getCustomerInfo();

            setCurrentOffering(offerings.current);
            setCustomerInfo(customerInfo)
        };

        fetchData().catch(console.error)
    }, []);

    useEffect(() => {
        const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
            setCustomerInfo(purchaserInfo);
        }

        Purchases.addCustomerInfoUpdateListener(customerInfoUpdated)
    }, [])

    return { currentOffering, customerInfo, isProMember}
}

export default useRevenueCat;
