import platform from 'platform';
import axios from 'axios';

interface CountryIsAPIResponse {
  country: string;
  ip: string;
}

export const getClientPlatformDetails = async (userAgent: string) => {
  const device = platform.parse(userAgent);

  const deviceInfoObject = {
    browser: device.name as string,
    platform: device.os?.family as string,
    version: device.os?.version as string,
  };

  return deviceInfoObject;
};

export const getCountryFromIP = async (ip: string) => {
  const response = await axios
    .get(`https://api.country.is/${ip}`)
    .then((res) => res.data as CountryIsAPIResponse);
  console.log(response);
  return response.country;
};
