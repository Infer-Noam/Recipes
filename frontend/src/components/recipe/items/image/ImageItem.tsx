import type { FC } from "react";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import ControlledTextField from "../../../controlledTextField/ControlledTextField";
import Styles from "./imageItem.style";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { openImageWithFallback } from "./imageItem.util";

type ImageItemProps = {
  imageUrl: string;
};

const ImageItem: FC<ImageItemProps> = ({ imageUrl }) => {
  return (
    <Grid size={Styles.gridItemSize}>
      <ControlledTextField
        name="imageUrl"
        fullWidth
        label="Image url"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => openImageWithFallback(imageUrl)}
                  edge="end"
                >
                  <OpenInNewIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
  );
};

export default ImageItem;
