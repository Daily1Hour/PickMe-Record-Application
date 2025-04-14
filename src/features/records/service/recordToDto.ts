import { RecordType } from "../model/RecordSchema";
import {
    InterviewRecordCreateDTO,
    InterviewRecordUpdateDTO,
} from "../api/recordsDTOList";

/**
 * `RecordType` 객체를 `InterviewRecordCreateDTO` 객체로 변환합니다.
 *
 * @param record - 변환할 레코드 객체입니다.
 * @returns 엔터프라이즈 이름, 카테고리, 그리고 매핑된 세부 정보 목록을 포함하는 
 *          `InterviewRecordCreateDTO` 구조의 객체를 반환합니다.
 */
export function recordToCreateDTO(record: RecordType) {
    return {
        enterpriseName: record.enterpriseName,
        category: record.category,
        details: record.details.map(({ question, answer }) => ({
            question,
            answer,
        })),
    } as InterviewRecordCreateDTO;
}

/**
 * `RecordType` 객체를 `InterviewRecordUpdateDTO` 객체로 변환합니다.
 *
 * @param record - 변환할 레코드 객체입니다.
 * @returns 입력 레코드에서 `enterpriseName`과 `category` 속성을 포함하는
 *          `InterviewRecordUpdateDTO` 형식의 객체를 반환합니다.
 */
export function recordToUpdateDTO(record: RecordType) {
    return {
        enterpriseName: record.enterpriseName,
        category: record.category,
    } as InterviewRecordUpdateDTO;
}
