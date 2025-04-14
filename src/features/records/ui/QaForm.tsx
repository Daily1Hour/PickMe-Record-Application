import { useFieldArray } from "react-hook-form";
import { Box } from "@chakra-ui/react";
import { List } from "@styleguide/react";

import { QaField } from "./QaField";
import { AddDetail } from "./AddDetail";
import { DeleteDetail } from "./DeleteDetail";

/**
 * QaForm 컴포넌트
 *
 * 이 컴포넌트는 QA 세부 정보 목록을 관리하기 위한 폼을 렌더링합니다. `useFieldArray` 훅을 사용하여
 * 필드 배열을 동적으로 관리합니다. 각 필드는 `QaField` 컴포넌트로 표현되며, 사용자는 필요에 따라
 * 세부 정보를 추가하거나 삭제할 수 있습니다.
 *
 * @returns {JSX.Element} 렌더링된 QA 폼 컴포넌트.
 *
 * @remarks
 * - `useFieldArray` 훅은 동적 필드 배열을 관리하는 데 사용됩니다.
 * - 각 필드는 패딩 및 너비 스타일이 적용된 `Box` 컴포넌트 내에 렌더링됩니다.
 * - `List` 컴포넌트는 필드를 테두리와 구분선과 함께 표시하는 데 사용됩니다.
 * - `AddDetail` 컴포넌트는 배열에 새 필드를 추가하는 데 사용됩니다.
 * - `DeleteDetail` 컴포넌트는 배열에서 특정 필드를 제거하는 데 사용됩니다.
 */
export const QaForm = () => {
    const name = "details";
    const { fields, append } = useFieldArray({
        name,
    });

    return (
        <>
            <List bordered separator>
                {fields.map((field, detailIndex) => (
                    <Box p="16px" w="100%" key={field.id}>
                        <QaField name={name} detailIndex={detailIndex} />
                        <DeleteDetail detailIndex={detailIndex} />
                    </Box>
                ))}
            </List>
            <AddDetail append={append} />
        </>
    );
};
