import { MdAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@chakra-ui/react";
import {
    DrawerLayout,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    PaginateController,
    IconButton,
    List,
    Item,
} from "@styleguide/react";

import { Summary } from "@/entities/records/model";
import { usePagination } from "./hook/usePagination";
import { fetchSidebarData } from "./api/sideApi";

/**
 * 쿼리로 가져온 메뉴 항목의 페이지네이션 목록을 표시하는 Sidebar 컴포넌트입니다.
 *
 * 이 컴포넌트는 `useQuery` 훅을 사용하여 사이드바 데이터를 가져오고, `usePagination`
 * 훅을 사용하여 메뉴 항목의 페이지네이션을 처리합니다. 헤더, 본문, 푸터로 구성된
 * 드로어 레이아웃을 렌더링합니다. 본문에는 새 항목을 작성하는 버튼과 개별 항목으로
 * 이동하는 링크가 포함된 목록이 있습니다. 푸터에는 페이지네이션 컨트롤이 포함됩니다.
 *
 * @returns {JSX.Element} 렌더링된 Sidebar 컴포넌트입니다.
 *
 * @remarks
 * - `useQuery` 훅은 쿼리 키 `["side"]`로 데이터를 가져오며, 창 포커스 시 재요청을
 *   비활성화합니다.
 * - `usePagination` 훅은 포맷된 메뉴 항목의 페이지네이션을 관리합니다.
 * - 데이터 가져오는 중 오류가 발생하면 빨간색으로 오류 메시지를 표시합니다.
 *
 * - 데이터 가져오기를 위한 `react-query`의 `useQuery`.
 * - 페이지네이션 로직 처리를 위한 `usePagination`.
 * - 레이아웃을 위한 `DrawerLayout`, `DrawerHeader`, `DrawerBody`, `DrawerFooter`.
 * - UI 컴포넌트를 위한 `List`, `Item`, `NavLink`, `IconButton`, `Text`, `PaginateController`.
 * - 추가 아이콘을 위한 `react-icons/md`의 `MdAdd`.
 *
 * - `useQuery<Summary[]>`: 사이드바 데이터를 가져옵니다.
 * - `usePagination`: 메뉴 항목의 페이지네이션을 처리합니다.
 * - `isError`가 true일 경우 빨간색으로 오류 메시지를 표시합니다.
 * - `formattedMenuItems`: 쿼리로 가져온 데이터를 포맷하여 메뉴 항목으로 변환합니다.
 */
const Sidebar = () => {
    const {
        data: summary,
        isError,
        error,
    } = useQuery<Summary[]>({
        queryKey: ["side"],
        queryFn: fetchSidebarData,
        refetchOnWindowFocus: false,
    });

    const formattedMenuItems = summary?.map((item) => ({
        id: item.interviewRecordId,
        label: `${item.enterpriseName} | ${item.category}`,
    }));

    const { paginatedItems, handlePageChange, currentPage, totalPages } =
        usePagination<{
            id: string;
            label: string;
        }>(formattedMenuItems || []);

    return (
        <DrawerLayout>
            <DrawerHeader>
                <Text textStyle="xl" fontWeight="semibold">
                    목록
                </Text>
            </DrawerHeader>

            <DrawerBody>
                <List separator>
                    <Item justify="center" as={NavLink} to={`/`}>
                        <IconButton size="xs" title="작성하기">
                            <MdAdd />
                        </IconButton>
                    </Item>

                    {paginatedItems.map((item) => (
                        <Item key={item.id} as={NavLink} to={`/${item.id}`}>
                            <Text m={3}>{item.label}</Text>
                        </Item>
                    ))}
                    {isError && <Text color="red.500">{error.message}</Text>}
                </List>
            </DrawerBody>

            <DrawerFooter>
                <PaginateController
                    {...{ handlePageChange, currentPage, totalPages }}
                />
            </DrawerFooter>
        </DrawerLayout>
    );
};

export default Sidebar;
