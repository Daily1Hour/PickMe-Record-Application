import React, { useState } from "react";
import { Text, Editable, EditableControl } from "@chakra-ui/react";
import { Field } from "@/shared/chakra-ui/Field";

/**
 * 레이블, 미리보기 및 텍스트 영역이 포함된 편집 가능한 필드를 렌더링하는 React 컴포넌트입니다.
 * 문자 수 추적을 지원하며 입력에 대한 최대 길이를 강제합니다.
 *
 * @param props - 컴포넌트의 속성입니다.
 * @param props.value - 편집 가능한 필드의 초기 값입니다.
 * @param props.onChange - 값이 변경될 때 트리거되는 이벤트 핸들러입니다.
 * @param props.label - 편집 가능한 필드에 표시되는 레이블입니다.
 *
 * @returns {JSX.Element} 렌더링된 편집 가능한 필드 컴포넌트입니다.
 */
export default function EditableField({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: React.FormEventHandler;
    label: string;
}) {
    const maxLength = 1000;
    const [textLength, setTextLength] = useState<number>(value.length);

    return (
        <Field label={label}>
            <Editable.Root
                maxLength={maxLength}
                defaultValue={value}
                onSubmit={onChange}
                onChange={onChange}
                onValueChange={(e) => setTextLength(e.value.length)}
            >
                <Editable.Preview>
                    {value || `${label}을 입력해주세요`}
                </Editable.Preview>
                <Editable.Textarea h="100px" />

                <Text color="gray.400">
                    {!!textLength && `${textLength} / ${maxLength}`}
                </Text>

                <EditableControl />
            </Editable.Root>
        </Field>
    );
}
