import { object, string, InferType, array } from "yup";

const detailSchema = object({
    question: string().max(1000).required("질문을 입력해주세요"),
    answer: string().max(1000).required(),
});

/**
 * 기록 객체에 대한 스키마 정의.
 * 
 * 이 스키마는 기록의 구조를 검증하며, 회사 이름, 카테고리, 세부 정보를 포함합니다.
 * 다음 규칙을 강제합니다:
 * - 회사 이름은 최대 15자여야 하며 필수입니다.
 * - 카테고리는 필수입니다.
 * - 세부 정보는 질문과 답변을 포함하는 객체의 배열이어야 하며, 각 질문은 최대 1000자여야 하고 필수입니다.
 * - 답변은 최대 1000자여야 하며 필수입니다.
 */

export const RecordSchema = object({
    enterpriseName: string()
        .max(15, "최대 15자 입니다.")
        .required("회사명을 입력해주세요."),
    category: string().required("면접 유형을 입력해주세요."),
    details: array().of(detailSchema).ensure().required(),
});

export type RecordType = InferType<typeof RecordSchema>;
