import { Controller, useFormContext } from "react-hook-form";
import { Stack, Input } from "@chakra-ui/react";
import { Field } from "@/shared/chakra-ui/Field";

/**
 * `react-hook-form`의 컨텍스트를 사용하여 라벨을 위한 폼을 렌더링하는 React 함수형 컴포넌트입니다.
 * 지정된 타입에 따라 입력 필드를 동적으로 생성하며, 유효성 검사 오류가 있는 경우 이를 표시합니다.
 *
 * @returns {JSX.Element} 렌더링된 LabelForm 컴포넌트.
 *
 * @remarks
 * - 이 컴포넌트는 `react-hook-form`의 `useFormContext`를 사용하여 폼 컨트롤과 오류를 접근합니다.
 * - `Controller` 컴포넌트를 사용하여 `react-hook-form`과 커스텀 입력 컴포넌트를 통합합니다.
 * - 유효성 검사 오류가 존재하는 경우 입력 필드 아래에 오류 메시지가 표시됩니다.
 *
 * @example
 * ```ts
 * import { LabelForm } from './LabelForm';
 *
 * const App = () => (
 *   <FormProvider {...methods}>
 *     <LabelForm />
 *   </FormProvider>
 * );
 * ```
 *
 * @see {@link https://react-hook-form.com/api/useformcontext} `useFormContext`에 대한 자세한 내용은 여기를 참조하세요.
 * @see {@link https://react-hook-form.com/api/controller} `Controller`에 대한 자세한 내용은 여기를 참조하세요.
 */
export const LabelForm = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const types = ["enterpriseName", "category"];
    const korType: Record<string, string> = {
        enterpriseName: "회사 이름",
        category: "면접 유형",
    };
    console.log(errors["enterpriseName"]);

    return (
        <Stack gap="10">
            {types.map((type) => (
                <Controller
                    key={type}
                    name={type}
                    control={control}
                    render={({ field }) => (
                        <Field
                            invalid={!!errors[type]}
                            errorText={errors[type]?.message as string}
                        >
                            <Input
                                {...field}
                                variant="flushed"
                                placeholder={`${korType[type]}`}
                            />
                        </Field>
                    )}
                />
            ))}
        </Stack>
    );
};
