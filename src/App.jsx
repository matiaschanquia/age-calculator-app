import { useState } from "react";
import "./App.css";
import dayjs from "dayjs";

const initialState = {
	day: "",
	month: "",
	year: ""
};


const initialAge = {
	day: 0,
	month: 0,
	year: 0,
};

const regexNumbers = /^[0-9]+$/;

const App = () => {

	const [ageActive, setAgeActive] = useState(false);
	const [errorMessages, setErrorMessages] = useState({ ...initialState });
	const [inputs, setInputs] = useState({ ...initialState });
	const [age, setAge] = useState({ ...initialAge });

	const handleInput = (e) => {
		const value = e.target.value;

		if(value !== "" && !regexNumbers.test(value)) {
			return;
		}

		const newInputs = {
			...inputs
		};
		newInputs[e.target.name] = value;

		setInputs({ ...newInputs });
		setErrorMessages({ ...initialState });
	};

	const resetAge = () => {
		setAgeActive(false);
		setAge({ ...initialAge });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if(!inputs.day) {
			const newErrorMessages = { ...errorMessages };
			newErrorMessages.day = "Debe ingresar un día";
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		if(!inputs.month) {
			const newErrorMessages = { ...errorMessages };
			newErrorMessages.month = "Debe ingresar un mes";
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		if(!inputs.year) {
			const newErrorMessages = { ...errorMessages };
			newErrorMessages.year = "Debe ingresar un año";
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		const dateDayjs = dayjs()
			.year(Number(inputs.year))
			.month(Number(inputs.month) - 1)
			.date(Number(inputs.day));
		const nowDayjs = dayjs();
		const msFromNow = dateDayjs.diff(nowDayjs);

		if(!dateDayjs.isValid()) {
			const newErrorMessages = { 
				day: "Fecha invalida",
				month: " ",
				year: " ",
			};
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		if(dateDayjs.get("date") != inputs.day) {
			const newErrorMessages = { ...errorMessages };
			newErrorMessages.day = "Día invalido";
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		if((dateDayjs.get("month") + 1)!= inputs.month) {
			const newErrorMessages = { ...errorMessages };
			newErrorMessages.month = "Mes invalido";
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		if(dateDayjs.get("year") != inputs.year) {
			const newErrorMessages = { ...errorMessages };
			newErrorMessages.year = "Año invalido";
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		if(msFromNow > 1000) {
			const newErrorMessages = { 
				day: "Debe ser en el pasado",
				month: " ",
				year: " ",
			};
			setErrorMessages({ ...newErrorMessages });
			resetAge();
			return;
		}

		const yearsFromNow = nowDayjs.diff(dateDayjs, "year");
		const monthsFromNow = Math.floor(nowDayjs.diff(dateDayjs, "month") % 12);
		const daysFromNow = Math.floor((nowDayjs.diff(dateDayjs, "days")) % 30.4368498333);

		setAge({ 
			year: yearsFromNow,
			month: monthsFromNow,
			day: daysFromNow
		});
		
		setAgeActive(true);

	};

	return (
		<div className="container-app">
			<div className="container-age-calculator">
				<h1 className="title">Calculador de edad</h1>
				<form className="form" onSubmit={handleSubmit}>
					<div className="inputs">
						<div className={errorMessages.day && "error"}>
							<label htmlFor="day">Día</label>
							<input type="text" name="day" id="day" placeholder="DD" value={inputs.day} onChange={handleInput}/>
							<p>
								{errorMessages.day}
							</p>
						</div>
						<div className={errorMessages.month && "error"}>
							<label htmlFor="month">Mes</label>
							<input type="text" name="month" id="month" placeholder="MM" value={inputs.month} onChange={handleInput}/>
							<p>
								{errorMessages.month}
							</p>
						</div>
						<div className={errorMessages.year && "error"}>
							<label htmlFor="year">Año</label>
							<input type="text" name="year" id="year" placeholder="AAAA" value={inputs.year} onChange={handleInput}/>
							<p>
								{errorMessages.year}
							</p>
						</div>
					</div>
					<div className="container-btn-submit">
						<hr />
						<button className="btn-submit">
							<ion-icon name="arrow-down-outline"></ion-icon>
						</button>
					</div>
				</form>

				<section className="container-data">
					<h1>
						<span>
							{
								ageActive ? age.year : "--"
							}
						</span> {
							!ageActive ? "años" : age.year === 1 ? "año" : "años"
						}
					</h1>
					<h1>
						<span>
							{
								ageActive ? age.month : "--"
							}
						</span> {
							!ageActive ? "meses" : age.month === 1 ? "mes" : "meses"
						}
					</h1>
					<h1>
						<span>
							{
								ageActive ? age.day : "--" 
							}
						</span> {
							!ageActive ? "días" : age.day === 1 ? "día" : "días"
						}
					</h1>
				</section>
			</div>
		</div>
	);
};

export default App;