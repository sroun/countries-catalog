import http from "@/libs/http";

export const getCountry = () => http.get('/all');