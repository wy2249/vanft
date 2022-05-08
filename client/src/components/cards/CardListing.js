import CardListing from "./CardListing.vue";
import CardItem from "./CardItem";

CardListing.props = {
  config: [],
};

CardListing.components = {
  CardItem,
};

export default CardListing;
