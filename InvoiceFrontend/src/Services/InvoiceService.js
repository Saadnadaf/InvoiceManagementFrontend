import api from "../lib/api"

export function createInvoice(payload){

    return api.post("/invoice",payload);
}


export function getinvoices(){
    return api.get("/invoice");
}

export function getinvoice(id){
    return api.get(`/invoice/${id}`);
}

export function deleteInvoice(id){
    return api.delete(`/invoice/${id}`);
}

export function updateInvoice(id,payload){
    return api.put(`/invoice/${id}`,payload);
}