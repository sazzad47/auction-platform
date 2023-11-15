interface signupResponse {
    data: {
        status: number;
        statusCode: number;
        message: string;
        data : {
            token: string;
            user: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                birthdayDate: Date;
            }
        }
    }
  }
  
  export default signupResponse;