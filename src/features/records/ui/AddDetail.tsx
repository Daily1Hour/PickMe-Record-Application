import { GrFormAdd } from "react-icons/gr";
import { UseFieldArrayAppend, FieldValues } from "react-hook-form";
import { IconButton } from "@chakra-ui/react";

import { useQaMutation } from "../hook/useQaMutation";
import { useRecordStore } from "../store/recodStore";

/**
 * 레코드에 새로운 세부 정보를 추가하는 버튼을 제공하는 React 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트의 props.
 * @param {UseFieldArrayAppend<FieldValues, string>} props.append - 필드 배열에 새로운 세부 정보를 추가하는 함수.
 *
 * @returns {JSX.Element} 새로운 세부 정보를 추가하는 버튼.
 *
 * @remarks
 * - 이 컴포넌트는 `useRecordStore` 훅을 사용하여 현재 레코드 ID를 가져옵니다.
 * - `useQaMutation` 훅을 활용하여 새로운 세부 정보를 생성하는 변이를 수행합니다.
 * - 생성이 성공하면 `append` 함수를 사용하여 새로운 세부 정보를 필드 배열에 추가합니다.
 * - 변이 중 오류가 발생하면 콘솔에 오류가 기록됩니다.
 *
 * @example
 * ```ts
 * <AddDetail append={appendFunction} />
 * ```
 */
export const AddDetail = ({
    append,
}: {
    append: UseFieldArrayAppend<FieldValues, string>;
}) => {
    const recordId = useRecordStore((state) => state.record.recordId);
    const { createDetailMutation } = useQaMutation();
    const handleAddDetail = async () => {
        try {
            const newDetail = { question: "", answer: "" };

            const response = await createDetailMutation({
                interviewRecordId: recordId,
                data: newDetail,
            });

            append(response);
        } catch (error) {
            console.error("Failed to create detail:", error);
        }
    };
    return (
        <IconButton colorPalette="teal" onClick={handleAddDetail} w="50px">
            <GrFormAdd />
        </IconButton>
    );
};
