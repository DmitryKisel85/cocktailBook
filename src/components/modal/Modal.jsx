import { useSelector, useDispatch } from "react-redux";

import { modalWindowIsOpenSelector } from "../../store/modalWindowSelector";

import { hideModalWindow } from "../../store/modalWindowSlice";

import "./modal.scss";

const Modal = ({ children }) => {
	const modalState = useSelector(modalWindowIsOpenSelector);
	console.log(modalState);

	const dispatch = useDispatch();

	return (
		<div className={modalState ? "modal active" : "modal"} onClick={() => dispatch(hideModalWindow())}>
			<div className={modalState ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
