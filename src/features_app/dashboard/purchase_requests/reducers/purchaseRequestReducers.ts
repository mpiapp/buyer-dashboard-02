import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCredentials } from '../../../../utilities/config';
import axios from 'axios';

export const getPurchaseRequestData = createAsyncThunk(
    'purchase-requests/get',
    async (_, { rejectWithValue }) => {
        try {
            // let data : any = localStorage.getItem('purchase_requests')
            // let orders = data === null ? [] : JSON.parse(data)
            // return {data : orders, message : "Success"} 

            const response : any = await axios.get(`${process.env.REACT_APP_API_HOST}/purchase-request`, {
                params : {
                    id : userCredentials.buyerId
                }
            })
            if(response.data.errors === null) { 
                localStorage.setItem('purchase_requests', JSON.stringify(response.data.data))
                return {data : response.data.data, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);


// export const addToLocalDBCarts = createAsyncThunk(
//     'carts/add', 
//     async (value : any, { rejectWithValue }) => {
//         const data_send : any = {
//             "productId": value._id,
//             "vendorId": value.vendor_id,
//             "name": value.name,
//             "vendor_name" : value.vendor_name,
//             "sku": value.SKU,
//             "slug": value.slug_product,
//             "brand": value.brand,
//             "images_product": value.images_product[0],
//             "storage": value.storage,
//             "dimension": value.dimension,
//             "sub_products": value.sub_products,
//             "categories": value.categories,
//             "measurement": value.measurement,
//             "warehouse": value.warehouse,
//             "retail_price": value.retail_price,
//             "discount": value.discount,
//             "discount_price": value.discount_price,
//             "quantity": 1,
//             "sub_total" : value.discount >= 1 ? value.discount_price : value.retail_price,
//             "payment_term": {
//                 "name": "30 Days",
//                 "value": 30
//             }
//         }

//         const data_carts = await db.collection('db_local_CART').get()

//         if(data_carts.length === 0) {
//             try {
//                 const add_carts = await db.collection('db_local_CART').add(data_send)
//                 if(add_carts) {
//                     return {success : true, message : "Success Added Item to Cart!"}
//                 }
//             } catch (error) {
//                 return rejectWithValue(error)
//             }
//         } else {
//             if(data_carts.find((element : any) => element.name === value.name)) {
//                 let discount = data_carts.find((element : any) => element.name === value.name).discount
//                 let quantity = data_carts.find((element : any) => element.name === value.name).quantity + 1
//                 try {
//                     const result = await db.collection('db_local_CART')
//                         .doc({ name: value.name })
//                         .update({
//                             quantity: quantity,
//                             sub_total : discount >= 1 ? quantity * value.discount_price : quantity * value.retail_price
//                         })
    
//                     if(result) {
//                         return {success : true, message : "Success Added Item to Cart!"}
//                     }
//                 } catch (error) {
//                     return rejectWithValue(error)
//                 }
//             } else {
//                 try {
//                     const add_carts = await db.collection('db_local_CART').add(data_send)
//                     if(add_carts) {
//                         return {success : true, message : "Success Added Item to Cart!"}
//                     }
//                 } catch (error) {
//                     return rejectWithValue(error)
//                 }
//             }
//         }
//     }
// )

// export const addQuantityProduct = createAsyncThunk(
//     'carts/add-quantity', 
//     async (value : any, { rejectWithValue }) => {

//         const data_carts = await db.collection('db_local_CART').get()
//         if(data_carts.find((element : any) => element.name === value.name)) {
//             let discount = data_carts.find((element : any) => element.name === value.name).discount
//             let quantity = data_carts.find((element : any) => element.name === value.name).quantity + 1
//             try {
//                 const result = await db.collection('db_local_CART')
//                     .doc({ name: value.name })
//                     .update({
//                         quantity: quantity,
//                         sub_total : discount >= 1 ? quantity * value.discount_price : quantity * value.retail_price
//                     })

//                 if(result) {
//                     return {success : true, message : "Success Increase Item Quantity!"}
//                 }
//             } catch (error) {
//                 return rejectWithValue(error)
//             }
//         }
//     }
// )

// export const removeQuantityProduct = createAsyncThunk(
//     'carts/remove-quantity', 
//     async (value : any, { rejectWithValue }) => {
//         const data_carts = await db.collection('db_local_CART').get()

//         if(data_carts.find((element : any) => element.name === value.name)) {
//             let discount = data_carts.find((element : any) => element.name === value.name).discount
//             let quantity = data_carts.find((element : any) => element.name === value.name).quantity
            
//             if(quantity <= 1) {
//                 try {
//                     const result = await db.collection('db_local_CART')
//                         .doc({ name: value.name })
//                         .delete()
    
//                     if(result) {
//                         return {success : true, message : "Success Remove Item!"}
//                     }
//                 } catch (error) {
//                     return rejectWithValue(error)
//                 }
//             } else { 
//                 let change_quantity = data_carts.find((element : any) => element.name === value.name).quantity - 1
//                 try {
//                     const result = await db.collection('db_local_CART')
//                         .doc({ name: value.name })
//                         .update({
//                             quantity: change_quantity,
//                             sub_total : discount >= 1 ? change_quantity * value.discount_price : change_quantity * value.retail_price
//                         })
    
//                     if(result) {
//                         return {success : true, message : "Success Decrease Item Quantity!"}
//                     }
//                 } catch (error) {
//                     return rejectWithValue(error)
//                 }

//             }
//         }
//     }
// )

// export const removeItemProduct = createAsyncThunk(
//     'carts/remove-item', 
//     async (value : any, { rejectWithValue }) => {
//         const data_carts = await db.collection('db_local_CART').get()

//         if(data_carts.find((element : any) => element.name === value.name)) {
//             try {
//                 const result = await db.collection('db_local_CART')
//                     .doc({ name: value.name })
//                     .delete()

//                 if(result) {
//                     return {success : true, message : "Success Remove Item!"}
//                 }
//             } catch (error) {
//                 return rejectWithValue(error)
//             }
//         }
//     }
// )

// export const removeVendorItems = createAsyncThunk(
//     'carts/remove-allitemvendor', 
//     async (value : any, { rejectWithValue }) => {
//         const data_carts = await db.collection('db_local_CART').get()
        
//         if(data_carts.find((element : any) => element.vendor_name === value.vendor_name)) {
//             const vendorItems = remove(data_carts, function(obj : any) {
//                 return obj.vendor_name !== value.vendor_name
//             });
//             try {
//                 const result = await db.collection('db_local_CART')
//                     .set(vendorItems)

//                 if(result) {
//                     return {success : true, message : "Success Remove Items!"}
//                 }
//             } catch (error) {
//                 return rejectWithValue(error)
//             }
//         }
//     }
// )

// export const resetCart = createAsyncThunk(
//     'carts/reset', 
//     async (_, { rejectWithValue }) => {
//         try {
//             const removeDB = await db.collection('db_local_CART').delete()
//             if(removeDB) {
//                 return {success : true, message : "Success Remove All Items!"}
//             }
//         } catch (error) {
//             return rejectWithValue(error)
//         }
//     }
// )


// export const savePurchaseRequest = createAsyncThunk(
//     'save-pr', 
//     async (value : any, { rejectWithValue }) => {

//         const convert_array = Object.entries(groupBy(value.value, 'vendor_name'));
//         let final_data : any = convert_array.map(function(key) { 
//             return { 
//                 vendorId: "asdfakdfhawe123dfad",
//                 vendor_name: key[0], 
//                 packages : {
//                     items: key[1],
//                 }
//             }; 
//         });

//         let body = {
//             code: userCredentials.code,
//             buyerId: userCredentials.buyerId,
//             addressId: '617364617364617364617344',
//             vendors: final_data,
//             total: value.total,
//             createdBy: userCredentials.fullname,
              
//         }
//         try {
//             const response : any = await axios.post('https://05ef-180-243-224-15.ngrok.io/purchase-request', body)
//             if(response.data.errors === null) {
//                 return {success : true, message : response.data.message}
//             } else {
//                 return rejectWithValue(response.data.message)
//             }
//         } catch (error) {
//             return rejectWithValue(error)
//         }
//     }
// )

// /* istanbul ignore file */
