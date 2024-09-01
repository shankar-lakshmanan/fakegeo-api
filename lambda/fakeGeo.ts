import { Point } from "./functions/point/point";

exports.handler = async (event:any) => {
    // Extract the HTTP method and path from the event object
    const { httpMethod, path } = event;

    // Initialize a default response
    let response = {
        statusCode: 404,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ message: "Not Found" }),
    };

    if (httpMethod === "GET"){
        switch(path) { 
            case "/fakegeo": { 
                response = {
                    statusCode: 200,
                    headers: { "Content-Type": "text/plain" },
                    body: JSON.stringify({ message: "Hello, FakeGeo!" }),
                };
               break; 
            } 
            case "/point": { 
                response = Point()
               break; 
            }
            default: { 
               //statements; 
               break; 
            } 
         } 
    }
    
    return response
};