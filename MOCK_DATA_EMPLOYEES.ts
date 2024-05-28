import { Employee } from './src/api/data-contracts';

export const MOCK_DATA_EMPLOYEES: Employee[] = [
  {
    employeeId: 1,
    name: 'Queenie Lamyman',
    email: 'qlamyman0@digg.com',
    orderList: [
      {
        orderId: 56,
        key: 'Ara',
        title: 'Worboy',
        description: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
        price: 319097,
        imageUrl: 'http://dummyimage.com/100x100.png/ff4444/ffffff',
        status: 'PENDING',
        acceptedAt: '2024-03-29',
        deadlineAt: '2023-06-29',
        completedAt: '2024-04-23',
      },
      {
        orderId: 89,
        key: 'Linnea',
        title: 'Boumphrey',
        description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        price: 583578,
        imageUrl: 'http://dummyimage.com/100x100.png/dddddd/000000',
        status: 'NEW',
        acceptedAt: '2024-01-28',
        deadlineAt: '2023-08-22',
        completedAt: '2023-12-19',
      },
      {
        orderId: 15,
        key: 'Basia',
        title: 'Coverly',
        description:
          'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
        price: 430774,
        imageUrl: 'http://dummyimage.com/100x100.png/ff4444/ffffff',
        status: 'IN_PROGRESS',
        acceptedAt: '2023-06-02',
        deadlineAt: '2023-09-08',
        completedAt: '2023-07-17',
      },
    ],
    position: 'Technical Writer',
    status: 'Авторизован',
  },
  {
    employeeId: 2,
    name: 'Isaak Iorizzo',
    email: 'iiorizzo1@discovery.com',
    orderList: [
      {
        orderId: 69,
        key: 'Amos',
        title: 'Grogor',
        description:
          'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        price: 518537,
        imageUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        status: 'CHECKING',
        acceptedAt: '2023-11-25',
        deadlineAt: '2024-01-19',
        completedAt: '2024-04-14',
      },
      {
        orderId: 96,
        key: 'Andie',
        title: 'Wadman',
        description:
          'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        price: 961032,
        imageUrl: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        status: 'DISPATCHED',
        acceptedAt: '2023-12-17',
        deadlineAt: '2023-06-24',
        completedAt: '2023-11-27',
      },
    ],
    position: 'Tax Accountant',
    status: 'Отправлено приглашение',
  },
];
