"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import CheckoutHeader from "./checkout-components/header";
import TicketInfo from "./checkout-components/ticket-info";
import CustomerInfo from "./checkout-components/customer-info";
import { ClientBookingCreateBody, contractBookingDTO } from "@/types/booking";
import CheckPay from "./checkout-components/Check-pay";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hooks/appDispatch";
import { getPackageDetail, packageSelector } from "@/app/store/slice/packageSlice";
import { packageEntity } from "@/types/package";
import { useSession } from "next-auth/react";
import { createNewBooking } from "@/app/store/slice/bookingSlice";
import { useRouter } from "next/navigation";
import { BookingByCardDTOType, createMobileBankChargeType, omiseChargeEntity } from "@/types/payment";
import { createBookByCard, createChargeWithMobileBanking } from "@/app/store/slice/paymentSlice";
import Image from "next/image";
import undrawBooking from "@/app/assets/images/svg/undraw_booking.svg";
import CvButton from "@/app/components/CvButton/CvButton";
import DefaultOutlineButton from "@/app/components/CvButton/outline-button";

export default function CheckOutPage() {

    const searchParams = useSearchParams();
    const packageId = Number(searchParams.get("packageId"));
    const tripDate = searchParams.get("tripDate");
    const steper = Number(searchParams.get("steper"));
    const pkgOption = Number(searchParams.get("pkgOption"));
    const adultQty = Number(searchParams.get("adultQty"));
    const childQty = Number(searchParams.get("childQty"));
    const groupQty = Number(searchParams.get("groupQty"));
    const [amoutPrice, setAmoutPrice] = useState<number>(0);
    const [childPrice, setChildPrice] = useState<number>(0);
    const [adultPrice, setAdultPrice] = useState<number>(0);
    const [groupPrice, setGroupPrice] = useState<number>(0);
    const [contractData, setContractData] = useState<contractBookingDTO>();
    const dispatch = useAppDispatch();
    const { packageDetail } = useSelector(packageSelector);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);
    const isFaching = useRef<boolean>(false);
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();


    const createQueryString = useCallback(
        (values: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(values).forEach(([key, value]) => {
            params.set(key, value);
            });

            return params.toString();
        },
        [searchParams]
    );

    const handlerContract = async (data: contractBookingDTO) => {
        setContractData(data);
        const query = createQueryString({
            steper: "2",
        });
        router.push(`${pathname}?${query}`);
    }

    const handleClickCompletePayWithCard = async (data: any) => {
        setIsLoadingPayment(true);
        const splitexpiredDate = data.expiry.split("/");
        const month = Number(splitexpiredDate[0]);
        const year = Number(splitexpiredDate[1]);
        
        const dataFormat: BookingByCardDTOType = {
            packageId: packageId,
            childPrice: childPrice,
            childQty: childQty,
            adultPrice: adultPrice,
            adultQty: adultQty,
            groupPrice: groupPrice,
            groupQty: groupQty,
            amount: amoutPrice,
            additionalDetail: contractData?.additionalDetail,
            pickup_lat: 100.1000,
            pickup_lgn: 135.240,
            trip_at: tripDate as string,
            pickupLocation: contractData?.arrival_details,
            card: {
                card_name: data.name as string,
                card_number: data.number as string,
                security_code: data.cvc as string,
                expiration_month: month,
                expiration_year: year,
                city: contractData?.country as string,
                postal_code: "10320",
            },
            contractBooking: {
                email: contractData?.email as string,
                firstName: contractData?.firstName as string,
                lastName: contractData?.lastName as string,
                country: contractData?.country as string,
                phoneNumber: contractData?.phoneNumber as string,
            },
            policyAccept: true
        };

        const dataDispath = {
            data: dataFormat,
            accessToken: session?.authToken
        };

        const createBook: any = await dispatch(createBookByCard(dataDispath));

        if (createBook.payload.status === true) {
            const query = createQueryString({
                steper: "3",
                bookingId: String(createBook.payload.data.bookingId),
            });
            router.push(`${pathname}?${query}`);
            setIsLoadingPayment(false);
        }
    }

    const handleClickCompletePayWithQr = async () => {
        setIsLoadingPayment(true);
        const data: ClientBookingCreateBody = {
            packageId: packageId,
            childPrice: childPrice,
            childQty: childQty,
            adultPrice: adultPrice,
            adultQty: adultQty,
            groupPrice: groupPrice,
            groupQty: groupQty,
            amount: amoutPrice,
            additionalDetail: contractData?.additionalDetail,
            pickup_lat: 100.1000,
            pickup_lgn: 135.240,
            trip_at: tripDate as string,
            pickupLocation: contractData?.arrival_details,
            contractBooking: {
                userId: session?.user?.id as string,
                email: contractData?.email as string,
                firstName: contractData?.firstName as string,
                lastName: contractData?.lastName as string,
                country: contractData?.country as string,
                phoneNumber: contractData?.phoneNumber as string,
            },
            policyAccept: true
        };

        const dataformat = {
            data,
            accessToken: session?.authToken
        }

        const createNewBook: any = await dispatch(createNewBooking(dataformat));

        if (createNewBook.payload.status === true) {
            setIsLoadingPayment(false);
            const query = createQueryString({});

            router.push(`checkout/payment/qr/${createNewBook.payload.data.bookingId}?${query}`);
        }
    };  

    const handleClickCompletePayMobileBank = async (value: string) => {
        try {
            setIsLoadingPayment(true);
            const data: ClientBookingCreateBody = {
                packageId: packageId,
                childPrice: childPrice,
                childQty: childQty,
                adultPrice: adultPrice,
                adultQty: adultQty,
                groupPrice: groupPrice,
                groupQty: groupQty,
                amount: amoutPrice,
                additionalDetail: contractData?.additionalDetail,
                pickup_lat: 100.1000,
                pickup_lgn: 135.240,
                trip_at: tripDate as string,
                pickupLocation: contractData?.arrival_details,
                contractBooking: {
                    userId: session?.user?.id as string,
                    email: contractData?.email as string,
                    firstName: contractData?.firstName as string,
                    lastName: contractData?.lastName as string,
                    country: contractData?.country as string,
                    phoneNumber: contractData?.phoneNumber as string,
                },
                policyAccept: true
            };

            const dataformat = {
                data,
                accessToken: session?.authToken
            }

            const createNewBook: any = await dispatch(createNewBooking(dataformat));

            if (createNewBook.payload.status !== true) throw "Have something worng, Please try again later.";

            const bookingId = createNewBook.payload.data.bookingId;

            const mbDataFormat: createMobileBankChargeType = {
                bank: value,
                bookingId: bookingId
            };

            const dataForMbbank = {
                data: mbDataFormat,
                accessToken: session?.authToken
            };

            const createNewMbChaege: any = await dispatch(createChargeWithMobileBanking(dataForMbbank));

            if (createNewMbChaege.payload.status !== true) throw "Have something worng, Please try again later.";

            const chargeData = createNewMbChaege.payload.data as omiseChargeEntity;

            if (chargeData.authorize_uri) {
                window.location.href = chargeData.authorize_uri;
            }
        } catch (error) {
            console.log(error);
        }
    };  

    useEffect(() => { 
        const fecthData = async () => {
            if (isFaching.current) return;
            isFaching.current = true;
            await dispatch(getPackageDetail(packageId));
            isFaching.current = false;
        };

        packageDetail === null && fecthData();

        packageDetail !== null && setIsLoading(false);
    }, [dispatch, packageDetail])

    useEffect(() => {
        if (adultQty > 0 || childQty > 0) {
            setAmoutPrice(0);

            if (packageDetail?.packageOption !== null) {
                const amoutAdult = (Number(packageDetail?.packageOption[pkgOption].adultPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].adultPromoPrice : packageDetail?.packageOption[pkgOption].adultPrice) * adultQty);
                const amoutchild = (Number(packageDetail?.packageOption[pkgOption].childPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].childPromoPrice : packageDetail?.packageOption[pkgOption].childPrice) * childQty);
                const amoutPrice = (amoutAdult + amoutchild);

                setChildPrice(amoutchild);
                setAdultPrice(amoutAdult);
                setAmoutPrice(amoutPrice);
            }
        }

        if (groupQty > 0) {
            setAmoutPrice(0);

            if (packageDetail?.packageOption !== null) {
                setGroupPrice(Number(packageDetail?.packageOption[pkgOption].groupPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].groupPromoPrice : packageDetail?.packageOption[pkgOption].groupPrice));
                setAmoutPrice(Number(packageDetail?.packageOption[pkgOption].groupPromoPrice !== 0 ? packageDetail?.packageOption[pkgOption].groupPromoPrice : packageDetail?.packageOption[pkgOption].groupPrice));
            }
        }
        
    }, [adultQty, childQty, groupQty, packageDetail]);

    useEffect(() => {
        if (steper <= 0 || steper > 3) {
            return router.back();
        }

        if (steper === 2) {
            const query = createQueryString({
                steper: "1",
            });
            !contractData && router.push(`${pathname}?${query}`);
        }
    }, [steper]);

    return(
        <> 
        <div className="w-full px-[20px] 2xl:px-0 2xl:max-w-7xl 2xl:mx-auto mb-[45px]">
            <div className="mt-[60px]">
                <CheckoutHeader  steps={steper} />
            </div>
            {
                steper !== 3 ?
                <div className="flex flex-col-reverse w-full mt-[20px] md:flex-row justify-between items-start gap-[20px]">
                    <div className="w-full md:w-4/6 bg-white p-[10px] rounded-[20px]">
                        {
                            steper === 1 && <CustomerInfo callBackData={handlerContract} />
                        }
                        {
                            steper === 2 && <CheckPay 
                                CompletePayWithQr={handleClickCompletePayWithQr}
                                CompletePayWithCard={handleClickCompletePayWithCard}
                                CompletePayWithMobileBanking={handleClickCompletePayMobileBank}
                                isLoadingPayment={isLoadingPayment}
                            />
                        }
                    </div>
                    <div className="w-full md:w-2/6">
                        <TicketInfo
                            isLoading={isLoading}
                            packageDetail={packageDetail as packageEntity}
                            amoutPrice={amoutPrice}
                            tripDate={tripDate as string}
                            adultQty={Number(adultQty)}
                            childQty={Number(childQty)}
                            groupQty={Number(groupQty)}
                        />
                    </div>
                </div>
                :
                <div className="mt-[20px] w-full bg-white p-[10px] items-center p-[20px] rounded-[20px] flex flex-col gap-[30px]">
                    <Image src={undrawBooking} alt="" width={0} height={0} className="w-[200px] md:w-[350px]" />
                    <span>Thank you for booking, Your booking is completed now wait for confirmation your trip.</span>
                    <div className="max-w-[600px] flex flex-col gap-[10px]">
                        <CvButton
                            label="Find another trip"
                            onClick={() => router.push("/")}
                        />
                        <DefaultOutlineButton
                            label="Go to your trip"
                            onClick={() => router.push("/account/booking?page=upcoming")}
                        />
                    </div>
                </div>
            }
        </div>
        </>
    );
}