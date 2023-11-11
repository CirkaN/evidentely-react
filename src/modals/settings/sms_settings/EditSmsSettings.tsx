import { Button, Dialog, Flex, TextArea } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useEffect, useState } from "react";
import { SmsTemplate } from "../../../shared/interfaces/sms_templates.interface";
import InfoBox, { InfoBoxType } from "../../../components/info-box";

interface EditSmsSettingsProps {
    cancelFunction: () => void,
    saveFunction: (form: SmsTemplate) => void,
    isOpen: boolean,
    type: string,
    text: string
}
interface Replacements {
    "#ime": string;
    "#datum": string;
    '#dan': string,
    '#mesec': string,
    '#godina': string,
    '#usluga': string,
    '#napomena': string,
}

const EditSmsSettingsModal = (props: EditSmsSettingsProps) => {

    const [form, setForm] = useState({
        text: "",
        type: "",
    });
    const [modifiedMessage, setModifiedMessage] = useState("");

    useEffect(() => {
        setForm(props);
        setModifiedMessage(props.text)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.type, props.text])


    useEffect(() => {
        formatExample();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.text])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.saveFunction(form)
    }

    const formatExample = () => {
        const replacements: Replacements = {
            "#ime": "Ivan",
            '#dan': new Date().getDay().toString(),
            '#mesec': new Date().getMonth().toString(),
            '#godina': new Date().getFullYear().toString(),
            "#datum": new Date().toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" }),
            '#usluga': "Moja usluga",
            '#napomena': "Primer napomene",

        };
        const modifiedString = form.text.replace(/#ime|#napomena|#usluga|#dan|#mesec|#godina|#datum/g, match => replacements[match as keyof Replacements]);
        setModifiedMessage(modifiedString);
    }
    const handleOnChange = (value: string) => {
        setForm((c) => c && { ...c, text: value });
    }

    return (<>
        <Dialog.Root open={props.isOpen} >
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title> Izmeni podesavanja</Dialog.Title>
                <div className="rt-Text rt-r-size-2 rt-r-mb-4">
                    <InfoBox headerText={`Izmeni podesavanje za ${form.type}`} text="Ovde mozete izmeniti podrazumevanu poruku, mozete koristiti sledece promenjive kako bi definisali vasu poruku" type={InfoBoxType.Info} ></InfoBox>
                </div>

                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="3">
                        <p>#datum,#dan,#mesec,#godina, #vreme ,  #ime , #usluga</p>
                        <p className="text-sm">Promenljive (primer: #ime) ce se automatski promeniti u ime klijenta kome saljete poruku</p>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Poruka:
                            </Text>
                            <TextArea
                                required={true}
                                onChange={(e) => { handleOnChange(e.target.value) }}
                                value={form.text}>
                            </TextArea>
                        </label>
                    </Flex>

                    <Flex direction="column" gap="3" className="pt-2">

                        <Text as="div" size="2" mb="1" weight="bold">
                            Primer poruke:
                        </Text>
                        <TextArea
                            disabled={true}
                            value={modifiedMessage}>

                        </TextArea>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button onClick={props.cancelFunction} variant="soft" color="gray">
                                Ponisti
                            </Button>
                        </Dialog.Close>
                        <Button type="submit" >Save</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    </>)
}

export default EditSmsSettingsModal