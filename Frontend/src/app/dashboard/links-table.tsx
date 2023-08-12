import React, { Key } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Code,
} from '@nextui-org/react';
import { HiOutlineCursorClick } from 'react-icons/hi';

const rows = [
  {
    key: '1',
    shortendLink: 'ishortn.com/xyz',
    originalLink: 'yourlanding.you',
    date: '30/08/2021',
    clicks: 30210,
  },
  {
    key: '2',
    shortendLink: 'ishortn.com/abc',
    originalLink: 'somewebsite.xyz',
    date: '20/10/21',
    clicks: 30210,
  },
  {
    key: '3',
    shortendLink: 'ishortn.com/def',
    originalLink: 'yourlanding.you',
    date: '30/08/2021',
    clicks: 302130,
  },
  {
    key: '4',
    shortendLink: 'ishortn.com/ghi',
    originalLink: 'somewebsite.xyz',
    date: '20/10/21',
    clicks: 200,
  },
  {
    key: '3',
    shortendLink: 'ishortn.com/def',
    originalLink: 'yourlanding.you',
    date: '30/08/2021',
    clicks: 302130,
  },
  {
    key: '4',
    shortendLink: 'ishortn.com/ghi',
    originalLink: 'somewebsite.xyz',
    date: '20/10/21',
    clicks: 200,
  },
];

const columns = [
  {
    key: 'shortendLink',
    label: 'SHORTEND LINK',
  },
  {
    key: 'originalLink',
    label: 'ORIGINAL URL',
  },
  {
    key: 'date',
    label: 'DATE CREATED',
  },
  {
    key: 'clicks',
    label: 'CLICKS',
  },
];

export default function LinksTable() {
  const clickToCopyToClipboard = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as HTMLSpanElement;
    const text = target.innerText;
    navigator.clipboard.writeText(text);
  };

  const renderCell = React.useCallback((item: unknown, columnKey: Key) => {
    const value = getKeyValue(item, columnKey);
    switch (columnKey) {
      case 'clicks':
        return (
          <Chip
            variant="faded"
            color="success"
            endContent={<HiOutlineCursorClick />}
          >
            {value}
          </Chip>
        );
      case 'shortendLink':
        return (
          <Code className="text-center" onClick={clickToCopyToClipboard}>
            {value}
          </Code>
        );
      default:
        return <span>{value}</span>;
    }
  }, []);

  return (
    <Table aria-label="Shortened Links History">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                {/* {getKeyValue(item, columnKey)} */}
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
