
interface HeaderBookingContentProps {
    isLoading: boolean,
    bookingId?: string,
    bookingStatus?: string,
    trip_at?: string | Date,
}

export default function HeaderBookingContent({
    isLoading,
    bookingId,
    bookingStatus,
    trip_at
}: HeaderBookingContentProps) {
    return(
        isLoading ?
        <div className="w-full rounded-[20px] bg-white p-[20px]">
            <div className="flex flex-col gap-[10px] animate-pulse ease-linear">
                <div className="bg-gray-200 w-full h-[30px] rounded-[10px]"></div>
                <div className="w-full flex py-[20px] justify-center">
                    <div className="bg-gray-200 w-[150px] h-[30px] rounded-[10px]"></div>
                </div>
                <div className="bg-gray-200 w-full h-[30px] rounded-full"></div>
                <div className="bg-gray-200 w-full h-[30px] rounded-full"></div>
            </div>
        </div>
        :
        <div className="w-full rounded-[20px] bg-white flex flex-col gap-[24px]">
            <div className="w-full rounded-t-[20px] flex justify-center py-[10px] bg-[#2C0735]">
                <span className="text-[16px] md:text-[18px] text-white font-semibold">Upcoming</span>
            </div>
            <p className="w-full text-[16px] md:text-[18px] font-semibold text-center">Booking ID: {bookingId} </p>
            <div className="w-full flex flex-col gap-[10px] mb-[20px] px-[20px]">
                <button
                    className="cursor-pointer rounded-full w-full md:text-[14px] font-medium py-[10px] text-white bg-[#613DC1]"
                >
                    Manage Booking   
                </button>
                <button
                    className="cursor-pointer rounded-full w-full md:text-[14px] font-medium py-[10px] text-[#613DC1] border border-[#613DC1]"
                >
                    Cancel Booking 
                </button>
            </div>
        </div>
    );
};