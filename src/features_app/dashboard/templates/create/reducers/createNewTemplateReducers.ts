import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCredentials } from '../../../../../utilities/config';
// import { IProductItem } from '../../templateTypes';
import { remove } from 'lodash'
import axios from 'axios';
import { groupBy } from 'lodash'

const LBase = require("localbase");
const db: any = new LBase.default("db");
db.config.debug = false

export const getLocalDBTemplate = createAsyncThunk(
    'carts-template/get',
    async (_, { rejectWithValue }) => {
        try {
            const data_carts = await db.collection('db_local_template').get()
            if(data_carts) {
                return data_carts
            }
          } catch (err : any) {
            return rejectWithValue(err)
        }
    }
);


export const addToLocalDBTemplate = createAsyncThunk(
    'carts-template/add', 
    async (value : any, { rejectWithValue }) => {
        const data_send : any = {
            "vendorId": value.vendor_id,
            "vendor" : value.vendor,
            "name": value.name,
            "vendor_name" : value.vendor_name,
            "sku": value.SKU,
            "slug": value.slug_product,
            "brand": value.brand,
            "images_product": value.images_product[0],
            "storage": value.storage,
            "dimension": value.dimension,
            "sub_products": value.sub_products,
            // "measurement": value.measurement,
            "warehouse": value.warehouse,
            "retail_price": value.retail_price,
            "discount": value.discount,
            "discount_price": value.discount_price,
            "quantity": 1,
            "sub_total" : value.discount >= 1 ? value.discount_price : value.retail_price,
            "payment_term": value.payment_term,
            "note" : ""
        }

        const data_carts = await db.collection('db_local_template').get()

        if(data_carts.length === 0) {
            try {
                const add_carts = await db.collection('db_local_template').add(data_send)
                localStorage.removeItem('id_cart_pr')
                if(add_carts) {
                    return {success : true, message : "Success Added Item to Cart!"}
                }
            } catch (error) {
                return rejectWithValue(error)
            }
        } else {
            if(data_carts.find((element : any) => element.name === value.name)) {
                let discount = data_carts.find((element : any) => element.name === value.name).discount
                let quantity = data_carts.find((element : any) => element.name === value.name).quantity + 1
                try {
                    const result = await db.collection('db_local_template')
                        .doc({ name: value.name })
                        .update({
                            quantity: quantity,
                            sub_total : discount >= 1 ? quantity * value.discount_price : quantity * value.retail_price
                        })
    
                    if(result) {
                        return {success : true, message : "Success Added Item to Cart!"}
                    }
                } catch (error) {
                    return rejectWithValue(error)
                }
            } else {
                try {
                    const add_carts = await db.collection('db_local_template').add(data_send)
                    if(add_carts) {
                        return {success : true, message : "Success Added Item to Cart!"}
                    }
                } catch (error) {
                    return rejectWithValue(error)
                }
            }
        }
    }
)

export const addQuantityProductTemplate = createAsyncThunk(
    'carts-template/add-quantity', 
    async (value : any, { rejectWithValue }) => {
        const data_carts = await db.collection('db_local_template').get()
        if(data_carts.find((element : any) => element.name === value.name)) {
            let discount = data_carts.find((element : any) => element.name === value.name).discount
            let quantity = data_carts.find((element : any) => element.name === value.name).quantity + 1
            try {
                const result = await db.collection('db_local_template')
                    .doc({ name: value.name })
                    .update({
                        quantity: quantity,
                        sub_total : discount >= 1 ? quantity * value.discount_price : quantity * value.retail_price
                    })

                if(result) {
                    return {success : true, message : "Success Increase Item Quantity!"}
                }
            } catch (error) {
                return rejectWithValue(error)
            }
        }
    }
)

export const removeQuantityProductTemplate = createAsyncThunk(
    'carts-template/remove-quantity', 
    async (value : any, { rejectWithValue }) => {
        const data_carts = await db.collection('db_local_template').get()

        if(data_carts.find((element : any) => element.name === value.name)) {
            let discount = data_carts.find((element : any) => element.name === value.name).discount
            let quantity = data_carts.find((element : any) => element.name === value.name).quantity
            
            if(quantity <= 1) {
                try {
                    const result = await db.collection('db_local_template')
                        .doc({ name: value.name })
                        .delete()
    
                    if(result) {
                        return {success : true, message : "Success Remove Item!"}
                    }
                } catch (error) {
                    return rejectWithValue(error)
                }
            } else { 
                let change_quantity = data_carts.find((element : any) => element.name === value.name).quantity - 1
                try {
                    const result = await db.collection('db_local_template')
                        .doc({ name: value.name })
                        .update({
                            quantity: change_quantity,
                            sub_total : discount >= 1 ? change_quantity * value.discount_price : change_quantity * value.retail_price
                        })
    
                    if(result) {
                        return {success : true, message : "Success Decrease Item Quantity!"}
                    }
                } catch (error) {
                    return rejectWithValue(error)
                }

            }
        }
    }
)

