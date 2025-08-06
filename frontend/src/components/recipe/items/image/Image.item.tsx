import type { Control } from "react-hook-form";
import type { RecipeFormData } from "../../Recipe.type";
import type { FieldError } from "react-hook-form";
import type { FC } from "react";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import ControlledTextField from "../../../controlledTextField/ControlledTextField";
import Styles from "./image.style";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type ImageItemProps = {
  imageUrl: string;
  control: Control<RecipeFormData, unknown, RecipeFormData>;
  error: FieldError | undefined;
};

const ImageItem: FC<ImageItemProps> = ({ imageUrl, control, error }) => (
  <Grid size={Styles.gridItemSize}>
    <ControlledTextField
      name="imageUrl"
      control={control}
      fullWidth
      label="Image url"
      variant="outlined"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Open image"
                onClick={() => window.open(imageUrl)}
                edge="end"
              >
                <OpenInNewIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      fieldError={error}
    />
  </Grid>
);

export default ImageItem;
