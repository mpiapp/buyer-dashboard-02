import { useState } from "react";
import algoliasearch from "algoliasearch";
import { Stack } from '@mui/material';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    ClearRefinements,
    RefinementList,
    Configure,
    Stats
} from "react-instantsearch-dom";
import { Button, Grid } from "@mui/material";
import axios from 'axios'
import swal from 'sweetalert'

const searchClient = algoliasearch(
  `${process.env.REACT_APP_API_ALGOLIA_KEY}`,
  `${process.env.REACT_APP_API_ALGOLIA_SECRET}`
);

const AlgoliaSearch : React.FC<any> = ({
  addToCart
}) => {

  const [loading, setLoading] = useState({
    id : null,
    loading : false
  });


  const addToCartItem =  ( product : any ) => {
    setLoading({...loading, id: product._id, loading: true})
    setTimeout( async () => {
      try {
        const vendor_detail : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/vendor/detail?vendor_id=${product.vendor_id}`)
        if(vendor_detail.data.errors === null) {
            let vendor = vendor_detail.data.data
            let product_item = {
              _id : product._id,
              SKU: product.SKU,
              brand: product.brand,
              category_id: product.category_id,
              description: product.description,
              dimension: product.dimension,
              discount: product.discount,
              discount_price: product.discount_price,
              images_product: product.images_product,
              minimum_order_quantity: product.minimum_order_quantity,
              name: product.name,
              payment_term: product.payment_term,
              reported_times: product.reported_times,
              retail_price: product.retail_price,
              slug_product: product.slug_product,
              status: product.status,
              stock: product.stock,
              storage: product.storage,
              sub_products: product.sub_products,
              vendor : {
                phone: vendor.phone,
                address: vendor.address,
                name: product.vendor_name,
                _id: product.vendor_id
              },
              vendor_id: product.vendor_id,
              vendor_name: product.vendor_name,
              vendor_address : vendor.address,
              vendor_phone : vendor.phone,
              warehouse_id: product.warehouse_id,
              note : ""
            }
            addToCart(product_item)
            setLoading({...loading, id: product._id, loading: false})
        } else {
            swal('Error', `${vendor_detail.data.message}`, 'error')
        }
      } catch (error) {
          swal('Error', `${error}`, 'error')
      }
    }, 1000);
  }


  const Hit = ({ hit } : any) => (
    <div className="content-search">
        {/* <div className="badge-discount">
          10%
        </div> */}
        <div className="img-product">
            <img src={hit.images_product[0]} alt={hit.name} />
        </div>
        <div className="hit-name">
            <h4>{hit.name}</h4>
        </div>
        <div className="hit-vendor">
            <p>{hit.vendor_name}</p>
        </div>
        <div className="hit-description">
            <p>{hit.description.substring(0,80)} ...</p>
        </div>
        <div className="hit-price">
            <h4>Rp.{parseInt(hit.retail_price).toLocaleString()}</h4>
            {/* <h3>Rp.{parseInt(hit.discount_price).toLocaleString()}</h3> */}
        </div>
        <div className="button-card">
            <Button 
                variant="outlined" 
                size="small" 
                color="primary"
                fullWidth
                // onClick={() => addToCart(hit)}
                sx={{ mb : 1}}
            >View Your Special Discount</Button>
            <Button 
                variant="outlined" 
                size="small" 
                color="error"
                fullWidth
                onClick={() => addToCartItem(hit)}
                disabled={loading.loading ? true : false}
            >{
              loading.id === hit._id && loading.loading ? "Loading.." : "Add to PR"
            }</Button>
        </div>
    </div>
  );

  return (
    <div className="ais-InstantSearch">
        <InstantSearch indexName="products" searchClient={searchClient}>
          <Grid container spacing={3}>
            <Grid item lg={2} md={12} sm={12} xs={12}>
              <RefinementList 
                  attribute="vendor_name" 
                  searchable={true}
                  translations={{
                    placeholder: 'Search for vendor',
                  }}
              />
              <Configure hitsPerPage={8} />
            </Grid>
            <Grid item lg={10} md={12} sm={12} xs={12}>
              <SearchBox />
              <Stack flexDirection="row" justifyContent="space-between">
                <Stats/>
                <ClearRefinements />
              </Stack>
              <Hits hitComponent={Hit} />
              <Pagination />
            </Grid>
          </Grid>
        </InstantSearch>
      </div>
  );
}

export default AlgoliaSearch;
