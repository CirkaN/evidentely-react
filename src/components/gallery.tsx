import { Trash } from "react-feather"
import ShowImage from "../modals/gallery/show_image";
import { useState } from "react";
import axios_instance from "../config/api_defaults";
import { useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import SweetAlert2 from "react-sweetalert2";
import { useTranslation } from "react-i18next";


interface GalleryProps {
    items: GalleryItem[],
    onClickFunction?: () => void
}
export interface GalleryItem {
    id: string,
    url: string,
    name: string,
    note?: string,
}

const Gallery = (galleryItems: GalleryProps) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [activeImage, setActiveImage] = useState<GalleryItem>();
    const [zoomActive, setZoomActive] = useState(false);
    const [swalProps, setSwalProps] = useState({});

    const raiseDeleteAlert = (id: string) => {
        setSwalProps({
            show: true,
            icon: 'error',
            title: t('common.please_confirm'),
            text: t('media.delete_attachment'),
            cancelButtonColor: "green",
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: t('common.cancel'),
            confirmButtonText: t('common.delete'),
            confirmButtonColor: "red",
            onConfirm: () => { deleteAttachment(id) },
            onResolve: setSwalOff
        });
    }
    function setSwalOff() {
        const dataCopied = JSON.parse(JSON.stringify(swalProps));
        dataCopied.show = false;
        setSwalProps(dataCopied);
    }
    const deleteAttachment = (id: string) => {
        axios_instance().delete(`document/${id}`).then(() => {
            toast.success(t('media.delete_success'))
            queryClient.invalidateQueries({
                queryKey: ['client_documents'],
            })
        })
    }

    const openZoomed = (item: GalleryItem) => {
        setActiveImage(item);
        setZoomActive(true);
    }

    const myMapper = galleryItems.items.map((e) => {
        return (
            <div key={e.id} className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mb-4 px-4 transition duration-300 ease-in-out hover:scale-110 ">
                <div className="flex justify-between py-2">
                    <span>
                        {e.note}
                    </span>
                    <div className="cursor-pointer transition duration-300 ease-in-out hover:scale-110 flex">
                        <span onClick={() => raiseDeleteAlert(e.id)}><Trash /></span>
                        {/* <span onClick={() => editAttachment(e)}><Edit /></span> */}
                    </div>
                </div>
                <img className="cursor-pointer hover:opacity-80"
                    src={e.url}
                    alt={e.name}
                    onClick={() => { openZoomed(e) }} />
            </div>
        )
    })
    return (
        <>
            <SweetAlert2 {...swalProps} />
            <Toaster />
            {activeImage &&
                <ShowImage
                    image={activeImage}
                    cancelFunction={() => { setZoomActive(false) }}
                    isOpen={zoomActive}
                ></ShowImage >
            }
            <div className="flex flex-wrap justify-around p-4">
                {myMapper}
            </div>
        </>
    )

}
export default Gallery;