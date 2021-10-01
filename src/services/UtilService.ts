import Dayjs from 'dayjs';

export const delay = (s = 1) => {
  return new Promise(resolve => {
    setTimeout(() => {
      //@ts-ignore
      resolve();
    }, s * 1000);
  });
};

export const generateArray = (length: number): Array<number> => {
  return Array.from(Array(length).keys());
};

export const randomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const cloneDeep = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

export const toStringPrice = (num: number) => {
  if (!num) {
    return '0';
  }
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const toNumberPrice = (num: string) => {
  if (!num) {
    return 0;
  }
  return parseInt(num.replace(/,/g, ''));
};

export const getBankAccountId = (value: string | undefined) => {
  const getPosition = (value1: string, value2: string, index: number) => {
    return value1.split(value2, index).join(value2).length;
  };
  if (!value) {
    return undefined;
  }
  const first = value.search('-') + 1;
  const second = getPosition(value, '-', 2);
  return value.substring(first, second);
};

export const toFormatDate = (createdAt: number) => {
  return Dayjs(createdAt * 1000).format('DD/MM/YYYY - HH:mm');
};
