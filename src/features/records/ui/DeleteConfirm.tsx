import {
    DialogRoot,
    DialogContent,
    DialogFooter,
    DialogActionTrigger,
    Button,
    Text,
    DialogCloseTrigger,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/shared/chakra-ui/toaster";

import { navigateTo } from "@/shared/api/router";
import { useRecordMutation } from "../hook/useRecordMutation";

/**
 * 레코드를 삭제하기 위한 확인 대화 상자 컴포넌트입니다.
 *
 * @param props - DeleteConfirm 컴포넌트의 props입니다.
 * @param props.recordToDelete - 삭제할 레코드의 ID입니다. null인 경우 레코드가 삭제되지 않습니다.
 * @param props.isDialogOpen - 대화 상자가 열려 있는지 여부를 나타내는 boolean 값입니다.
 * @param props.setDialogOpen - 대화 상자의 열림 상태를 설정하는 함수입니다.
 *
 * @returns {JSX.Element} DeleteConfirm 컴포넌트입니다.
 *
 * @remarks
 * 이 컴포넌트는 레코드 삭제를 확인하기 위한 대화 상자를 사용합니다. 삭제 작업을 수행하기 위해 `useRecordMutation` 훅을 사용하며,
 * 사용자 피드백을 제공하기 위해 토스터 알림을 제공합니다.
 *
 * @example
 * ```ts
 * const [isDialogOpen, setDialogOpen] = useState(false);
 * const recordToDelete = "12345";
 *
 * <DeleteConfirm
 *     recordToDelete={recordToDelete}
 *     isDialogOpen={isDialogOpen}
 *     setDialogOpen={setDialogOpen}
 * />;
 * ```
 */
export const DeleteConfirm = ({
    recordToDelete,
    isDialogOpen,
    setDialogOpen,
}: {
    recordToDelete: string | null;
    isDialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { deleteMutation } = useRecordMutation();

    const handleDeleteConfirmation = async () => {
        if (!recordToDelete) return;

        try {
            deleteMutation({ recordId: recordToDelete });
            setDialogOpen(false);
            toaster.create({ title: "삭제했습니다.", type: "success" });
            setTimeout(() => {
                navigateTo("/");
            }, 1000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toaster.create({ title: "실패했습니다.", type: "error" });
        }
    };

    return (
        <DialogRoot
            open={isDialogOpen}
            onOpenChange={(e) => setDialogOpen(e.open)}
        >
            <Toaster />
            <DialogContent padding={4} position="fixed" left="500px">
                <Text>정말 삭제하시겠습니까?</Text>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                        >
                            취소
                        </Button>
                    </DialogActionTrigger>
                    <Button
                        colorScheme="red"
                        onClick={handleDeleteConfirmation}
                    >
                        삭제
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
};
