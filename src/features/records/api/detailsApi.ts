import { client } from "@/shared/api";
import { Record, Detail } from "@/entities/records/model";
import { RecordType } from "../model/RecordSchema";
import {
    dtoToRecord,
    recordToCreateDTO,
    recordToUpdateDTO,
    detailToDto,
} from "../service";
import {
    InterviewRecordResponseDTO,
    RecordDetailCreateDTO,
} from "./recordsDTOList";

/**
 * 고유 ID를 사용하여 서버에서 인터뷰 기록을 가져옵니다.
 *
 * @param interviewRecordId - 가져올 인터뷰 기록의 고유 식별자입니다.
 * @returns `Record` 객체를 반환하는 Promise입니다.
 *
 * @throws 요청이 실패하거나 응답을 처리할 수 없는 경우 오류를 발생시킵니다.
 */
export const fetchRecordById = async (
    interviewRecordId: string,
): Promise<Record> => {
    const response = await client.get<InterviewRecordResponseDTO>(
        `/interview/${interviewRecordId}`,
    );

    return dtoToRecord(response.data);
};

/**
 * 특정 인터뷰 기록에 대한 새로운 세부 정보를 생성합니다.
 *
 * @param interviewRecordId - 인터뷰 기록의 고유 식별자입니다.
 * @param data - 생성할 세부 정보 데이터를 포함하는 객체로, `RecordDetailCreateDTO` 구조를 따릅니다.
 * @returns 생성된 세부 정보의 응답 데이터를 포함하는 Promise를 반환합니다.
 */
export const createDetail = async (
    interviewRecordId: string,
    data: RecordDetailCreateDTO,
) => {
    const response = await client.post(
        `/interview/${interviewRecordId}/detail`,
        data,
    );
    return response.data;
};

/**
 * 인터뷰 기록에서 특정 세부 정보를 삭제합니다.
 *
 * @param interviewRecordId - 인터뷰 기록의 고유 식별자입니다.
 * @param detailIndex - 인터뷰 기록 내에서 삭제할 세부 정보의 인덱스입니다.
 * @returns 삭제 작업의 응답 데이터를 포함하는 Promise를 반환합니다.
 */
export const deleteDetail = async (
    interviewRecordId: string,
    detailIndex: number,
) => {
    const response = await client.delete(
        `/interview/${interviewRecordId}/detail/${detailIndex}`,
    );
    return response.data;
};

/**
 * 인터뷰 기록을 고유 ID를 사용하여 삭제합니다.
 *
 * @param interviewRecordId - 삭제할 인터뷰 기록의 고유 식별자입니다.
 * @returns 삭제 작업의 응답 데이터를 포함하는 Promise를 반환합니다.
 */
export const deleteRecord = async (interviewRecordId: string) => {
    const response = await client.delete(`/interview/${interviewRecordId}`);
    return response.data;
};

/**
 * 제공된 데이터를 서버에 전송하여 새로운 인터뷰 기록을 생성합니다.
 *
 * @param data - 생성할 기록 데이터로, `RecordType` 형식으로 표현됩니다.
 * @returns 생성된 기록의 `interviewRecordId`를 포함하는 객체를 반환하는 Promise입니다.
 * @throws 요청이 실패할 경우 오류를 발생시킵니다.
 */
export const createRecord = async (
    data: RecordType,
): Promise<{ interviewRecordId: string }> => {
    try {
        const dto = recordToCreateDTO(data);

        const response = await client.post(`/interview`, dto);
        return response.data;
    } catch (error) {
        console.error("Error in updateRecord:", error);
        throw error;
    }
};

/**
 * 제공된 데이터로 인터뷰 기록을 업데이트합니다.
 *
 * @param interviewRecordId - 업데이트할 인터뷰 기록의 고유 식별자입니다.
 * @param data - `RecordType` 구조를 따르는 인터뷰 기록의 업데이트된 데이터입니다.
 * @returns 업데이트된 인터뷰 기록을 `InterviewRecordResponseDTO`로 반환하는 Promise입니다.
 * @throws 업데이트 작업이 실패할 경우 오류를 발생시킵니다.
 */
export const updateRecord = async (
    interviewRecordId: string,
    data: RecordType,
): Promise<InterviewRecordResponseDTO> => {
    try {
        const dto = recordToUpdateDTO(data);

        const response = await client.put(
            `/interview/${interviewRecordId}`,
            dto,
        );
        return response.data;
    } catch (error) {
        console.error("Error in updateRecord:", error);
        throw error;
    }
};

/**
 * 인터뷰 기록의 특정 세부 정보를 업데이트합니다.
 *
 * @param interviewRecordId - 인터뷰 기록의 고유 식별자입니다.
 * @param detailIndex - 인터뷰 기록 내에서 업데이트할 세부 정보의 인덱스입니다.
 * @param payload - 서버에 전송할 업데이트된 세부 정보 데이터입니다.
 * @returns 서버에서 업데이트된 세부 정보 데이터를 반환하는 Promise입니다.
 * @throws 업데이트 작업이 실패할 경우 오류를 발생시킵니다.
 */
export const updateDetail = async (
    interviewRecordId: string,
    detailIndex: number,
    payload: Detail,
) => {
    try {
        const dto = detailToDto(payload);

        const response = await client.put(
            `/interview/${interviewRecordId}/detail/${detailIndex}`,
            dto,
        );
        return response.data;
    } catch (error) {
        console.error("Error in updateDetail:", error);
        throw error;
    }
};
