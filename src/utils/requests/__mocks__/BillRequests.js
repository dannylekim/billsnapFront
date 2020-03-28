const mockGetBill = jest.fn((token) => {
    try{
        if(token === "userHasBills")
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
        else if (token === "userHasNoBills")
            return Promise.resolve(
                []
            );
        else 
            return Promise.resolve(
                {
                    status: "UNAUTHORIZED",
                    message: "Access is unauthorized!"
                }
            );
    }catch(error){
        throw(error)
    };
});

export default mockGetBill
