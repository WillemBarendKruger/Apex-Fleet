import { Flex, Spin } from "antd";

const Loader = () => {
    return (
        <Flex
            justify="center"
            align="center"
            style={{ marginBottom: 20, width: "100%", height: "100vh" }}
        >
            <Spin size="large" />
        </Flex>
    );
}

export default Loader;