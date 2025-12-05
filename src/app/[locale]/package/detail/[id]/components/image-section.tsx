import { packageImageSave } from "@/app/types/package";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "antd";

interface ImageSectionProps {
    image:  packageImageSave[]
}

export default function ImageSection({
    image
}: ImageSectionProps) {

    const [mainImage, setMainImage] = useState<packageImageSave[]>([]);
    const [childsImage, setChildsImage] = useState<packageImageSave[]>([]);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    const [mainDispay, setMainDisplay] = useState<string>("");

    useEffect(() => {
        const filterMainImage: packageImageSave[] = image.filter(image => image.mainFile === true);
        const filterChildsImage: packageImageSave[] = image.filter(image => image.mainFile === false);        

        setMainImage(filterMainImage);
        setChildsImage(filterChildsImage);
        setMainDisplay(filterMainImage[0].file_base64 as string);
        setIsLoading(false);
    }, [image]);


    return(
        <>  
            <Modal
                title="All photos"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                footer={false}
                width={1100}
            >
                <div className="w-full h-[450px] overflow-hidden rounded-[10px]">
                    <Image src={mainDispay} alt="" width={0} height={0} className="w-full h-full object-cover" />
                </div>
                <div className="mt-[10px] w-full flex items-center no-scrollbar gap-[10px] overflow-x-auto overflow-scroll" >
                    {
                        childsImage.map((data, key) => (
                            <div key={key} className="min-w-[100px] w-[100px] h-[100px] overflow-hidden rounded-[10px] cursor-pointer" onClick={() => setMainDisplay(data.file_base64 as string)}>
                                <Image
                                        src={data.file_base64 as string}
                                        alt=""
                                        width={0}
                                        height={0}
                                        className="w-full h-full object-cover"
                                    />
                            </div>
                        ))
                    }
                </div>
            </Modal>
            <div className="md:hidden w-full">
                <div className="w-full h-[200px] overflow-hidden rounded-[10px] cursor-pointer">
                    {
                        !isLoading && <Image src={mainDispay} alt="" width={0} height={0} className="w-full h-full object-cover" />
                    }
                </div>
                <div className="mt-[10px] w-full flex items-center no-scrollbar gap-[10px] overflow-x-auto overflow-scroll" >
                    {
                        childsImage.map((data, key) => (
                            <div key={key} className="min-w-[100px] h-[100px] overflow-hidden rounded-[10px] cursor-pointer" onClick={() => setMainDisplay(data.file_base64 as string)}>
                                <Image
                                        src={data.file_base64 as string}
                                        alt=""
                                        width={0}
                                        height={0}
                                        className="w-full h-full object-cover"
                                    />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="hidden md:grid grid-cols-2 items-center gap-[10px] justify-between">
                <div className="w-full h-[370px] overflow-hidden rounded-[10px] cursor-pointer" onClick={() => setIsOpenModal(true)}>
                    {
                        !isLoading && <Image src={mainImage[0].file_base64 as string} alt="" width={0} height={0} className="w-full h-full object-cover" />
                    }
                </div>
                <div className="w-full h-full grid grid-cols-2 gap-[10px]">
                    {
                        childsImage?.filter(file => file.mainFile === false).slice(0, 4).map((data, key) => (
                            <div key={key} className="w-full h-[180px] overflow-hidden rounded-[10px] relative cursor-pointer" onClick={() => setIsOpenModal(true)}>
                                {key !== 3 ? (
                                    <Image
                                        src={data.file_base64 as string}
                                        alt=""
                                        width={0}
                                        height={0}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="relative w-full h-full group">
                                        <Image
                                        src={data.file_base64 as string}
                                        alt="Photo"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/60 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center text-white text-[16px] font-medium">
                                            <ImageIcon className="w-6 h-6 mb-1 mr-2" />
                                            <span>Show all photo</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            ))
                        }
                </div>
            </div>
        </>
    );
}