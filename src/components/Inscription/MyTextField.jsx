import { TextField } from "@mui/material";
import { useField } from "formik";

export default function MyTextField({ label, ...props }) {
    const [field, meta] = useField(props);

    return (
        <TextField
            fullWidth   variant="outlined" label={label}     {...field} {...props}
            sx={{ backgroundColor : "transparent !important"}}
            error={!!meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            type="text"
        />      
    )
}