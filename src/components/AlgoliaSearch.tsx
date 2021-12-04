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

const searchClient = algoliasearch(
  "X0RKYDMJ0J",
  "db7bad336c77e33b32b84201297cb80f"
);

const AlgoliaSearch : React.FC<any> = ({
  addToCart
}) => {


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
                onClick={() => addToCart(hit)}
            >Add to Cart</Button>
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
