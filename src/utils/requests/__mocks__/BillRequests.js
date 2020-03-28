const mockGetBill = jest.fn((token) => {
    try{
        if(token === "good")
            return Promise.resolve(
                [
                    {
                        id: 1,
                        name: "string",
                        status: "OPEN",
                        category: "string",
                        balance: 10.00
                    },
                    {
                        id: 2,
                        name: "string",
                        status: "OPEN",
                        category: "string",
                        balance: 14.000
                    }
                ]
            );
        else if (token === "bad")
            return Promise.resolve(
                []
            );
        else 
            return Promise.resolve(
                {
                    status: "UNAUTHORIZED",
                    timestamp: "time",
                    message: "Access is unauthorized!",
                    errors: []
                }
            );
    }catch(error){
        throw(error)
    };
});

export default mockGetBill
