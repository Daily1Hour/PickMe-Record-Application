/**
 * 인터뷰 기록 요약을 나타냅니다.
 */
export class Summary {
    /**
     * Summary 클래스의 인스턴스를 생성합니다.
     * 
     * @param interviewRecordId - 인터뷰 기록의 고유 식별자입니다.
     * @param enterpriseName - 기록과 연관된 기업의 이름입니다.
     * @param category - 인터뷰 기록의 카테고리입니다.
     * @param createdAt - 기록이 생성된 타임스탬프입니다.
     * @param updatedAt - 기록이 마지막으로 업데이트된 타임스탬프입니다.
     */
    constructor(
        public interviewRecordId: string,
        public enterpriseName: string,
        public category: string,
        public createdAt: string,
        public updatedAt: string
    ) { }
}