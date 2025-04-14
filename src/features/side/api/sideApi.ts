import { client } from "@/shared/api";
import { Summary } from "@/entities/records/model";
import { dtoToSide } from "../service";

/**
 * 서버에서 사이드바 데이터를 가져옵니다.
 *
 * @returns `Summary` 객체 배열을 반환하는 Promise입니다.
 * @throws HTTP 요청이 실패하면 에러를 던집니다.
 */
export const fetchSidebarData = async (): Promise<Summary[]> => {
    const response = await client.get("/sidebar");
    return dtoToSide(response.data);
};
