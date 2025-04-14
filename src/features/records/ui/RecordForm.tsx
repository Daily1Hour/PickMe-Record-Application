import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Heading, Button, HStack, Box } from "@chakra-ui/react";

import { navigateTo } from "@/shared/api/router";
import { Record } from "@/entities/records/model";
import { RecordSchema, RecordType } from "../model/RecordSchema";
import { useRecordStore } from "../store/recodStore";
import { useRecordMutation } from "../hook/useRecordMutation";
import { QaForm } from "./QaForm";
import { LabelForm } from "./LabelForm";
import { DeleteConfirm } from "./DeleteConfirm";

/**
 * RecordForm 컴포넌트
 *
 * 이 컴포넌트는 기록을 생성, 수정 및 삭제할 수 있는 폼 인터페이스를 제공합니다.
 * React Hook Form을 사용하여 폼 상태 관리 및 유효성 검사를 수행하며,
 * 기록 관련 작업을 위한 커스텀 훅과 통합됩니다.
 *
 * 기능:
 * - 기록 생성 또는 편집을 위한 폼을 표시합니다.
 * - 확인 대화 상자를 통해 기록 삭제를 지원합니다.
 * - 기록 생성 및 수정에 대한 폼 제출을 처리합니다.
 * - 기록 ID의 존재 여부에 따라 추가 폼(`QaForm`)을 동적으로 렌더링합니다.
 *
 * 훅:
 * - `useRecordStore`: 스토어에서 현재 기록을 가져옵니다.
 * - `useForm`: `yupResolver`와 `RecordSchema`를 사용하여 폼 상태 및 유효성 검사를 관리합니다.
 * - `useRecordMutation`: 기록 생성, 수정 및 세부 정보 업데이트를 위한 변이 함수를 제공합니다.
 *
 * 상태:
 * - `isDialogOpen` (boolean): 삭제 확인 대화 상자의 가시성을 제어합니다.
 * - `idToDelete` (string | null): 삭제할 기록의 ID를 저장합니다.
 *
 * 메서드:
 * - `handleDelete(recordId: string)`: 지정된 기록 ID에 대해 삭제 확인 대화 상자를 엽니다.
 * - `onSubmit(data: RecordType)`: 기록 생성 또는 수정을 위한 폼 제출을 처리합니다.
 *   - `recordId`가 없으면 새 기록이 생성됩니다.
 *   - `recordId`가 있으면 기록이 수정되고, 세부 정보가 개별적으로 업데이트됩니다.
 *
 * UI 컴포넌트:
 * - `DeleteConfirm`: 기록 삭제를 확인하는 대화 상자 컴포넌트.
 * - `FormProvider`: 자식 컴포넌트에 폼 컨텍스트를 제공합니다.
 * - `LabelForm`: 기록에 라벨을 지정하는 폼 섹션.
 * - `QaForm`: 추가 세부 정보를 위한 폼 섹션으로, `recordId`가 있을 때만 렌더링됩니다.
 * - `Button`: 폼 제출 또는 삭제 작업을 트리거하는 데 사용됩니다.
 *
 * 스타일링:
 * - 폼은 고정된 너비와 높이, 패딩으로 스타일링되며, 스택 레이아웃을 사용하여 정렬됩니다.
 *
 * 참고:
 * - 알림(alert)을 사용하여 저장 또는 업데이트 작업의 성공 여부를 사용자에게 알립니다.
 * - 기록 처리 중 발생하는 오류를 잡아내고 로그로 기록하는 오류 처리가 구현되어 있습니다.
 */
const RecordForm = () => {
    const { record } = useRecordStore();

    const methods = useForm<RecordType>({
        defaultValues: record || Record.empty(),
        resolver: yupResolver(RecordSchema),
    });

    const recordId = record.recordId;
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    const { create, update, updateDetailMutation } = useRecordMutation();

    const handleDelete = (recordId: string) => {
        setIdToDelete(recordId);
        setDialogOpen(true);
    };

    const onSubmit = async (data: RecordType) => {
        try {
            if (!recordId) {
                const newRecord = await create({ data });
                navigateTo(`/${newRecord.interviewRecordId}`);
                alert("저장했습니다.");
            } else {
                update({ recordId, updatedata: data });
                data.details.forEach((detail, index) => {
                    updateDetailMutation({ recordId, index, detail });
                });
                alert("수정했습니다.");
                console.log(data);
            }
        } catch (error) {
            console.error("Error processing the record:", error);
            alert("Failed to process the record.");
        }
    };

    return (
        <Box>
            <DeleteConfirm
                recordToDelete={idToDelete}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    style={{ width: "40vw", height: "50vw", padding: "20px" }}
                >
                    <Stack>
                        <Heading>내 기록</Heading>
                        <LabelForm />
                        {recordId && <QaForm />}
                        <HStack justifyContent="flex-end">
                            <Button
                                m="20px"
                                type="submit"
                                colorPalette="teal"
                                borderRadius="30px"
                                w="100px"
                            >
                                {recordId ? "수정" : "저장"}
                            </Button>
                            {recordId ? (
                                <Button
                                    borderRadius="30px"
                                    w="100px"
                                    onClick={() => handleDelete(recordId)}
                                >
                                    삭제
                                </Button>
                            ) : null}
                        </HStack>
                    </Stack>
                </form>
            </FormProvider>
        </Box>
    );
};

export default RecordForm;
