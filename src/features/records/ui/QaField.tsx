import { Controller, useFormContext } from "react-hook-form";
import { Stack } from "@chakra-ui/react";

import EditableField from "./EditableField";

/**
 * 주어진 레코드에 대한 편집 가능한 필드를 렌더링하는 React 함수형 컴포넌트입니다.
 * `react-hook-form`의 `Controller`를 사용하여 폼 상태와 유효성을 관리합니다.
 *
 * @param props - 컴포넌트의 props입니다.
 * @param props.name - 폼 필드의 기본 이름입니다.
 * @param props.detailIndex - 렌더링할 세부 항목의 인덱스입니다.
 *
 * @returns {JSX.Element} "질문"과 "답변" 유형의 편집 가능한 필드 스택을 반환합니다.
 *
 * @remarks
 * - `types` 배열은 "질문"과 "답변"이라는 두 가지 필드 유형을 정의합니다.
 * - `korType` 객체는 이러한 유형을 해당 한국어 레이블로 매핑합니다.
 * - `react-hook-form`의 `Controller` 컴포넌트를 사용하여 폼 필드를 폼 컨텍스트에 바인딩합니다.
 * - `EditableField` 컴포넌트는 레이블이 있는 실제 입력 필드를 렌더링하는 데 사용됩니다.
 */
export const QaField = ({
    name,
    detailIndex,
}: {
    name: string;
    detailIndex: number;
}) => {
    const types = ["question", "answer"];
    const korType: Record<string, string> = {
        question: "면접 질문",
        answer: "답변",
    };
    const { control } = useFormContext();

    return (
        <Stack spaceY={4}>
            {types.map((type) => (
                <Controller
                    name={`${name}.${detailIndex}.${type}`}
                    control={control}
                    render={({ field }) => (
                        <EditableField {...field} label={korType[type]} />
                    )}
                />
            ))}
        </Stack>
    );
};
