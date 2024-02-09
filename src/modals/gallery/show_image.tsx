import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { GalleryItem } from "../../components/gallery";
import { FormEvent, useEffect, useState } from "react";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";
import { X } from "react-feather";

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
                <Flex justify="between">
                    <Dialog.Title>{t("common.edit_modal")}</Dialog.Title>
                    <Dialog.Close>
                        <Button
                            variant="ghost"
                            color="gray"
                            onClick={() => props.cancelFunction()}
                        >
                            <X />
                        </Button>
                    </Dialog.Close>
                </Flex>

                <img src={props.image.url} alt={props.image?.note} />
                <form onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            {t("common.note")}:
                        </label>
                        <textarea
                            name="note"
                            className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 border"
                            value={imageProperties?.note ?? ""}
                            onChange={(e) => {
                                setImageProperties(
                                    (c) => c && { ...c, note: e.target.value },
                                );
                            }}
                        ></textarea>
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
