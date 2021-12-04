import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
/* istanbul ignore file */

interface IBreadCrumbs {
    current : string
    isPage : boolean
    page ?: string
    link ?: string
}

const BreadCrumbs = ({ current, page, link, isPage } : IBreadCrumbs) => {
  return (
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        { 
        /* istanbul ignore next */
        isPage ? 
        <Link
          underline="hover"
          color="inherit"
          href={link}
        >
          {page}
        </Link> : null }
        <Typography color="text.primary">{current}</Typography>
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumbs;