import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer SykGy1Pk9KsnJm3mp2lb69Gmnr2m2dUnZjDwy_lw8gUmNa0iei-TjndVIVcExauCIDq79uV_XOuKmTPu5iK6FdanrRUaicYdk4x8TZBiKoav1S88RLnZKQy3LLgPZ3Yx'
  }
});