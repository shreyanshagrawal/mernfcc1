import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import { Box, Button, Container, createToaster, Heading, Input, useToastStyles, VStack } from "@chakra-ui/react";
import { useState } from "react"

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });


    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        console.log(success)
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
            setNewProduct({name:"",price:"",image:""})
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"5xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box w={"full"} bg={useColorModeValue("white", "grey.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Name Of Product"
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />

                        <Input
                            placeholder="Price Of Product"
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />

                        <Input
                            placeholder="Image Of Product"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />

                        <Button colorScheme={'blue'} onClick={handleAddProduct}>Add Product</Button>

                    </VStack>

                </Box>
            </VStack>
            <Toaster/>
        </Container>

    )
}

export default CreatePage
