'use client';
import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import { Button } from '@nextui-org/react';

const RegisterPage = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginButtonClick = () => {
    console.log('Login button clicked');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    // Creating a login form using nextui
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Card
        isBlurred
        shadow="lg"
        // radius="lg"
        className="border-none bg-background/60 dark:bg-default-100/50 md:min-w-[400px]"
      >
        <CardBody className="flex flex-col gap-4 p-4">
          <div className="my-3">
            <h1 className="text-3xl font-bold text-center font-ocean">
              iShortn
            </h1>
            <h2 className="font-bold text-center font-mazzardRegular">
              Create your account
            </h2>
          </div>
          <Input
            variant="faded"
            placeholder="Enter your name"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <Input
            variant="faded"
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            variant="faded"
            placeholder="Enter your password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Checkbox defaultSelected>Remember me</Checkbox>
          <Button color="success" onClick={handleLoginButtonClick}>
            Register
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterPage;
