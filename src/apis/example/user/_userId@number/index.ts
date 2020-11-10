export interface Methods {
  get: {
    resBody: ExampleUser;
  };
  put: {
    reqBody: {
      name: string;
    };

    resBody: ExampleUser;
  };
}
