import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import { ItemDTO } from "../../shared/interfaces/item.interface";
import { t } from "i18next";
import axios_instance from "../../config/api_defaults";
import toast from "react-hot-toast";

interface CreateItemProps {
    cancelFunction: () => void;
    isOpen: boolean;
}

const ReportProblemModal = (props: CreateItemProps) => {
    const [problem, setProblem] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveProblem();
    };
    const saveProblem = () => {
        axios_instance()
            .post("/report_problem", { problem: problem })
            .then(() => {
                toast.success(t("common.problem_reported_succesfully"));
                setProblem("");
                props.cancelFunction();
            });
    };

    return (
        <>
            <Dialog.Root open={props.isOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title> Prijavi problem</Dialog.Title>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <label className="font-bold pb-2 ">
                                Opisi problem
                            </label>
                            <textarea
                                required={true}
                                id="message"
                                value={problem}
                                onChange={(e) => {
                                    setProblem(e.target.value);
                                }}
                                rows={4}
                                placeholder="Ne mogu dodati klijenta.."
                                className="block p-2.5 w-full text-sm pt-2
                                  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                        </div>
                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button
                                    onClick={props.cancelFunction}
                                    variant="soft"
                                    color="gray"
                                >
                                    {t("common.cancel")}
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type="submit">
                                    {t("common.save")}
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default ReportProblemModal;
