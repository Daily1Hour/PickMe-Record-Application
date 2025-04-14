import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Detail } from "@/entities/records/model";
import {
    createRecord,
    updateRecord,
    updateDetail,
    deleteRecord,
} from "../api/detailsApi";
import { RecordType } from "../model/RecordSchema";

/**
 * 레코드를 관리하기 위한 mutation 함수를 제공하는 커스텀 훅입니다.
 * 이 훅은 React Query의 `useMutation`을 활용하여 레코드 생성, 업데이트, 
 * 세부 정보 업데이트, 삭제 작업을 처리하며, 성공적인 mutation 이후 관련 쿼리의 
 * 캐시 무효화를 보장합니다.
 *
 * @returns 다음과 같은 mutation 함수를 포함하는 객체를 반환합니다:
 * - `create`: 새로운 레코드를 생성하는 mutation 함수.
 * - `update`: 기존 레코드를 업데이트하는 mutation 함수.
 * - `updateDetailMutation`: 레코드의 특정 세부 정보를 업데이트하는 mutation 함수.
 * - `deleteMutation`: 레코드를 삭제하는 mutation 함수.
 */
export function useRecordMutation() {
    const queryclient = useQueryClient();

    const { mutateAsync: create } = useMutation({
        mutationFn: ({ data }: { data: RecordType }) => createRecord(data),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
        },
    });

    const { mutate: update } = useMutation({
        mutationFn: ({
            recordId,
            updatedata,
        }: {
            recordId: string;
            updatedata: RecordType;
        }) => updateRecord(recordId, updatedata),
        onSuccess: (_data, { recordId }) => {
            queryclient.refetchQueries({ queryKey: ["side"] });
            queryclient.refetchQueries({ queryKey: ["record", recordId] });
        },
    });

    const { mutate: updateDetailMutation } = useMutation({
        mutationFn: ({
            recordId,
            index,
            detail,
        }: {
            recordId: string;
            index: number;
            detail: Detail;
        }) => updateDetail(recordId, index, detail),
    });

    const { mutate: deleteMutation } = useMutation({
        mutationFn: ({ recordId }: { recordId: string }) =>
            deleteRecord(recordId),
        onSuccess: () => {
            queryclient.refetchQueries({ queryKey: ["side"] });
        },
    });

    return { create, update, updateDetailMutation, deleteMutation };
}
