import { Outlet } from "react-router-dom";
import { Container } from "@styleguide/react";

import Sidebar from "@/features/side";
import { Flex } from "@chakra-ui/react";

const RecordPage = () => {
    return (
        <Container>
            <Sidebar />
            <Flex paddingLeft="25%" paddingRight="25%" flexDirection="column">
                <Outlet />
            </Flex>
        </Container>
    );
};

export default RecordPage;
