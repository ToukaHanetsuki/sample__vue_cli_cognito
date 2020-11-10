export interface Methods {
  post: {
    reqBody: {
      mail_address: string;
      password: string;
    };

    resBody: ExampleUser;
  };
}
