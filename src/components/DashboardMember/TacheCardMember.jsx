
import {Card, CardHeader, IconButton, CardContent, useTheme, Typography, ButtonGroup } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { tokens } from "../../theme";

export default function TacheCardMember({TacheInfos, handleDelete}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <div>
        <Card sx= {{backgroundColor : colors.primary[400]}}
              elevation={3}
        >
            <CardHeader 
                sx= {{backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                    }} 
                action = {
                    <ButtonGroup> {/*Drop down*/}
                        <IconButton onClick={()=> handleDelete(TacheInfos.id)}>
                            <CheckCircleIcon /> 
                        </IconButton>
                        <IconButton onClick={()=> handleDelete(TacheInfos.id)}>
                            <PauseCircleFilledIcon /> 
                        </IconButton>
                        <IconButton onClick={()=> handleDelete(TacheInfos.id)}>
                            <RemoveCircleIcon /> 
                        </IconButton>
                        <IconButton onClick={()=> handleDelete(TacheInfos.id)}>
                            <HourglassEmptyIcon /> 
                        </IconButton>
                    </ButtonGroup>
                }
                title={TacheInfos.nomTache}
                subheader={TacheInfos.typeTache}
            />
            <CardContent>
                <Typography variant="body2">
                    {TacheInfos.descriptionTache}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}