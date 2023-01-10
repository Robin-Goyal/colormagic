import {
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  url: string;
}

const CatCard = ({ id, url }: Props) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "8px" }}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={url} alt={url} />
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Link to={`/${id}`}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            sx={{ padding: "8px 20px" }}
          >
            View details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CatCard;
