import { createAsyncThunk } from '@reduxjs/toolkit';
// import { userCredentials } from '../../../../../utilities/config';
// import { IProductItem } from '../../purchaseRequestTypes';
// import { remove } from 'lodash'

// const LBase = require("localbase");
// const db: any = new LBase.default("db");
// db.config.debug = false

// export const getLocalDBCarts = createAsyncThunk(
//     'carts/get',
//     async (_, { rejectWithValue }) => {
//         try {
//             const data_carts = await db.collection('db_local_CART').get()
//             if(data_carts) {
//                 return data_carts
//             }
//           } catch (err : any) {
//             if (!err.data_carts) {
//               throw err
//             }
//             return rejectWithValue(err.data_carts)
//         }
//     }
// );


// export const addToLocalDBCarts = createAsyncThunk(
//     'carts/add', 
//     async (value : IProductItem, { rejectWithValue }) => {
//         const data_send : IProductItem = {
//             "_id": value._id,
//             "vendor_id": value.vendor_id,
//             "vendor_name" : value.vendor_name,
//             "name": value.name,
//             "SKU": value.SKU,
//             "slug_product": value.slug_product,
//             "brand": value.brand,
//             "images_product": value.images_product,
//             "storage": value.storage,
//             "dimension": value.dimension,
//             "sub_products": value.sub_products,
//             "categories": value.categories,
//             "measurement": value.measurement,
//             "author": userCredentials.fullname,
//             "warehouse": value.warehouse,
//             "retail_price": value.retail_price,
//             "discount": value.discount,
//             "discount_price": value.discount_price,
//             "quantity": 1,
//             "sub_price_total" : value.discount >= 1 ? value.discount_price : value.retail_price,
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
//                             sub_price_total : discount >= 1 ? quantity * value.discount_price : quantity * value.retail_price
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
//                         sub_price_total : discount >= 1 ? quantity * value.discount_price : quantity * value.retail_price
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
//                             sub_price_total : discount >= 1 ? change_quantity * value.discount_price : change_quantity * value.retail_price
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

// /* istanbul ignore file */
