import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RadioGroup, Radio, FormControlLabel, FormLabel, Button, ButtonGroup, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import { hideModalWindow } from "../../store/modal/modalWindowSlice";
import { deleteCocktail, editCocktail } from "../../store/cocktail/cocktailSlice";

import ModalAddFormInput from "../ModalAddFormInput";

import { testImage } from "../../services/yupImageValidation";

import { modalWindowCocktailPreview } from "../../store/modal/modalWindowSelector";

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

// создаем стили для компонентов MUI
const useStyles = makeStyles({
	container: {
		position: "relative!important",
	},

	formLabel: {
		display: "block!important",
		textAlign: "center!important",
	},
	radioGroup: {
		display: "flex!important",
		flexDirection: "row!important",
		justifyContent: "center!important",
		textAlign: "center!important",
		[theme.breakpoints.down("mobileM")]: {
			display: "grid!important",
		},
	},
	buttonGroup: {
		margin: "20px 0 0 0!important",
		[theme.breakpoints.down("mobileM")]: {
			margin: "10px 0 0 0!important",
		},
	},
	button: {
		fontWeight: "bold!important",
		fontSize: [16, "!important"],
	},
	closeButton: {
		position: "absolute!important",
		right: "-45px!important",
		top: "-35px!important",
		fontSize: [32, "!important"],
		[theme.breakpoints.down("mobileL")]: {
			right: "-25px!important",
			top: "-45px!important",
		},
		[theme.breakpoints.down("mobileM")]: {
			right: "-35px!important",
			top: "-35px!important",
		},
	},
	helperText: {
		position: "absolute!important",
		bottom: "10px!important",
		color: "#d32f2f!important",
	},

	title: {
		textTransform: "uppercase",
		[theme.breakpoints.down("tabletS")]: {
			fontSize: [28, "!important"],
		},
		[theme.breakpoints.down("mobileL")]: {
			fontSize: [24, "!important"],
		},
		[theme.breakpoints.down("mobileS")]: {
			fontSize: [20, "!important"],
		},
	},
});

// устанавливаем валидацию элементов формы
const schema = yup.object().shape({
	name: yup.string().min(2).required(),
	ingredients: yup.string().min(2).required(),
	method: yup.string(),
	glass: yup.string().min(2).required(),
	imageUrl: yup.string().test("valid-image-url", "Must use valid image URL or leave input field empty", (value) => testImage(value, 1000).then((status) => status === "success")),
});

const ModalEditForm = () => {
	const cocktailPreview = useSelector(modalWindowCocktailPreview);
	const { id, name, ingredients, method, glass, imageUrl } = cocktailPreview;

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const dispatch = useDispatch();
	const classes = useStyles();

	const formSubmitHandler = (data) => {
		if (data.imageUrl === "") {
			data.imageUrl = "https://i.pinimg.com/originals/a3/b9/6f/a3b96f21beb326de113562c5062368e9.png";
		}

		dispatch(editCocktail({ id: id, data: data }));
		reset();
		dispatch(hideModalWindow());
	};

	const closeButtonHandler = () => {
		reset();
		dispatch(hideModalWindow());
	};

	const deleteItemHandler = () => {
		dispatch(deleteCocktail(id));
		dispatch(hideModalWindow());
	};

	return (
		<ThemeProvider theme={theme}>
			<Container className={classes.container} disableGutters>
				<Typography component='h1' variant='h5' gutterBottom align='center' className={classes.title}>
					Edit cocktail
				</Typography>
				<form onSubmit={handleSubmit(formSubmitHandler)} className='modal-add-form__form modal-form'>
					<ModalAddFormInput name='name' label='Enter cocktail name' control={control} errors={errors} defaultValue={name} />
					<ModalAddFormInput name='ingredients' label='Put ingredients' control={control} errors={errors} defaultValue={ingredients} />
					<ModalAddFormInput name='glass' label='Insert cocktail glass' control={control} errors={errors} defaultValue={glass} />
					<ModalAddFormInput name='imageUrl' label='Enter image URL' control={control} errors={errors} defaultValue={imageUrl} />

					<Controller
						name='method'
						control={control}
						defaultValue={method}
						render={({ field }) => {
							return (
								<>
									<FormLabel id='radio-group' className={classes.formLabel}>
										Select method
									</FormLabel>
									<RadioGroup {...field} aria-labelledby='radio-group' name='row-radio-buttons-group' className={classes.radioGroup}>
										<FormControlLabel value='build' control={<Radio />} label='Build' />
										<FormControlLabel value='stir' control={<Radio />} label='Stir' />
										<FormControlLabel value='shake' control={<Radio />} label='Shake' />
										<FormControlLabel value='blend' control={<Radio />} label='Blend' />
									</RadioGroup>
								</>
							);
						}}
					/>
					<ButtonGroup variant='text' className={classes.buttonGroup} fullWidth>
						<Button type='submit' className={classes.button}>
							Save
						</Button>
						<Button className={classes.button} onClick={deleteItemHandler}>
							Delete Cocktail
						</Button>
					</ButtonGroup>
				</form>
				<Button className={classes.closeButton} onClick={closeButtonHandler}>
					&times;
				</Button>
			</Container>
		</ThemeProvider>
	);
};

export default ModalEditForm;
