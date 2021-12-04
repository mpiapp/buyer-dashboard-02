import { rest } from 'msw' 

export const handlers = [

    // mock login response
    rest.post(`${process.env.REACT_APP_API_URL_STAGING}/admin/login`, (req, res, ctx) => {
      return res(ctx.json({
          access_token : 'accesstoken',
          id_token : 'idtoken', 
          role: "superuser",
          expires_in : 9000,
          email : "johndoe@gmail.com",
          fullname : "John Doe",
          avatar : "https://image.com",
          auth_id : "authid",
          login: true
        }))
    }),
   

]