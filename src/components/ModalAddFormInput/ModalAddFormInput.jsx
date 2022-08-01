import PropTypes from "prop-types";

import { Controller } from "react-hook-form";

import { TextField, FormHelperText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

// устанавливаем базовые настройки Material UI
const theme = createTheme({
	palette: {
		primary: {
			main: "#40312a",
		},
	},

	typography: {
		fontFamily: "Syne",
		fontSize: 16,
	},
	breakpoints: {
		values: {
			tabletS: 768,
			mobileL: 525,
			mobileM: 450,
			mobileS: 360,
		},
	},
});

const useStyles = makeStyles({
	textField: {
		display: "block!important",
		position: "relative!important",
		paddingBottom: "30px!important",
		[theme.breakpoints.down("mobileM")]: {
			paddingBottom: "25px!important",
		},
	},
	helperText: {
		position: "absolute!important",
		bottom: "10px!important",
		color: "#d32f2f!important",
		[theme.breakpoints.down("mobileM")]: {
			bottom: "5px!important",
		},
	},
});

const ModalAddFormInput = ({ name, label, control, errors, defaultValue = "" }) => {
	const classes = useStyles();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field }) => (
				<div style={{ position: "relative" }}>
					<TextField {...field} label={label} variant='outlined' error={!!errors[name]} className={classes.textField} fullWidth />
					<FormHelperText className={classes.helperText}>{errors ? errors[name]?.message : ""}</FormHelperText>
				</div>
			)}
		/>
	);
};

ModalAddFormInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	defaultValue: PropTypes.string,
};

export default ModalAddFormInput;
