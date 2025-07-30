import { type FC } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  IconButton,
  type IconButtonProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Styles from "./recipe.style";
import useToggle from "../../hooks/useToggle";
import { type Recipe as RecipeModel } from "../../../../shared/types/recipe.type";

type RecipeProps = {
  recipe: RecipeModel;
};

type ExpandMoreProps = IconButtonProps & {
  expand: boolean;
};

const ExpandMore: FC<ExpandMoreProps> = ({ expand, ...other }) => (
  <IconButton {...other} sx={Styles.expandMore(expand)} />
);

export const Recipe: FC<RecipeProps> = ({
  recipe: { name, imageUrl, chef, description, createDate, steps },
}) => {
  const { open, toggle } = useToggle();

  return (
    <Card variant="elevation" sx={Styles.card}>
      <CardHeader
        avatar={
          <Avatar sx={Styles.avatar} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`By ${chef.firstName}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={`An image of ${name}`}
      />
      <CardContent>
        <Typography variant="body2" sx={Styles.descriptionTypography}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2">
          {new Date(createDate).toDateString()}
        </Typography>
        <ExpandMore
          expand={open}
          onClick={toggle}
          aria-expanded={open}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={Styles.methodTypography}>Method:</Typography>
          {steps.map((step, index) => (
            <Typography key={index} sx={Styles.stepTypography}>
              {step}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};
