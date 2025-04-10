import React, { useState } from "react";
import { FaRegFilePdf, FaUpload } from "react-icons/fa6";
import { GrFormTrash } from "react-icons/gr";
import { Box, VStack, Input, Text, Button, HStack } from "@chakra-ui/react";

const PDFUploadForm: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [pdfURL, setPdfURL] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === "application/pdf") {
                setSelectedFile(file);
                setPdfURL(URL.createObjectURL(file));
            } else {
                alert("Only PDF files are allowed!");
                setSelectedFile(null);
                setPdfURL(null);
            }
        }
    };

    const handleFileDelete = () => {
        setSelectedFile(null);
        setPdfURL(null);
    };

    return (
        <Box
            p={8}
            width="30vw"
            height="80vh"
            minH="300px"
            position="fixed"
            alignContent="center"
            top="10vh"
            borderWidth="1px"
            borderRadius="md"
        >
            <VStack align="stretch">
                {!selectedFile && (
                    <Box>
                        <Text>이력서를 업로드 해주세요.</Text>
                        <label htmlFor="resume-upload">
                            <Box
                                p={5}
                                border="1px solid gray"
                                borderRadius="15px"
                                cursor="pointer"
                                _hover={{ bg: "gray.100" }}
                                display="flex"
                                flexDir="column"
                                alignItems="center"
                            >
                                <Text>PDF 업로드</Text>
                                <FaUpload size="24px" color="gray.500" />
                            </Box>
                        </label>
                        <Input
                            id="resume-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            display="none"
                        />
                    </Box>
                )}
                {selectedFile && (
                    <HStack justify="space-between" width="100%">
                        <Text>
                            <FaRegFilePdf />
                            <strong>{selectedFile.name}</strong>
                        </Text>
                        <Button
                            bg="none"
                            color="gray"
                            onClick={handleFileDelete}
                        >
                            <GrFormTrash />
                        </Button>
                    </HStack>
                )}
                {pdfURL && (
                    <Box mt={4} overflow="hidden" height="60vh">
                        <iframe
                            src={pdfURL}
                            width="100%"
                            height="100%"
                            title="PDF Preview"
                        ></iframe>
                    </Box>
                )}
                {!pdfURL && selectedFile && (
                    <Text color="red.500">업로드에 실패하였습니다.</Text>
                )}
            </VStack>
        </Box>
    );
};

export default React.memo(PDFUploadForm);
