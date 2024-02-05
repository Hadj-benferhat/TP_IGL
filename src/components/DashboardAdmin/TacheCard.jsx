
import {Card, CardHeader, IconButton, CardContent, useTheme, Typography, ButtonGroup } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme";

export default function TacheCard({TacheInfos, handleDelete}) {
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
                    <ButtonGroup>
                        <IconButton onClick={()=> handleDelete(TacheInfos._id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton> 
                            {TacheInfos.etatDeLaTache === "Terminée" ? <CheckCircleIcon /> :
                            TacheInfos.etatDeLaTache === "non Affecté" ? <RemoveCircleIcon /> : 
                            TacheInfos.etatDeLaTache === "Suspendue" ? <PauseCircleFilledIcon /> : <HourglassEmptyIcon />  }
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