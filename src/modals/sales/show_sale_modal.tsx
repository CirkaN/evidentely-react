
import { Dialog, Flex, Button } from "@radix-ui/themes";

import { useTranslation } from "react-i18next";

interface showSaleModalProps {
    isOpen: boolean,
    cancelFunction: () => void,
}
const ShowSaleModal = (props: showSaleModalProps) => {
    const { t } = useTranslation();

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{t('sales.create_modal_title')}</Dialog.Title>


                <h1>hello from modal</h1>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button type="button" onClick={props.cancelFunction} variant="soft" color="gray">
                            {t('common.cancel')}
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button type="submit">{t('common.save')}</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root >
    </>)
}
export default ShowSaleModal;