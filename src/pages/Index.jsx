import React, { useState } from "react";
import { Container, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://backengine-444j.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Perform further actions with accessToken, like storing in context or local storage
        toast({
          title: "Login successful!",
          description: "You are now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error || "An error occurred during login.");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent p={4}>
      <FormControl id="email" isRequired mt={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      </FormControl>
      <FormControl id="password" isRequired mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
      </FormControl>
      <Button leftIcon={<FaSignInAlt />} colorScheme="blue" mt={4} isLoading={loading} onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default Index;
