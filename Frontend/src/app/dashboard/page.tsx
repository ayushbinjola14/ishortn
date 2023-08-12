'use client';
import React from 'react';
import { Code } from '@nextui-org/react';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import LinksTable from './links-table';
import CountUp from 'react-countup';

const top5Referrers = [
  {
    name: 'Github',
    count: 2492,
  },
  {
    name: 'Google',
    count: 1235,
  },
  {
    name: 'Facebook',
    count: 950,
  },
  {
    name: 'Twitter',
    count: 320,
  },
  {
    name: 'Instagram',
    count: 100,
  },
];

const washedColorsToUseForTop5ReferrersBackground = [
  'bg-blue-200/20',
  'bg-green-200/20',
  'bg-yellow-200/20',
  'bg-red-200/20',
  'bg-purple-200/20',
];

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        <Card
          isBlurred
          isPressable
          shadow="lg"
          className="border-none bg-background/60 dark:bg-default-100/50 min-w-[350px]"
        >
          <CardHeader>Top 5 referrers</CardHeader>

          <CardBody className="flex flex-col gap-1.5">
            {top5Referrers.map((referrer, index) => (
              <Card
                key={index}
                className={`${washedColorsToUseForTop5ReferrersBackground[index]}`}
              >
                <CardBody className="flex p-3 flex-row gap-4 justify-between items-center">
                  <span>{referrer.name}</span>
                  <Chip color="success" variant="bordered">
                    {referrer.count}
                  </Chip>
                </CardBody>
              </Card>
            ))}
          </CardBody>
        </Card>

        {/* Best performing link card */}
        <Card
          isBlurred
          isPressable
          shadow="lg"
          className="border-none bg-background/60 dark:bg-default-100/50 min-w-[350px]"
        >
          <CardHeader>Best performing link</CardHeader>

          <CardBody className="flex flex-col gap-1.5">
            <Code className="text-center">ishortn.ink/rafce</Code>
            <span className="text-center mt-2 inline-block">
              https://www.github.com
            </span>

            <div className="flex-1 flex justify-center items-center flex-col">
              {/* <span className="text-8xl text-green-500 font-ocean text-center">
                4920
              </span> */}
              <CountUp
                end={3220}
                duration={2.8}
                className="text-8xl text-green-500 font-ocean text-center"
              />
              <span className="text-sm">clicks</span>
            </div>
          </CardBody>
        </Card>

        <Card
          isBlurred
          isPressable
          shadow="lg"
          className="border-none bg-background/60 dark:bg-default-100/50 min-w-[350px]"
        >
          <CardHeader>Total links shortened</CardHeader>

          <CardBody className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center w-full">
              <Code className="text-center w-full">ishortn.ink/rafce</Code>
              <span className="mt-2">Most Recent</span>
            </div>
            <div className="flex flex-col flex-1 justify-center">
              {/* <span className="text-8xl text-green-500 font-ocean text-center">
                4920
              </span> */}
              <CountUp
                end={4920}
                duration={2.75}
                className="text-8xl text-green-500 font-ocean text-center"
              />
              <span className="text-center text-sm">Links</span>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="w-full mt-5">
        <LinksTable />
      </div>
    </>
  );
};

export default Dashboard;
