import { Trash } from "react-feather"
import ShowImage from "../modals/gallery/show_image";
import { useState } from "react";

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
    const [activeImage, setActiveImage] = useState<GalleryItem>();
    const [zoomActive, setZoomActive] = useState(false);

    const deleteAttachment = (item: GalleryItem) => {
        alert(item.url);
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
                        <span onClick={() => deleteAttachment(e)}><Trash /></span>
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