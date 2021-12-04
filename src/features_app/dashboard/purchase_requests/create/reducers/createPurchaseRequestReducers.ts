import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCredentials } from '../../../../../utilities/config';
import { remove } from 'lodash'
import axios from 'axios';
import { groupBy } from 'lodash'

const LBase = require("localbase");
const db: any = new LBase.default("db");
db.config.debug = false

export const getLocalDBCarts = createAsyncThunk(
    'carts/get',
    async (_, { rejectWithValue }) => {
        try {
            const data_carts = await db.collection('db_local_CART').get()
            if(data_carts) {
                return data_carts
            }
          } catch (err : any) {
            if (!err.data_carts) {
              throw err
            }
            return rejectWithValue(err.data_carts)
        }
    }
);


export const addToLocalDBCarts = createAsyncThunk(
    'carts/add', 
    async (value : any, { rejectWithValue }) => {
        const data_send : any = {
            "productId": value._id,
            "vendorId": value.vendor_id,
            "name": value.name,
            "vendor_name" : value.vendor_name,
            "sku": value.SKU,
            "slug": value.slug_product,
            "brand": value.brand,
            "images_product": value.images_product[0],
            "storage": value.storage,
            "dimension": value.dimension,
            "sub_products": value.sub_products,
            "categories": value.categories,
            "measurement": value.measurement,
            "warehouse": value.warehouse,
            "retail_price": value.retail_price,
            "discount": value.discount,
            "discount_price": value.discount_price,
            "quantity": 1,
            "sub_total" : value.discount >= 1 ? value.discount_price : value.retail_price,
            "payment_term": value.payment_term
        }

        const data_carts = await db.collection('db_local_CART').get()

        if(data_carts.length === 0) {
            try {
                const add_carts = await db.collection('db_local_CART').add(data_send)
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
                    const result = await db.collection('db_local_CART')
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
                    const add_carts = await db.collection('db_local_CART').add(data_send)
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

export const addQuantityProduct = createAsyncThunk(
    'carts/add-quantity', 
    async (value : any, { rejectWithValue }) => {

        const data_carts = await db.collection('db_local_CART').get()
        if(data_carts.find((element : any) => element.name === value.name)) {
            let discount = data_carts.find((element : any) => element.name === value.name).discount
            let quantity = data_carts.find((element : any) => element.name === value.name).quantity + 1
            try {
                const result = await db.collection('db_local_CART')
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

export const removeQuantityProduct = createAsyncThunk(
    'carts/remove-quantity', 
    async (value : any, { rejectWithValue }) => {
        const data_carts = await db.collection('db_local_CART').get()

        if(data_carts.find((element : any) => element.name === value.name)) {
            let discount = data_carts.find((element : any) => element.name === value.name).discount
            let quantity = data_carts.find((element : any) => element.name === value.name).quantity
            
            if(quantity <= 1) {
                try {
                    const result = await db.collection('db_local_CART')
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
                    const result = await db.collection('db_local_CART')
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

export const removeItemProduct = createAsyncThunk(
    'carts/remove-item', 
    async (value : any, { rejectWithValue }) => {
        const data_carts = await db.collection('db_local_CART').get()

        if(data_carts.find((element : any) => element.name === value.name)) {
            try {
                const result = await db.collection('db_local_CART')
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

export const removeVendorItems = createAsyncThunk(
    'carts/remove-allitemvendor', 
    async (value : any, { rejectWithValue }) => {
        const data_carts = await db.collection('db_local_CART').get()
        
        if(data_carts.find((element : any) => element.vendor_name === value.vendor_name)) {
            const vendorItems = remove(data_carts, function(obj : any) {
                return obj.vendor_name !== value.vendor_name
            });
            try {
                const result = await db.collection('db_local_CART')
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

export const resetCart = createAsyncThunk(
    'carts/reset', 
    async (_, { rejectWithValue }) => {
        try {
            const removeDB = await db.collection('db_local_CART').delete()
            if(removeDB) {
                return {success : true, message : "Success Remove All Items!"}
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const savePurchaseRequest = createAsyncThunk(
    'save-pr', 
    async (value : any, { rejectWithValue }) => {

        const convert_groupBy = Object.entries(groupBy(value.value, (item) => {
            return [item['vendor_name'], item['vendorId']]
        }));

        // const convert_groupBy = Object.entries(groupBy(value.value, (item) => {
        //     return [item['vendor_name'], item['vendorId'], item['discount'], item['sub_total'],]
        // }));


        let final_data : any = convert_groupBy.map(function(key) { 
            let split_array = key[0].split(",")
            return { 
                vendor_name: split_array[0], 
                down_payment : 100000,
                // down_payment : Math.floor(((parseInt(split_array[2]) / 100 ) * parseInt(split_array[3]))),
                vendorId: split_array[1],
                packages : {
                    items: key[1],
                }
            }; 
        });

        // console.log(final_data, 'final_data')

        let body = {
            code: userCredentials.code,
            buyerId: userCredentials.buyerId,
            addressId: '617364617364617364617344',
            vendors: final_data,
            total: value.total,
            createdBy: userCredentials.fullname,
        }

        try {
            if(value.type) {
                let local_id_cart : any = localStorage.getItem('id_cart_pr')
                let id_cart = JSON.parse(local_id_cart)

                let body_put = {
                    id: id_cart.id,
                    code: userCredentials.code,
                    buyerId: userCredentials.buyerId,
                    addressId: '617364617364617364617344',
                    vendors: final_data,
                    total: value.total,
                    createdBy: userCredentials.fullname,
                }
                const response : any = await axios.put(`${process.env.REACT_APP_API_HOST}/purchase-request`, body_put)
                if(response.data.errors === null) {
                    let id_cart_pr = {
                        saved: true,
                        change: false,
                        id : response.data.data._id
                    }
                    localStorage.setItem('id_cart_pr', JSON.stringify(id_cart_pr))
                    return {success : true, message : response.data.message}
                } else {
                    return rejectWithValue(response.data.message)
                }
            } else {
                const response : any = await axios.post(`${process.env.REACT_APP_API_HOST}/purchase-request`, body)
                if(response.data.errors === null) {
                    let id_cart_pr = {
                        saved: true,
                        change: false,
                        id : response.data.data._id
                    }
                    localStorage.setItem('id_cart_pr', JSON.stringify(id_cart_pr))
                    return {success : true, message : response.data.message}
                } else {
                    return rejectWithValue(response.data.message)
                }
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const submitPurchaseRequest = createAsyncThunk(
    'submit-pr', 
    async (_, { rejectWithValue }) => {
        let local_id_cart : any = localStorage.getItem('id_cart_pr')
        let id_cart = JSON.parse(local_id_cart)
        try {
            const response : any = await axios.put(`${process.env.REACT_APP_API_HOST}/purchase-request/submit/${id_cart.id}`)
            if(response.status === 200) {
                await db.collection('db_local_CART').delete()
                localStorage.removeItem('id_cart_pr')
                return {submit : true, message : "Success Submit Purchase Request"}
            } else {
                return rejectWithValue(response.data.message)
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

// /* istanbul ignore file */