export const removeItemProductTemplate = createAsyncThunk(
    'carts-template/remove-item', 
    async (value : any, { rejectWithValue }) => {
        const data_carts = await db.collection('db_local_template').get()

        if(data_carts.find((element : any) => element.name === value.name)) {
            try {
                const result = await db.collection('db_local_template')
                    .doc({ name: value.name })
                    .delete()

                if(result) {
                    return {success : true, message : "Success Remove Item!"}
                }
            } catch (error) {
                return rejectWithValue(error)
            }
        }
    }
)

export const removeVendorItemsTemplate = createAsyncThunk(
    'carts-template/remove-allitemvendor', 
    async (value : any, { rejectWithValue }) => {
        const data_carts = await db.collection('db_local_template').get() 
        
        if(data_carts.find((element : any) => element.vendor_name === value.vendor_name)) {
            const vendorItems = remove(data_carts, function(obj : any) {
                return obj.vendor_name !== value.vendor_name
            });
            try {
                const result = await db.collection('db_local_template')
                    .set(vendorItems)

                if(result) {
                    return {success : true, message : "Success Remove Items!"}
                }
            } catch (error) {
                return rejectWithValue(error)
            }
        }
    }
)

export const resetCartTemplate = createAsyncThunk(
    'carts-template/reset', 
    async (_, { rejectWithValue }) => {
        try {
            const removeDB = await db.collection('db_local_template').delete()
            if(removeDB) {
                return {success : true, message : "Success Remove All Items!"}
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const saveTemplate = createAsyncThunk(
    'save-template', 
    async (value : any, { rejectWithValue }) => {
        try {
            const company : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/buyer/detail?buyer_id=${userCredentials.buyer_id}`)
            if(company.data.errors === null) {
                let buyer_detail = company.data.data

                const convert_groupBy : any = Object.entries(groupBy(value.value, (item) => {
                    return JSON.stringify(item.vendor)
                }));

                let final_data : any = convert_groupBy.map(function(key : any) { 
                    let split_array = key[0]
                    return { 
                        vendor : JSON.parse(split_array),
                        packages : {
                            items: key[1],
                        }
                    }; 
                });

                // const convert_groupBy = Object.entries(groupBy(value.value, (item) => {
                //     return [item['vendor_name'], item['vendorId'], item['vendor_address'], item['vendor_phone'],]
                // }));
        
                // let final_data : any = convert_groupBy.map(function(key) { 
                //     let split_array = key[0].split("=")
                //     console.log(split_array, 'split array')
                //     return { 
                //         vendor :{
                //             "name": split_array[0],
                //             "_id": split_array[1],
                //             "address": split_array[2],
                //             "phone": split_array[3]
                //         },
                //         packages : {
                //             items: key[1],
                //         }
                //     }; 
                // });
        
                let body = {
                    name : value.template_name,
                    buyerId: buyer_detail._id,
                    vendors: final_data,
                    total: value.total,
                    createdBy: userCredentials.fullname,
                }

                let body_put = {
                    name : value.template_name,
                    vendors: final_data,
                    total: value.total,
                    createdBy: userCredentials.fullname,
                }

                // console.log(body_put, 'body_put')
        
                if(!value.update) {
                    try {
                        const response : any = await axios.post(`${process.env.REACT_APP_API_SERVER}/template`, body)
                        if(response.data.errors === null) {
                            const deletedb = await db.collection('db_local_template').delete()
                            if(deletedb) {
                                return {success : true, message : response.data.message}
                            }
                        } else {
                            return rejectWithValue(response.data.message)
                        }
                    } catch (error) {
                        return rejectWithValue(error)
                    }
                } else {
                    try {
                        const response : any = await axios.put(`${process.env.REACT_APP_API_SERVER}/template/${value.id}`, body_put)
                        if(response.data.errors === null) {
                            const deletedb = await db.collection('db_local_template').delete()
                            if(deletedb) {
                                return {success : true, message : response.data.message}
                            }
                        } else {
                            return rejectWithValue(response.data.message)
                        }
                    } catch (error) {
                        return rejectWithValue(error)
                    }
                }
            } else {
                return rejectWithValue(company.data.message)
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
