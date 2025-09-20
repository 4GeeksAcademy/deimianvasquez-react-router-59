import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Layout } from "./Layout"
import Home from "./pages/Home"
import { Contact } from "./pages/Contact"
import { Detail } from "./pages/Detail"
import Todos from "./pages/Todos"
import { Reducer } from "./pages/Reducer"


export const AppRoute = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Creación de rutas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="reducer" element={<Reducer />} />

                    <Route path="/character/:theid" element={<Detail />} />

                    <Route path="*" element={<h1>Not found 404</h1>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}