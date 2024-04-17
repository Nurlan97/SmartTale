export interface ICompany {
  id: number;
  companyName: string;
  logo: string;
  owner: IUser;
  staff: IUser[];
}

export interface IUser {
  id: number;
  companyId: number | null;
  roles: [];
  fullName: string;
  picture: string;
  email: string;
  phone: string;
}

export interface IOrder {
  id: number;
  userId: number;
  companyId: number; //Привязка к компании или пользователю
  title: string;
  pictures: string[];
  description: string;
  category: string;
  quantity: number;
  price: number;
}

export interface IProduct {
  id: number;
  userId: number;
  companyId: number; //Привязка к компании или пользователю
  title: string;
  pictures: string[];
  description: string;
  category: string;
  price: number;
}

export interface ICard {
  id: number;
  title: string;
  picture: string;
}

export interface IService {
  id: number;
  orderId: number;
  status: string;
  completed: number;
  workers: IWorker[];
}

export interface IWorker {
  id: number;
  userId: number;
  completed: number;
  salary: number;
}

export const register = {
  method: 'post',
  url: '/auth/',
  body: {
    fullName: 'string',
    email: 'string',
  },
  response: { message: 'string' },
};

export const emailValidate = {
  method: 'post',
  url: 'auth/confirmation',
  body: {
    email: 'string',
    code: 'string',
  },
  response: {
    message: 'string',
    accessToken: 'string',
    refreshToken: 'string',
  },
};

export const login = {
  method: 'post',
  url: '/auth/login',
  body: {
    email: 'string',
  },
  response: { message: 'string' },
};

export const refreshToken = {
  method: 'post',
  url: '/auth/refresh',
  body: {
    refreshToken: 'string',
  },
  response: {
    accessToken: 'string',
    refreshToken: 'string',
  },
};

export const resendEmailValidation = {
  method: 'post',
  url: 'auth/resend',
  body: { email: 'string' },
  response: { message: 'string' },
};

export const getUser = {
  method: 'get',
  url: '/users',
  headers: {
    authorisation: 'Bearer accessToken',
  },
  response: {
    id: 'number',
    companyId: 'number | null',
    roles: '[]',
    fullName: 'string',
    picture: 'string',
    email: 'string',
    phone: 'string',
  },
};

export const updateProfile = {
  method: 'put',
  url: '/users',
  headers: {
    authorisation: 'Bearer string',
    contentType: 'multipart/form-data',
  },
  body: {
    phone: 'string',
    fullName: 'string',
    email: 'string',
    picture: 'file',
  },
  response: {
    profile: {
      phone: 'string',
      fullName: 'string',
      email: 'string',
      picture: 'string',
      accessToken: 'string', //Токены могут не приходить
      refreshToken: 'string',
    },
  },
};

export const logout = {
  method: 'delete',
  url: '/users',
  headers: {
    authorisation: 'Bearer token',
  },
  body: {
    refreshToken: 'string',
  },
  response: 'string',
};

export const market = {
  method: 'get',
  url: 'market/{group}', //group - product, service
  headers: {
    authorisation: 'Bearer string',
  },
  queryParams: ['category', 'page', 'limit', 'sort'],
  response: {
    content: [
      {
        id: 'number',
        title: 'string',
        pictures: ['string'],
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 12,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: false,
    totalPages: 4,
    totalElements: 40,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    size: 12,
    numberOfElements: 12,
    empty: false,
  },
};

export const getDescription = {
  method: 'get',
  url: 'market/{id}',
  headers: {
    authorisation: 'Bearer string',
  },
  response: {
    data: {
      id: 'number',
      userId: 'number',
      companyId: 'number', //Привязка к компании или пользователю
      userName: 'string',
      companyName: 'string',
      phone: 'string',
      lastSeen: 'string',
      registrationDate: 'string',
      views: 'number',
      title: 'string',
      pictures: ['string'],
      description: 'string',
      group: 'string',
      quantity: 'number',
      price: 'number',
      date: 'string',
    },
  },
};

export const getProfile = {
  method: 'get',
  url: 'profile/{id}',
  headers: {
    authorisation: 'Bearer string',
  },
  response: {
    data: {
      id: 'number',
      name: 'string',
      phone: 'string',
      lastSeen: 'string',
      registrationDate: 'string',
      picture: 'string',
      companyId: 'number',
      companyName: 'string',
      companyLogo: 'string',
    },
  },
};

export const getCompany = {
  method: 'get',
  url: 'company/{id}',
  headers: {
    authorisation: 'Bearer string',
  },
  response: {
    data: {
      id: 'number',
      name: 'string',
      phone: 'string',
      lastSeen: 'string',
      registrationDate: 'string',
      logo: 'string',
      ownerId: 'number',
      ownerName: 'string',
      ownerPicture: 'string',
      activeAds: [
        {
          id: 'number',
          title: 'string',
          pictures: ['string'],
        },
      ],
    },
  },
};

export const updateCompany = {
  method: 'put',
  url: 'company/{id}',
  headers: {
    authorisation: 'Bearer string',
  },
  body: {
    name: 'string',
    phone: 'string',
    email: 'string',
    logo: 'file',
  },
  response: {
    data: {
      name: 'string',
      phone: 'string',
      email: 'string',
      logo: 'string',
    },
  },
};

export const addOrder = {
  method: 'post',
  url: 'orders',
  headers: {
    authorisation: 'Bearer string',
  },
  body: {
    title: 'string',
    pictures: ['file'],
    description: 'string',
    orderItems: [
      {
        type: 'string',
        size: 'string',
        quantity: 'string',
        color: 'string',
        material: 'string',
        details: 'string',
        price: 'number',
      },
    ],
    deadline: 'string',
  },
  response: 'string',
};

export const addProduct = {
  method: 'post',
  url: 'products',
  headers: {
    authorisation: 'Bearer string',
  },
  body: {
    title: 'string',
    pictures: ['file'],
    description: 'string',
    price: 'number',
  },
  response: 'string',
};

export const buyProduct = {
  method: 'post',
  url: 'products/{id}',
  headers: {
    authorisation: 'Bearer string',
  },
  response: 'string',
};

export const acceptOrder = {
  method: 'post',
  url: 'orders/{id}',
  headers: {
    authorisation: 'Bearer string',
  },
  response: 'string',
};

export const myAds = {
  method: 'get',
  url: 'profile/{group}', //group - product, service
  headers: {
    authorisation: 'Bearer string',
  },
  queryParams: ['page', 'limit', 'sort'],
  response: {
    content: [
      {
        id: 'number',
        title: 'string',
        pictures: ['string'],
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 12,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: false,
    totalPages: 4,
    totalElements: 40,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    size: 12,
    numberOfElements: 12,
    empty: false,
  },
};
