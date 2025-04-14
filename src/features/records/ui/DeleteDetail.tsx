import { GrClose } from "react-icons/gr";
import { HStack, IconButton } from "@chakra-ui/react";

import { useQaMutation } from "../hook/useQaMutation";
import { useRecordStore } from "../store/recodStore";

/**
 * 특정 레코드의 세부 정보를 삭제하기 위한 삭제 버튼을 제공하는 React 컴포넌트입니다.
 * 삭제 작업을 수행하기 위해 mutation 훅을 사용하며, 스토어에서 레코드 ID를 가져옵니다.
 *
 * @param props - 컴포넌트의 props입니다.
 * @param props.detailIndex - 삭제할 세부 정보의 인덱스입니다.
 *
 * @returns {JSX.Element} 삭제 버튼을 포함하는 수평 스택입니다.
 *
 * @remarks
 * - `handleDeleteDetail` 함수는 삭제 버튼이 클릭되었을 때 호출됩니다.
 * - `deleteDetailMutation`은 삭제 작업을 수행하는 데 사용됩니다.
 * - 삭제 과정에서 발생한 오류는 콘솔에 기록됩니다.
 *
 * @example
 * ```ts
 * <DeleteDetail detailIndex={2} />
 * ```
 */
export const DeleteDetail = ({ detailIndex }: { detailIndex: number }) => {
    const { deleteDetailMutation } = useQaMutation();
    const recordId = useRecordStore((state) => state.record.recordId);

    const handleDeleteDetail = async (detailIndex: number) => {
        try {
            deleteDetailMutation({
                interviewRecordId: recordId,
                detailIndex,
            });
        } catch (error) {
            console.error("Failed to delete detail:", error);
        }
    };

    return (
        <HStack justifyContent="flex-end">
            <IconButton
                m={4}
                variant={"ghost"}
                size="sm"
                onClick={() => handleDeleteDetail(detailIndex)}
                aria-label="delete"
            >
                <GrClose color="grey" />
            </IconButton>
        </HStack>
    );
};
