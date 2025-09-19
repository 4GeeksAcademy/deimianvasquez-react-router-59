import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

const URL_BASE = "https://rickandmortyapi.com/api/character"

export const Detail = () => {

    const [person, setPerson] = useState({})

    const { theid } = useParams()
    const navigate = useNavigate()


    async function getPerson() {
        try {
            const response = await fetch(`${URL_BASE}/${theid}`)
            const data = await response.json()

            if (response.ok) {
                setPerson(data)
            } else {
                console.log(typeof (response.status))
                setPerson(null)
            }

        } catch (error) {
            console.log(error, "error")
        }
    }


    useEffect(() => {
        getPerson()
    }, [])


    return (
        <div className="container">
            <div className="row justify-content-center">
                {
                    person ?
                        <div className="col-12 col-md-6">
                            <img src={person.image} alt="" />
                            <p>Name: {person.name}</p>
                            <p>Specie: {person.species}</p>

                            <button onClick={() => navigate(-1)} className="btn btn-secondary">Go back</button>

                        </div> :
                        <>
                            <h1>Imagen de perrito</h1>
                            <button onClick={() => navigate(-1)} className="btn btn-secondary">Go back</button>
                        </>
                }

            </div>
        </div>
    )
}