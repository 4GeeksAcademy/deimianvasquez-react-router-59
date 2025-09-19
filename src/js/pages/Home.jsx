import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//create your first component
const URL_BASE = "https://rickandmortyapi.com/api/character"

const Home = () => {
	const [character, setCharacter] = React.useState([])

	const getCharacter = async () => {
		try {
			const response = await fetch(URL_BASE)
			const data = await response.json()

			setCharacter(data.results)


		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCharacter()
	}, [])


	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>Mi aplicación</h1>
				</div>
				{
					character.map((item) => {
						return (
							<div key={item.id} className="col-12 col-md-4 col-lg-3 mt-2">
								<div className="card">
									<img src={item.image} className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title">{item.name}</h5>

										<Link to={`/character/${item.id}`} className="btn btn-primary">More...</Link>
									</div>
								</div>
							</div>

						)
					})
				}
			</div>
		</div>
	);
};

export default Home;