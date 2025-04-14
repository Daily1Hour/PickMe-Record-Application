import { Summary } from "@/entities/records/model";

/**
 * 사이드바에서 인터뷰 기록에 대한 데이터 전송 객체(DTO)를 나타냅니다.
 * 이 인터페이스는 인터뷰 기록과 관련된 데이터를 구조화하는 데 사용됩니다.
 *
 * @property interviewRecordId - 인터뷰 기록의 고유 식별자입니다.
 * @property enterpriseName - 인터뷰 기록과 연관된 기업의 이름입니다.
 * @property category - 인터뷰 기록의 카테고리 또는 유형입니다.
 * @property createdAt - 인터뷰 기록이 생성된 시간을 나타내는 타임스탬프입니다.
 * @property updatedAt - 인터뷰 기록이 마지막으로 업데이트된 시간을 나타내는 타임스탬프입니다.
 */
export interface InterviewRecordSidebarDTO {
    interviewRecordId: string;
    enterpriseName: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * `InterviewRecordSidebarDTO` 객체 배열을 `Summary` 객체 배열로 변환합니다.
 *
 * @param dto - 변환할 `InterviewRecordSidebarDTO` 객체 배열입니다.
 * @returns 제공된 DTO로 생성된 `Summary` 객체 배열입니다.
 */
export function dtoToSide(dto: InterviewRecordSidebarDTO[]) {
    return dto.map(
        (item) =>
            new Summary(
                item.interviewRecordId,
                item.enterpriseName,
                item.category,
                item.createdAt,
                item.updatedAt,
            ),
    );
}
