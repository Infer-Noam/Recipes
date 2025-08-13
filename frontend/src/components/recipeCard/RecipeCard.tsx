import { useState, type FC } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Styles from "./recipeCard.style";
import { type Recipe as RecipeModel } from "@shared/types/recipe.type";
import { type RecipeIngredient as RecipeIngredientModel } from "@shared/types/recipeIngredient.type";
import { useNavigate } from "react-router-dom";
import { RecipeMenu } from "./recipeCardMenu/RecipeCardMenu";
import ImagePlaceholder from "../../assets/image_placeholder.webp";

type RecipeCardProps = {
  recipe: RecipeModel;
  deleteRecipe: () => void;
  chefAvatarSrc: string;
};

export const RecipeCard: FC<RecipeCardProps> = ({
  recipe: { uuid, name, imageUrl, chef, description, createDate, ingredients },
  deleteRecipe,
  chefAvatarSrc,
}) => {
  const formatIngredients = (ingredients: RecipeIngredientModel[]) =>
    ingredients.map(
      ({ amount, measurementUnit, ingredient: { name } }, index) => (
        <Typography variant="body2" key={index}>
          {`${amount} ${measurementUnit} of ${name}`}
        </Typography>
      )
    );

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card variant="outlined" sx={Styles.card}>
        <CardHeader
          avatar={
            <Avatar
              alt={`${chef.firstName} ${chef.lastName}`}
              src={chefAvatarSrc}
              sx={Styles.chefAvatar}
            />
          }
          action={
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
          subheader={`By ${chef.firstName} ${chef.lastName}`}
        />
        <CardMedia
          sx={Styles.image}
          component="img"
          image={imageUrl}
          alt={`An image of ${name}`}
          onError={(e) => {
            if (e.target instanceof HTMLImageElement) {
              e.target.src = ImagePlaceholder;
            }
          }}
        />
        <CardContent>
          <Tooltip title={description} placement="right" arrow>
            <Typography
              noWrap
              variant="body2"
              sx={Styles.descriptionTypography}
            >
              {description || "\u00A0"}
            </Typography>
          </Tooltip>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="body2">
            {new Date(createDate).toDateString()}
          </Typography>
          <Tooltip
            sx={Styles.ingredientsTooltip}
            title={
              <Box component="span">
                <Typography variant="subtitle1">Ingredients</Typography>
                {formatIngredients(ingredients)}
              </Box>
            }
            arrow
          >
            <InfoOutlinedIcon />
          </Tooltip>
        </CardActions>
      </Card>
      <RecipeMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        onDelete={deleteRecipe}
        onView={() => navigate(`recipe/${uuid}`)}
      />
    </>
  );
};
