import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { GalleryItem } from "../../components/gallery";
import { FormEvent, useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";

interface showImageInterface {
    isOpen: boolean;
    image: GalleryItem;
    cancelFunction: () => void;
}

interface ImageProperties {
    id: string;
    note?: string;
}
const ShowImage = (props: showImageInterface) => {
    const { t } = useTranslation();
    const [imageProperties, setImageProperties] = useState<ImageProperties>({
        id: props.image.id,
        note: props.image?.note,
    });
    const blankProperties = {
        id: "",
        note: "",
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateImageProperties();
    };
    const updateImageProperties = () => {
        axios_instance()
            .put(`document/${imageProperties.id}`, imageProperties)
            .then(() => {
                toast.success(t("media.update_success"));
            });
    };
    const cleanFunction = () => {
        props.cancelFunction();
        setImageProperties(blankProperties);
    };
    useEffect(() => {
        if (props.isOpen) {
            setImageProperties({
                id: props.image.id,
                note: props.image?.note,
            });
        }
    }, [props.isOpen]);
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{t("common.edit_modal")}</Dialog.Title>

                <img src={props.image.url} alt={props.image?.note} />
                <form onSubmit={handleSubmit}>
                    {props.image.note}
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">
                            {t("common.note")}
                        </label>
                        <input
                            type="text"
                            value={imageProperties?.note ?? ""}
                            onChange={(e) => {
                                setImageProperties(
                                    (c) => c && { ...c, note: e.target.value },
                                );
                            }}
                            name="note"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button
                                onClick={() => {
                                    cleanFunction();
                                }}
                                variant="soft"
                                color="gray"
                            >
                                {t("common.cancel")}
                            </Button>
                        </Dialog.Close>
                        <Button type="submit">{t("common.save")}</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};
export default ShowImage;
