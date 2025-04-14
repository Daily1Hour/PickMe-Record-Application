import { Detail } from "./Detail";

/**
 * 엔터프라이즈에 대한 세부 정보를 포함하는 레코드 엔터티를 나타냅니다.
 */
export class Record {
    /**
     * `Record` 클래스의 인스턴스를 생성합니다.
     * 
     * @param recordId - 레코드의 고유 식별자.
     * @param enterpriseName - 레코드와 연관된 엔터프라이즈의 이름.
     * @param category - 레코드의 카테고리.
     * @param createdAt - 레코드가 생성된 타임스탬프.
     * @param updatedAt - 레코드가 마지막으로 업데이트된 타임스탬프.
     * @param details - 레코드에 대한 추가 정보를 포함하는 `Detail` 객체 배열.
     */
    constructor(
        public recordId: string,
        public enterpriseName: string,
        public category: string,
        public createdAt: string,
        public updatedAt: string,
        public details: Detail[],
    ) { }

    /**
     * 기본값으로 빈 `Record` 인스턴스를 생성합니다.
     * 
     * @returns 빈 또는 기본값으로 설정된 새 `Record` 인스턴스.
     */
    static empty(): Record {
        return new Record("", "", "", "", "", []);
    }
}

