import {
    Box,
    Button,
    Dialog,
    Field,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Portal,
    Stack,
    Text,
} from "@chakra-ui/react";
import { FaDumpster, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "./ui/toaster";
import { useRef, useState } from "react";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { updateProduct, deleteProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                status: "error",
                type: "error",
                isClosable: true,
            });
        } else {
            toaster.create({
                title: "Success",
                description: message,
                status: "success",
                type: "success",
                isClosable: true,
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                status: "error",
                type: "error",
                isClosable: true,
            });
        } else {
            toaster.create({
                title: "Success",
                description: message,
                status: "success",
                type: "success",
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow="lg"
            margin={{
                base: 5,
                md: 7,
                lg: 8,
            }}
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w="full"
                const
                handle
                objectFit="cover"
            />
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <IconButton colorPalette="blue">
                                <FaEdit />
                            </IconButton>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Dialog Header</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body pb="4">
                                        <Stack gap="4">
                                            <Field.Root>
                                                <Field.Label>Name</Field.Label>
                                                <Input
                                                    onChange={(e) =>
                                                        setUpdatedProduct({
                                                            ...updatedProduct,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Name"
                                                    value={updatedProduct.name}
                                                />
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label>Price</Field.Label>
                                                <Input
                                                    placeholder="Price"
                                                    value={updatedProduct.price}
                                                    onChange={(e) =>
                                                        setUpdatedProduct({
                                                            ...updatedProduct,
                                                            price: e.target.value,
                                                        })
                                                    }
                                                />
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label>Image Url</Field.Label>
                                                <Input
                                                    placeholder="Image Url"
                                                    value={updatedProduct.image}
                                                    onChange={(e) =>
                                                        setUpdatedProduct({
                                                            ...updatedProduct,
                                                            image: e.target.value,
                                                        })
                                                    }
                                                />
                                            </Field.Root>
                                        </Stack>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        <Dialog.ActionTrigger asChild>
                                            <Button
                                                onClick={() =>
                                                    handleUpdateProduct(product._id, updatedProduct)
                                                }
                                            >
                                                Save
                                            </Button>
                                        </Dialog.ActionTrigger>
                                    </Dialog.Footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                    <IconButton
                        colorPalette="red"
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <MdDelete />
                    </IconButton>
                </HStack>
            </Box>
            <Toaster />
        </Box>
    );
};

export default ProductCard;
